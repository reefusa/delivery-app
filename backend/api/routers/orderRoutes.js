const express = require('express');
const orderRoutes = express.Router();
const { createOrderController } = require('../controllers/orderController');

orderRoutes.post('/order/create', createOrderController);

module.exports = orderRoutes;