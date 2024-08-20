const express = require('express');
const registrationRoutes = express.Router();
const { fileHandlerMiddlewares, parseFormDataMiddleware } = require('../../middlewares/workingFiles');
const { registrationCustomerController, registrationCourierController } = require('../controllers/registrationController');

registrationRoutes.post('/registration/customer', parseFormDataMiddleware, registrationCustomerController);
registrationRoutes.post('/registration/courier', fileHandlerMiddlewares, registrationCourierController);

module.exports = registrationRoutes;