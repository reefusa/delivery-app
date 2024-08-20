const express = require('express');
const moneyRouter = express.Router();

const { moneyPay } = require('../controllers/moneyController');
const { verifyTokenMiddlewares } = require('../../middlewares/verifyTokenMiddlewares');

moneyRouter.get('/money/pay', verifyTokenMiddlewares, moneyPay);

module.exports = moneyRouter;