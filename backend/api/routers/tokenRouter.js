const express = require('express');
const verificationRouter = express.Router();
const { verificationTokenController, updateTokenController, createTokenController } = require('../controllers/tokenController');
const { verifyTokenMiddlewares } = require('../../middlewares/verifyTokenMiddlewares');

verificationRouter.post('/token/update', updateTokenController);
verificationRouter.get('/token/verification', verifyTokenMiddlewares, verificationTokenController);
verificationRouter.post('/token/create', createTokenController);

module.exports = verificationRouter;