const { Router } = require('express');
const loginRouter = require('./loginRoutes')
const sellerRouter = require('./sellersRoutes')
const salesRouter = require('./salesRoutes')
const productsRouter = require('./productsRoutes')
const prodSoldRouter = require('./prodSoldRoutes')
const paymentsRouter = require('./PaymentRoutes')
const ordersRouter = require('./ordersRoutes')
const mainRouter = Router();


mainRouter.use('/login', loginRouter);
mainRouter.use('/seller', sellerRouter);
mainRouter.use('/sales', salesRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/prodSold', prodSoldRouter);
mainRouter.use('/payments', paymentsRouter);
mainRouter.use('/orders', ordersRouter);
// mainRouter.use('/customers', customersRouter);


module.exports = mainRouter