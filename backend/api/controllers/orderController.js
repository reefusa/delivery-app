const connection = require('../../configs/database');
const { costCalcUtil } = require('../../utils/costCalcUtil');

exports.statusUpdateOrderController = (req, res) => {
}

exports.loadingGoodsOrderController = (req, res) => {
    const { id, role } = req.user;

    if (role === 'customer') {
        const sqlRequestCustomer = `
        SELECT id, name, weigth_item, cost_item, quantity_item, price_with_commission, origin, destination, description, img
        FROM orders
        WHERE customer_id = ?`;
        connection.query(sqlRequestCustomer, [id], (error, result) => {
            if (error) return res.status(500).json({ error: error, goods: false });
            if (result.length === 0) return res.json({ goods: false });
            res.json({ goods: result });
        });
    } if (role === 'courier') {
        const sqlRequestCourier = `
        SELECT id, name, weigth_item, cost_item, quantity_item, price_with_commission, origin, destination, description, img
        FROM orders
        WHERE courier_id IS NULL AND customer_id IS NOT NULL`;
        connection.query(sqlRequestCourier, (error, result) => {
            if (error) return res.status(500).json({ error: error, goods: false });
            if (result.length === 0) return res.json({ goods: false });
            res.json({ goods: result });
        });
    }
}

exports.loadingOneProductOrderController = (req, res) => {
    const item_id = req.params.id;
    const { id, role } = req.user;

    if (role === 'courier') {
        const sqlGetItem = `
        SELECT *
        FROM orders
        WHERE id = ?
        AND (courier_id = ? OR (courier_id IS NULL AND customer_id IS NOT NULL AND order_completed = 0));`;
        connection.query(sqlGetItem, [item_id, id], (error, result) => {
            if (error) return res.status(500).json({ error: error });
            if (result.length === 0) return res.status(404).json({ item: false });
            res.json({ item: result[0] });
        });
    } if (role === 'customer') {
        const sqlGetItem = `
        SELECT name, weigth_item, cost_item, quantity_item, price_with_commission AS price, origin, destination, description, img, delivery_status, courier_id, order_completed
        FROM orders
        WHERE id = ? AND customer_id  = ?`;
        connection.query(sqlGetItem, [item_id, id], (error, result) => {
            if (error) return res.status(500).json({ error: error });
            if (result.length === 0) return res.status(404).json({ item: false });
            res.json({ item: result[0] });
        });
    }
}

exports.calcOrderController = (req, res) => {
    const { lng } = req.query;
    const { weight, quantity, cost, category } = req.body;

    const sqlRequestCategory = 'SELECT * FROM categories WHERE id = ?';
    connection.query(sqlRequestCategory, [category], (error, result) => {
        if (error) return res.status(500).json({ error });
        if (result.length !== 0) {
            const { calc_delivery, calc_cost, min_sum } = result[0];
            const dollarExchangeRate = 90;
            let totalCost;

            const formatCurrency = {
                'ru': (amount) => amount.toLocaleString('ru-RU', {
                    style: 'currency', currency: 'RUB',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }),
                'en': (amount) => amount.toLocaleString('en-US', {
                    style: 'currency', currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }),
            }

            const сurrency = formatCurrency[lng];

            if (calc_delivery === 'kg') {
                if (calc_cost.includes('%')) {
                    const percent = parseFloat(calc_cost.replace('%', ''));
                    totalCost = (percent / 100) * weight * cost;
                    if (totalCost < min_sum) return res.json({ min_sum: min_sum });
                } else {
                    totalCost = calc_cost * weight;
                    if (totalCost < min_sum) return res.json({ min_set: false, min_sum: min_sum });
                }
            } if (calc_delivery === 'item') {
                if (calc_cost.includes('%')) {
                    const percent = parseFloat(calc_cost.replace('%', ''));
                    totalCost = (percent / 100) * quantity * cost;
                    if (totalCost < min_sum) return res.json({ min_set: false, min_sum: min_sum });
                } else {
                    totalCost = calc_cost * quantity;
                    if (totalCost < min_sum) return res.json({ min_set: false, min_sum: min_sum });
                }
            }
            if (lng === 'ru') {
                totalCost = totalCost * dollarExchangeRate;
            }
            return res.json({ cost: сurrency(Math.round(totalCost)) });
        }
    });
}

