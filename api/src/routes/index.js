const { Router } = require('express');
const loginRouter = require('./loginRoutes')
const sellerRouter = require('./sellersRoutes')
const salesRouter = require('./salesRoutes')
const productsRouter = require('./productsRoutes')
// const customersRouter = require('./customersRoutes')
const mainRouter = Router();


mainRouter.use('/login', loginRouter);
mainRouter.use('/seller', sellerRouter);
mainRouter.use('/sales', salesRouter);
mainRouter.use('/products', productsRouter);
// mainRouter.use('/customers', customersRouter);

module.exports = mainRouter