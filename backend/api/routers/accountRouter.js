const express = require('express');
const accountRouter = express.Router();
const { verifyTokenMiddlewares } = require('../../middlewares/verifyTokenMiddlewares');
const { loginAccountController, logoutAccountController, deleteAccountController, updateVerificatoinPassportAccountController, uploadsFileAccountController, updateAccountController, deleteInfoAccountController } = require('../controllers/accountController');
const { checUserkFileExistsMiddlewares, deleteFileMiddleware } = require('../../middlewares/workingFiles');

accountRouter.get('/account', verifyTokenMiddlewares, loginAccountController);
accountRouter.post('/account/update', verifyTokenMiddlewares, updateAccountController);
accountRouter.get('/account/logout', verifyTokenMiddlewares, logoutAccountController);
accountRouter.get('/account/delete', verifyTokenMiddlewares, deleteAccountController);
accountRouter.get('/account/update/verificatoin/passport', updateVerificatoinPassportAccountController);
accountRouter.get('/account/uploads/:type/:filename/', verifyTokenMiddlewares, checUserkFileExistsMiddlewares, uploadsFileAccountController);
accountRouter.get('/account/delete/info/:last_name/:name', verifyTokenMiddlewares, deleteFileMiddleware, deleteInfoAccountController);

module.exports = accountRouter;