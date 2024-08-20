const express = require('express');
const chatRoute = express.Router();
const { chatConnection } = require('../controllers/chatController');

chatRoute.post('/chat', chatConnection);

module.exports = chatRoute;