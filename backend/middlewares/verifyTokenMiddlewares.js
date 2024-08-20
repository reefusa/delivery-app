const jwt = require('jsonwebtoken');

exports.verifyTokenMiddlewares = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json('Токен не указан');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({ verify: false });
        req.user = user;
        next();
    });
}