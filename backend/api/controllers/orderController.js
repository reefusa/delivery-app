const connection = require('../../configs/database');

exports.createOrderController = (req, res) => {
    const { name, weigth, cost, origin, destination, description, img, id_courier, id_customer, delivery_status, order_completed } = req.body;

    const sql = 'INSERT INTO orders (name, weigth, cost, origin, destination, description, img, id_courier, id_customer, delivery_status, order_completed) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    connection.query(sql, [name, weigth, cost, origin, destination, description, img, id_courier, id_customer, delivery_status, order_completed],
        (error, result) => {
            if (error) return res.status(500).json('Ошибка при выполнении запроса к базе данных, ошибка: ' + error);
            console.log(`Заказ ${name} создан`);
            res.json(`Заказ ${name} создан`);
            console.log(result);
        });
} 