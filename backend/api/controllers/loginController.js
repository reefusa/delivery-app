const connection = require('../../configs/database');

exports.loginController = (req, res) => {
    const { login, password } = req.body;

    const sql = 'SELECT * FROM couriers WHERE login = ? AND password = ?';
    connection.query(sql, [login, password], (error, result) => {
        if (error) return res.status(500).send('Ошибка при попытке входа ' + error);

        if (result.length > 0) {
            console.log('Добро пожаловать ' + result[0].name_courier);
            res.json({ auth: 'true', role: `${result[0].role}` });
        } else {
            res.json('Неверно введены данные');
        }
    });

    // const sql = 'INSERT INTO customers (name, email_customer) VALUES (?,?)';
    // connection.query(sql, [name_courier, email_courier], (error, result) => {
    //     if (error) return res.status(500).send('Ошибка при попытке входа ' + error);
    //     res.json('Данные успешно добавлены');
    //     console.log('Данные успешно добавлены');
    // });
}

// const { login, password } = req.body;
// console.log(login, password);
// res.status(200).json({ 'auth': true, 'role': 'customer' });
