const { Router } = require('express');
const loginRouter = require('./loginRoutes')
const sellerRouter = require('./sellersRoutes')
const salesRouter = require('./salesRoutes')
const productsRouter = require('./productsRoutes')
const prodSoldRouter = require('./prodSoldRoutes')
const paymentsRouter = require('./PaymentRoutes')
const ordersRouter = require('./ordersRoutes')
const invoiceErrorsRouter = require('./invoiceErrorsRoutes')
const deliveryRouter = require('./deliveryRoutes')
const mainRouter = Router();
const projectsRouter = require('./projectsRoutes')
const customersRouter = require('./customersRoutes')
const onedriveRouter  = require('./pdfOneDriveRoutes.js')
const statsByMonthRouter = require('./statsByMonthRouter')


mainRouter.use('/api/login', loginRouter);
mainRouter.use('/api/seller', sellerRouter);
mainRouter.use('/api/sales', salesRouter);
mainRouter.use('/api/products', productsRouter);
mainRouter.use('/api/prodSold', prodSoldRouter);
mainRouter.use('/api/payments', paymentsRouter);
mainRouter.use('/api/orders', ordersRouter);
mainRouter.use('/api/invoiceErrors', invoiceErrorsRouter);
mainRouter.use('/api/delivery', deliveryRouter);
mainRouter.use('/api/one-drive-data', onedriveRouter);
mainRouter.use('/api/project', projectsRouter);
mainRouter.use('/api/customers', customersRouter);
mainRouter.use('/api/statsByMonth', statsByMonthRouter);



module.exports = mainRouter