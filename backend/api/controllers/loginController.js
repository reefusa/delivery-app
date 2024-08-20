const connection = require('../../configs/database');
const jwt = require('jsonwebtoken');

exports.loginController = (req, res) => {
    const { login, password } = req.body;

    const sql = `
    SELECT id, role,  name_courier AS name
    FROM couriers
    WHERE login = ? AND password = ?
    UNION
    SELECT  id, role, name_customer AS name
    FROM customers
    WHERE login = ? AND password = ?
    UNION
    SELECT id, role, name_admin
    FROM admins
    WHERE login = ? AND password = ?`;
    connection.query(sql, [login, password, login, password, login, password], (error, result) => {
        console.log(error);

        if (error) return res.status(500).send('Ошибка при попытке входа ' + error);
        console.log(result);

        if (result.length > 0) {
            const { id, role, name } = result[0]
            const user = { id: id, role: role, name: name };

            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

            const sql = 'INSERT INTO tokens (refresh_token) VALUES (?)';
            connection.query(sql, [refreshToken], (error, result) => {
                if (error) return res.status(500).send({ error: error });

                const sqlUpdateTokenIdRoles = `
                UPDATE ${role}s
                SET token_id = (
                    SELECT id FROM tokens WHERE refresh_token = ?
                )
                WHERE id = ?`

                connection.query(sqlUpdateTokenIdRoles, [refreshToken, id], (error, result) => {
                    if (error) return res.status(500).send({ error: error });
                    if (result) {
                        res.json({ auth: 'true', refreshToken: refreshToken, accessToken: accessToken });
                    }
                });
            });
        } else {
            res.json('Неверно введены данные');
        }
    });
}