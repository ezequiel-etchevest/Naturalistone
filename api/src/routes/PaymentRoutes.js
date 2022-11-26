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
            else {
                try{
                    mysqlConnection.query(query_2, function(error, invoiceData, fields){
                        let paymentsMath = {
                            PaymentPercentaje: 0,
                            PendingAmount: invoiceData[0].Value,
                        }
                        if(error) throw error;
                        if(invoiceData.length == 0) {
                            res.status(200).json({paymentData, invoiceData, paymentsMath});
                        } else{
                            paymentsMath = payments(paymentData, invoiceData)
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
    const input = req.body
    const today = new Date().toISOString()

    query_ = `INSERT INTO Payments (Method, Date, Amount, InvoiceID) VALUES ("${input.Method}","${today}","${input.Amount}","${id}")`;

    try{
         mysqlConnection.query(query_, function(error, results, fields){
            
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data en Payment!')
                res.status(200).json({ estado: false, data: {}});
            
            } else res.status(200).json({results})
        })}catch(error){
            res.status(409).send(error);
        }}
)

PaymentRouter.delete('/invoice/:id', async function(req, res){
    const { id } = req.params
    query_= `DELETE FROM Payments WHERE idPayments = ${id}`
    try{
    mysqlConnection.query(query_, function(error, results, fields){
            
        if(error) throw {error};
        if(results.length == 0) {
            console.log('Error en delete')
            res.status(200).json({ estado: false, data: {}});
        
        } else res.status(200).json({results})
    })}catch(error){
        res.status(409).send(error);
    }}
)
       
module.exports = PaymentRouter