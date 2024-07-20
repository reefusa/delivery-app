const express = require('express');
const verificationRouter = express.Router();
const { verificationController } = require('../controllers/verificationController');

verificationRouter.post('/login', verificationController);

module.exports = verificationRouter;