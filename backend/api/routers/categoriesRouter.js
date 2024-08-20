const express = require('express');
const categoriesRouter = express.Router();
const { verifyTokenMiddlewares } = require('../../middlewares/verifyTokenMiddlewares');
const { getCategoriesContoroller } = require('../controllers/categoriesContoroller');

categoriesRouter.get('/categories/get', verifyTokenMiddlewares, getCategoriesContoroller)

module.exports = categoriesRouter;