const { Router } = require('express');
const loginRouter = require('./loginRoutes')
const sellerRouter = require('./sellersRoutes')
const salesRouter = require('./salesRoutes')
const mainRouter = Router();


mainRouter.use('/login', loginRouter);
mainRouter.use('/seller', sellerRouter);
mainRouter.use('/sales', salesRouter);

module.exports = mainRouter