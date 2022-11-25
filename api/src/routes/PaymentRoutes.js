const express = require('express')
const PaymentRouter = express.Router()
const mysqlConnection = require('../db')
const payments = require('../Controllers/payments')




PaymentRouter.get('/:id', async function(req, res){
    const { id } = req.params
    query_ = `SELECT * FROM Payments WHERE InvoiceID = ${id}`

    query_2 = `SELECT * from Sales WHERE Naturali_Invoice = ${id}`;

    try{
        mysqlConnection.query(query_, function(error, paymentData, fields){
            if(error) throw error;
            if(paymentData.length == 0) {
                console.log('Error al obtener data en getpayments')
                res.status(200).json({ estado: false, data: {}});
            } else {
                try{
                    mysqlConnection.query(query_2, function(error, invoiceData, fields){
                        if(error) throw error;
                        if(invoiceData.length == 0) {
                            console.log('Error al obtener data en getdetails')
                            res.status(200).json({ estado: false, data: {}});
                        } else{
                            let paymentsMath = payments(paymentData, invoiceData)
                            res.status(200).json({paymentData,invoiceData, paymentsMath});
                        }})
                    }catch(error){
                        res.status(400).send(error)
                    }  
            }   
            });
        } catch(error){
            res.status(409).send(error);
        }
});

PaymentRouter.post('/invoice/:id', async function(req, res){
    
    const { id } = req.params
    const {PaymentMethod} = req.body
    const today = new Date().toISOString()

    query_ = `UPDATE Sales SET PaymentMethod = '${PaymentMethod}', PaymentDate = '${today}' WHERE Naturali_Invoice = ${id}`;

    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data en PaymentMethod!')
                res.status(400).json({ estado: false, data: {}});
            } else {
                try{
                    query_ = `UPDATE Sales SET PaymentStatus = true WHERE Naturali_Invoice = ${id}`;
                    mysqlConnection.query(query_, function(error, results2, fields){
                        if(error) throw error;
                        if(results.length == 0) {
                            console.log('Error al obtener data en PaymentStatus!')
                            res.status(400).json({ estado: false, data: {}});
                        } else{
                            console.log('Data status OK')
                            console.log('Data method ok')
                            res.status(200).json({results, results2});
                        }})
                    }catch(error){
                        res.status(400).send(error)
                    }  
            }   
            });
        } catch(error){
            res.status(409).send(error);
        }
});

module.exports = PaymentRouter