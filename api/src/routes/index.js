const { Router } = require('express');
const mainRouter = Router();
const loginRouter = require('./loginRoutes')
const sellerRouter = require('./sellersRoutes')
const salesRouter = require('./salesRoutes')
const productsRouter = require('./productsRoutes')
const prodSoldRouter = require('./prodSoldRoutes')
const paymentsRouter = require('./PaymentRoutes')
const ordersRouter = require('./ordersRoutes')
const invoiceErrorsRouter = require('./invoiceErrorsRoutes')
const deliveryRouter = require('./deliveryRoutes')
const projectsRouter = require('./projectsRoutes')
const customersRouter = require('./customersRoutes')
const onedriveRouter  = require('./pdfOneDriveRoutes.js')
const statsRouter = require('./statsRoutes');
const freightRouter = require('./freightRoutes')
const s3Router = require('./s3Routes');
const factoryRouter = require('./factoriesRoutes');

const emailInvoiceRouter = require('./sendInvoiceEmail')
const proformasRoutes = require('./proformasRoutes')

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
mainRouter.use('/api/projects', projectsRouter);
mainRouter.use('/api/customers', customersRouter);
mainRouter.use('/api/stats', statsRouter)
mainRouter.use('/api/s3', s3Router)
mainRouter.use('/api/factories', factoryRouter)
mainRouter.use('/api/freight', freightRouter)
mainRouter.use('/api/invoiceEmail', emailInvoiceRouter)
mainRouter.use('/api/proformas', proformasRoutes)


module.exports = mainRouter