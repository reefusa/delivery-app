const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketHandler = require('./chat/socketHandler');

require('dotenv').config();
require('./bot/bot');
const PORT = process.env.PORT || 3000;

const verificationRouter = require('./api/routers/tokenRouter');
const loginRouter = require('./api/routers/loginRouter');
const registrationRoutes = require('./api/routers/registrationRoutes');
const clearingDataSqlRoutes = require('./api/routers/clearingDataSqlRoutes');
const orderRoutes = require('./api/routers/orderRoutes');
const accountRouter = require('./api/routers/accountRouter');
const categoriesRouter = require('./api/routers/categoriesRouter');
const disputeRouter = require('./api/routers/disputeRouter');
const moneyRouter = require('./api/routers/moneyRouter');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
// Middleware для чтения text и json
app.use(express.text());
app.use(express.json());
// Middleware для чтения .env
require('dotenv').config();

// app.use(loginRouter);
// app.use(registrationRoutes);
// app.use(orderRoutes);
// app.use(clearingDataSqlRoutes);
// app.use(verificationRouter);
// app.use(accountRouter);
// app.use(categoriesRouter);
// app.use(disputeRouter);
// app.use(moneyRouter);

// const { Server } = require('socket.io');
// const io = new Server(http, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ["GET", "POST"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//         credentials: true
//     }
// });

// socketHandler(io);

app.get('*', (req, res) => {
    res.json('Привет');
});

http.listen(PORT, () => {
    console.log(`Прослушка ${PORT} порта`);
});