exports.createOrderController = (req, res) => {
    const { id } = req.user;
    const { lng } = req.query;
    const { name, weight, quantity, cost, origin, destination, description, category } = req.body;

    const sqlGetCategory = `
    SELECT *
    FROM categories
    WHERE id = ?`;

    connection.query(sqlGetCategory, [category], (error, result) => {
        if (error) return res.status(500).json({ error: error });
        if (result[0]) {
            const { calc_delivery, calc_cost, min_sum } = result[0];
            const totalCost = costCalcUtil(lng, quantity, weight, cost, calc_delivery, calc_cost, min_sum);

            if (totalCost) {
                const infoDefault = {
                    customer_id: id,
                    courier_id: null,
                    delivery_status: 'Заказ создан',
                    order_completed: false
                }
                const totalCostWithCommission = '';
                const img = req.files.imageItem[0].filename;
                const dollarExchangeRate = 90;

                const sqlCreateItem = `
                INSERT INTO orders
                (name, weigth_item, cost_item, quantity_item, price_without_commission, price_with_commission, dollar_exchange_rate, origin, destination, description, img, category_id, courier_id, customer_id, delivery_status, order_completed)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                connection.query(sqlCreateItem, [name, weight, cost, quantity, totalCost.cost, totalCostWithCommission, dollarExchangeRate, origin, destination, description, img, category, infoDefault.courier_id, infoDefault.customer_id, infoDefault.delivery_status, infoDefault.order_completed], (error, result) => {
                    if (error) return res.status(500).json({ error: error });
                    if (result) {
                        res.json({ add: true, url: `/customer` });
                    }
                });
            }
        }
    });
}

exports.loadingCoureirWorkOrderController = (req, res) => {
    const { id } = req.user;
    const sql = `
    SELECT *
    FROM orders
    WHERE courier_id = ?`;
    connection.query(sql, [id], (error, result) => {
        if (error) return res.status(500).json('Ошибка при выполнении запроса к базе данных, ошибка: ' + error);
        if (result.length !== 0) {
            res.json({ item: result });
        }
    });
}

// update
exports.getItemCourierOrderController = (req, res) => {
    const item_id = req.params.item_id;
    const { id } = req.user;

    const sqlUpdateStatusWork = ` 
    UPDATE orders 
    SET courier_id = ?, delivery_status = ?
    WHERE  id = ?`
    connection.query(sqlUpdateStatusWork, [id, 'Взят в работу', item_id], (error, result) => {

        if (error) return res.status(500).json({ error: error, update: false });
        if (result.affectedRows > 0) {

            const sqlGetIdCustomer = ` 
            SELECT customer_id
            FROM orders
            WHERE  id = ?`

            connection.query(sqlGetIdCustomer, [item_id], (error, result) => {

                if (error) return res.status(500).json({ error: error, update: false });
                if (result[0]) {
                    const { customer_id } = result[0];

                    const sqlUpdateChats = `
                    INSERT INTO chats
                    (customer_id, courier_id, item_id)
                    VALUES (?, ?, ?)`;

                    connection.query(sqlUpdateChats, [customer_id, id, +item_id], (error, result) => {
                        if (error) return res.status(500).json({ error: error, update: false });
                        if (result) {
                            res.json({ update: true });
                        }
                    });
                }
            });
        }
    });
}

exports.acceptCustomerOrderController = (req, res) => {
    const item_id = req.params.item_id;
    const { id } = req.user;

    console.log(item_id + id);
    sqlUpdateStatusOrderComplete = `
    UPDATE orders 
    SET order_completed = ?, delivery_status = ?
    WHERE id = ? AND customer_id = ?`

    connection.query(sqlUpdateStatusOrderComplete, [true, 'Заказ доставлен', item_id, id], (error, result) => {
        if (error) return res.status(500).json({ error: error, update: false });
        if (result.affectedRows > 0) {
            res.json({ update: true });
            console.log(result);
        }
    });
}

exports.submitCustomerOrderController = (req, res) => {
    const item_id = req.params.item_id;
    const { id } = req.user;

    sqlUpdateStatusOrder = `
    UPDATE orders 
    SET delivery_status = ?
    WHERE id = ? AND courier_id = ?`

    connection.query(sqlUpdateStatusOrder, ['Заказ доставлен, ожидает подтверждения', item_id, id], (error, result) => {
        if (error) return res.status(500).json({ error: error, update: false });
        if (result.affectedRows > 0) {
            res.json({ update: true });
        }
    });
}