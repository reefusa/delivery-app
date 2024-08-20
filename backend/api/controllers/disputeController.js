const { sendButtonTg } = require("../../bot/bot");
const connection = require("../../configs/database");

exports.openDisputeController = (req, res) => {
    const { id, role, name } = req.user;
    const item_id = req.params.item_id;
    console.log(item_id);

    const sqlGetIdChat = `
    UPDATE chats
    SET dispute = 1
    WHERE id = (
        SELECT id
        FROM chats
        WHERE ${role}_id = ? AND item_id = ?
    )`

    connection.query(sqlGetIdChat, [id, item_id], (error, result) => {
        if (error) return res.status(500).json({ error: error })
        if (result) {
            const sqlUpdateItemStatus = `
            UPDATE orders
            SET delivery_status = ?
            WHERE id = ?`

            connection.query(sqlUpdateItemStatus, ['Открыт спор', item_id], (error, result) => {
                if (error) return res.status(500).json({ error: error })
                if (result) {
                    sendButtonTg(`Пользователь ${name} открыл спор`, 'Зайти на страницу администратора');
                    res.json({ open: true });
                }
            });
        }
    });
}

exports.viewDisputeController = (req, res) => {

    const sqlGetMessage = `
    SELECT
    m.sender_id,
    m.content,
    m.created_at,
    m.chat_id,
    CASE
        WHEN m.sender_id = c.id THEN c.name_customer
        WHEN m.sender_id = cr.id THEN cr.name_courier 
        ELSE NULL
    END AS sender_name  
    FROM
        messages m
    JOIN
        chats ch ON m.chat_id = ch.id
    JOIN
        customers c ON c.id = ch.customer_id
    JOIN
        couriers cr ON cr.id = ch.courier_id
    WHERE
        ch.dispute = 1;`;

    connection.query(sqlGetMessage, (error, result) => {
        // if () {

        // }
        console.log(result);
        res.json({ view: true, userInfo: result });
    });
}