const express = require('express');
const { openDisputeController, viewDisputeController } = require('../controllers/disputeController');
const { verifyTokenMiddlewares } = require('../../middlewares/verifyTokenMiddlewares');
const disputeRouter = express.Router();

disputeRouter.get('/dispute/open/:item_id', verifyTokenMiddlewares, openDisputeController);
disputeRouter.get('/dispute/view/', verifyTokenMiddlewares, viewDisputeController);

module.exports = disputeRouter;