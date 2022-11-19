const express = require('express')
const salesRouter = express.Router()
const mysqlConnection = require('../db')
const  getLimitDate = require('../Controllers/LastWeek');
const  getLimitDateMonth = require('../Controllers/LastMonth')

salesRouter.get('/:id', async function(req, res){
    
    const {id} = req.params

    query_ = `SELECT * FROM Sales WHERE SellerID = ${id}`;

    try{
        mysqlConnection.query(query_, function(error, results, fields){

           

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

salesRouter.get('/invoice/:id', async function(req, res){
    const { id } = req.params

    query_ = `SELECT * FROM  Sales WHERE Naturali_Invoice = ${id}`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(400).json({ estado: false, data: {}});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

salesRouter.patch('/invoice/:id', async function(req, res){
    
    const { id } = req.params
    const {PaymentMethod} = req.body

    console.log({PaymentMethod})


    query_ = `UPDATE Sales SET PaymentMethod = '${PaymentMethod}' WHERE Naturali_Invoice = ${id}`;

    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(400).json({ estado: false, data: {}});
            } else {
                console.log('Data OK')
                res.status(200).json({results});
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

salesRouter.get('/lastWeek/:id', async function(req, res){
    
    const {id} = req.params
    const today = new Date().toISOString().split('T')[0]
    const limitDateWeek = getLimitDate()

    query_ = `SELECT * FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${limitDateWeek}" AND "${today}"`
    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

salesRouter.get('/lastMonth/:id', async function(req, res){
    
    const {id} = req.params
    const today = new Date().toISOString().split('T')[0]
    const limitDateMonth = getLimitDateMonth()

    query_ = `SELECT * FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${limitDateMonth}" AND "${today}"`
    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

module.exports = salesRouter;