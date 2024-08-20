const { sendMediaGroupForVerification } = require('../../bot/bot');
const connection = require('../../configs/database');
const jwt = require('jsonwebtoken');

exports.registrationCustomerController = (req, res) => {
    const { name_customer, last_name_customer, patronymic_customer, email_customer, tel_rus_customer, tel_use_customer, user_language } = req.body;
    const role = 'customer';
    const login = name_customer;
    const password = '567';

    const sqlAddUser = `INSERT INTO customers (role, login, password, name_customer, last_name_customer, patronymic_customer, email_customer, tel_rus_customer, tel_use_customer, user_language)  
    SELECT ?,?,?,?,?,?,?,?,?,?
    WHERE NOT EXISTS (
        SELECT 1 FROM customers WHERE login = ? AND password = ?
    )`;

    connection.query(sqlAddUser, [role, login, password, name_customer, last_name_customer, patronymic_customer, email_customer, tel_rus_customer, tel_use_customer, user_language, login, password], (error, result) => {
        if (error) return res.status(500).json({ error: error });
        if (result.affectedRows === 0) {
            return res.json({ auth: false });
        } else {
            const sqlGetIdUser = `
            SELECT id, role, name_customer as name 
            FROM customers
            WHERE role = ? AND login = ? AND password = ?`;

            connection.query(sqlGetIdUser, [role, login, password], (error, result) => {
                if (error) return res.status(500).json('Ошибка при выполнении запроса к базе данных, ошибка: ' + error);
                if (result.length !== 0) {
                    const { id, role, name } = result[0];
                    const user = { id: id, role: role, name: name };

                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

                    const sql = 'INSERT INTO tokens (refresh_token) VALUES (?)';
                    connection.query(sql, [refreshToken], (error, result) => {
                        if (error) return res.status(500).send('Ошибка при попытке входа ' + error);
                        if (result) {
                            const sqlAddTokenDb = `
                            UPDATE customers
                            SET token_id = (
                                SELECT id FROM tokens WHERE refresh_token = ?
                            )
                            WHERE id = ?`
                            connection.query(sqlAddTokenDb, [refreshToken, id], (error, result) => {
                                if (error) return res.status(500).send({ error: error });
                                if (result) {
                                    res.json({ auth: true, refreshToken: refreshToken, accessToken: accessToken, url: `/${role}`, replace: true });
                                    console.log('Данные успешно добавлены, токен создан');
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.registrationCourierController = (req, res) => {
    const { name_courier, last_name_courier, patronymic_coutier, email_courier, tel_rus_courier, tel_use_courier, zelle_courier, card_withdrawal_courier, user_language } = req.body;
    const role = 'courier';
    const login = name_courier;
    const password = '135';
    const image = req.files.imageFace[0].filename;

    const infoDefaultCourier = {
        has_made_deposit_courier: false,
        passport_checked_courier: false,
        rating_courier: 0
    }

    const sqlAddUser = `
    INSERT INTO couriers (role, login, password, name_courier, last_name_courier, patronymic_coutier, email_courier, tel_rus_courier, tel_use_courier, image, zelle_courier, card_withdrawal_courier, has_made_deposit_courier, passport_checked_courier, rating_courier, user_language)
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    WHERE NOT EXISTS (
        SELECT 1 FROM couriers WHERE login = ? AND password = ?
    )`;

    connection.query(sqlAddUser, [role, login, password, name_courier, last_name_courier, patronymic_coutier, email_courier, tel_rus_courier, tel_use_courier, image, zelle_courier, card_withdrawal_courier, infoDefaultCourier.has_made_deposit_courier, infoDefaultCourier.passport_checked_courier, infoDefaultCourier.rating_courier, user_language, login, password], (error, result) => {
        if (error) return res.status(500).json({ error: error });
        if (result.affectedRows === 0) {
            return res.json({ auth: false });
        } else {
            const sqlGetIdUser = `
            SELECT id, role, name_courier as name 
            FROM couriers 
            WHERE role = ? AND login = ? AND password = ?`;

            connection.query(sqlGetIdUser, [role, login, password], (error, result) => {
                if (error) return res.status(500).json({ error: error });
                if (result.length !== 0) {
                    sendMediaGroupForVerification(req.body, req.files, result[0].id, result[0].role);
                    const { id, role, name } = result[0];
                    const user = { id: id, role: role, name: name };

                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

                    const sql = 'INSERT INTO tokens (refresh_token) VALUES (?)';
                    connection.query(sql, [refreshToken], (error, result) => {
                        if (error) return res.status(500).send({ error: error });
                        if (result) {

                            const sqlAddTokenDb = `
                            UPDATE couriers
                            SET token_id = (
                                SELECT id FROM tokens WHERE refresh_token = ?
                            )
                            WHERE id = ?`

                            connection.query(sqlAddTokenDb, [refreshToken, id], (error, result) => {
                                if (error) return res.status(500).send({ error: error });
                                if (result) {
                                    res.json({ auth: true, refreshToken: refreshToken, accessToken: accessToken, url: `/${role}`, replace: true });
                                    console.log('Данные успешно добавлены, токен создан');
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}