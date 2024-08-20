const jwt = require('jsonwebtoken');
const connection = require('../../configs/database');

exports.verificationTokenController = (req, res) => {
    // res.json(req.user);
    res.json({verify: true, user: req.user});
}

exports.updateTokenController = (req, res) => {
    const { token } = req.body;
    if (token == null) return res.status(401).json('Refresh токен не указан');
    const sql = 'SELECT * FROM tokens WHERE refresh_token = ?';
    connection.query(sql, [token], (error, result) => {
        if (error) return res.status(500).json({ forbidden: 'Проблемы с подключением к базе данных' });
        if (result.length > 0) {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
                if (error) {
                    const sql = 'DELETE FROM tokens WHERE refresh_token = ?';
                    connection.query(sql, [token], (error, result) => {
                        if (error) return res.status(500).json('Проблемы с подключением к базе данных');
                    });
                    return res.status(403).json('Refresh Токен не актуален');
                }

                const accessToken = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                res.json({ 'user': user, 'accessToken': accessToken });
            });
        } else {
            return res.status(403).json({ forbidden: 'Вам придется зайти заново' });
        }
    });
};

exports.createTokenController = (req, res) => {
    const { id, role } = req.body;
    const user = { id: id, role: role };

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

    res.status(200).json({ auth: 'true', refreshToken: refreshToken, accessToken: accessToken });
}