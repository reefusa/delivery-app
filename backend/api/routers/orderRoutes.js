const express = require('express');
const orderRoutes = express.Router();
const { createOrderController, statusUpdateOrderController, getItemCourierOrderController, loadingGoodsOrderController, loadingOneProductOrderController, calcOrderController, loadingCoureirWorkOrderController, acceptCustomerOrderController, submitCustomerOrderController } = require('../controllers/orderController');
const { verifyTokenMiddlewares } = require('../../middlewares/verifyTokenMiddlewares');
const { fileHandlerMiddlewares } = require('../../middlewares/workingFiles');

orderRoutes.post('/order/create', verifyTokenMiddlewares, fileHandlerMiddlewares, createOrderController);
orderRoutes.post('/order/status', statusUpdateOrderController);
orderRoutes.get('/order/loading', verifyTokenMiddlewares, loadingGoodsOrderController);
orderRoutes.get('/order/loading/courier/work', verifyTokenMiddlewares, loadingCoureirWorkOrderController);
orderRoutes.get('/order/load/:id', verifyTokenMiddlewares, loadingOneProductOrderController);
orderRoutes.post('/order/calc', verifyTokenMiddlewares, calcOrderController);
// 
orderRoutes.get('/order/update/get/work/:item_id', verifyTokenMiddlewares, getItemCourierOrderController);
orderRoutes.get('/order/update/accept/customer/:item_id', verifyTokenMiddlewares, acceptCustomerOrderController);
orderRoutes.get('/order/update/submit/:item_id', verifyTokenMiddlewares, submitCustomerOrderController);

module.exports = orderRoutes;