const express = require('express')
const invoiceErrorsRouter = express.Router()
const mysqlConnection = require('../db')


invoiceErrorsRouter.get('/', async function(req, res){

    const {id} = req.params
    query_ = `SELECT * FROM InvoiceErrors`;
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



module.exports = invoiceErrorsRouter;