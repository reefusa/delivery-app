const express = require('express');
const app = express();
const PORT = 3003;
const verificationRouter = require('./api/routers/verificationRouter');
const loginRouter = require('./api/routers/loginRouter');
const registrationRoutes = require('./api/routers/registrationRoutes');
const clearingDataSqlRoutes = require('./api/routers/clearingDataSqlRoutes');
const orderRoutes = require('./api/routers/orderRoutes');

// Middleware для CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ всем источникам
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Middleware для чтения text и json
app.use(express.text());
app.use(express.json());
// Middleware для чтения .env
require('dotenv').config();

// app.use('/verification/', verificationRouter);
// app.use('/', userRouter);
app.use(loginRouter)

// const jwt = require('jsonwebtoken');
// const loginRouter = require('./api/routers/loginRouter');

// const posts = [
//     {
//         username: 'Валя',
//         post: 'Привет моя пирожки'
//     }, {
//         username: 'Лафи',
//         post: 'Гав Гав'
//     }
// ]

// app.get('/posts', authenticateToken, (req, res) => {
//     res.json(posts.filter(post => post.username === req.user.name));
// });

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token === null) return res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }

app.use(registrationRoutes);
app.use(orderRoutes);
app.use(clearingDataSqlRoutes);

app.listen(PORT, () => {
    console.log(`Прослушка ${PORT} порта`);
});