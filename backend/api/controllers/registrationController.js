const connection = require('../../configs/database');

exports.registrationCustomerController = (req, res) => {
    console.log("Добро пожаловать пользователь");
    // res.json(req.body);

    const { name_courier, email_courier, tel_rus_courier, tel_use_courier, zelle_courier, card_withdrawal_courier, has_made_deposit_courier } = req.body;

    const sql = 'INSERT INTO customers (role, login, password, name_courier, email_courier, tel_rus_courier, tel_use_courier, zelle_courier, card_withdrawal_courier, has_made_deposit_courier, passport_checked_courier, rating_courier) VALUES (?,?,?,?,?,?,?,? )';
    connection.query(sql, [name_courier, email_courier, tel_rus_courier, tel_use_courier, zelle_courier, card_withdrawal_courier, has_made_deposit_courier], (error, result) => {
        if (error) return res.status(500).send('Ошибка при выполнении запроса к базе данных, ошибка: ' + error);
        res.json('Данные успешно добавлены');
        console.log('Данные успешно добавлены');
    });
}

exports.registrationCourierController = (req, res) => {
    console.log("Добро пожаловать курьер");

    const { name_courier, email_courier, tel_rus_courier, tel_use_courier, zelle_courier, card_withdrawal_courier, has_made_deposit_courier } = req.body;
    const role = 'courier';
    const login = '111';
    const password = '111';

    const sql = 'INSERT INTO couriers (role, login, password, name_courier, email_courier, tel_rus_courier, tel_use_courier, zelle_courier, card_withdrawal_courier, has_made_deposit_courier, passport_checked_courier, rating_courier) VALUES (?,?,?,?,?,?,?,?,?,?,?,? )';
    connection.query(sql, [role, login, password, name_courier, email_courier, tel_rus_courier, tel_use_courier, zelle_courier, card_withdrawal_courier, true, false, 0], (error, result) => {
        if (error) return res.status(500).json('Ошибка при выполнении запроса к базе данных, ошибка: ' + error);
        res.json('Данные успешно добавлены');
        console.log('Данные успешно добавлены');
    });
}