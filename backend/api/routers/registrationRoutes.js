const express = require('express');
const registrationRoutes = express.Router();
const { registrationCustomerController, registrationCourierController } = require('../controllers/registrationController');

registrationRoutes.post('/registration/customer', registrationCustomerController);
registrationRoutes.post('/registration/courier', registrationCourierController);

module.exports = registrationRoutes;