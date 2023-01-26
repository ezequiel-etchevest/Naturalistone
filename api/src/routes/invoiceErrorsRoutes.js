const express = require('express')
const invoiceErrorsRouter = express.Router()
const mysqlConnection = require('../db')


invoiceErrorsRouter.get('/', async function(req, res){

    const {id} = req.params

    query_ = `SELECT InvoiceErrors.*, Seller.FirstName, Seller.LastName FROM InvoiceErrors
              LEFT JOIN Seller ON InvoiceErrors.SellerID = Seller.SellerID`;
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

invoiceErrorsRouter.get('/:id', async function(req, res){

    const {id} = req.params

    query_ = `SELECT * FROM InvoiceErrors where SellerID = ${id}`;
    try{
         mysqlConnection.query(query_, function(error, results){
            if(!results?.length) {
                console.log(`No invoices on ID ${id}`)
                res.status(200).json([]);
            } else {
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});



module.exports = invoiceErrorsRouter;