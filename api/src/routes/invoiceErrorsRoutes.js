const express = require('express')
const invoiceErrorsRouter = express.Router()
const mysqlConnection = require('../db')
const filterInvoiceErrorsController = require('../Controllers/invoiceErrorsFiltersController')

invoiceErrorsRouter.get('/', async function(req, res){


    query_ = `SELECT InvoiceErrors.*, Seller.FirstName, Seller.LastName FROM InvoiceErrors
              LEFT JOIN Seller ON InvoiceErrors.SellerID = Seller.SellerID Order By Date desc`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error en invoiceErrorsRouter.get /')
                res.status(400).json(error);
            } else {
                console.log('InvoiceErrors Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

invoiceErrorsRouter.get('/filtered', async function(req, res){

    const {id, type} = req.query

    query_ = `SELECT InvoiceErrors.*, Seller.FirstName, Seller.LastName FROM InvoiceErrors
              LEFT JOIN Seller ON InvoiceErrors.SellerID = Seller.SellerID  Order By Date desc`;
    try{
         mysqlConnection.query(query_, function(error, results){
            if(!results?.length) {
                console.log(`No invoices on ID ${id}`)
                res.status(200).json([]);
            } else {
                const filter = filterInvoiceErrorsController(id, type, results)
                res.status(200).json(filter);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});



module.exports = invoiceErrorsRouter;