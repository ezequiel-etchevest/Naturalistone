const express = require('express')
const PaymentRouter = express.Router()
const mysqlConnection = require('../db')
const payments = require('../Controllers/payments')


PaymentRouter.get('/:id', async function(req, res){
    const { id } = req.params
    query_ = `SELECT * FROM Payments WHERE Payments.InvoiceID = ${id}`

    query_2 = `SELECT * from Sales WHERE Sales.Naturali_Invoice = ${id}`;

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
    const {input, seller} = req.body
    const today = new Date().toISOString()

    query_ = `INSERT INTO Payments (Method, Date, Amount, InvoiceID, \`By\`) VALUES ("${input.Method}","${today}","${input.Amount}","${id}","${seller}")`;

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

PaymentRouter.delete('/invoice/:id/:seller', async function(req, res){
  const { id, seller } = req.params

  try{
    mysqlConnection.beginTransaction(function(error){
      if(error) {
        console.log('Error in start BeginTransaction, paymentRoutes.delete /invoice/:id' + error)
        res.status(500).json('failed to start Begin transaction')
        return;
      }

      query_ = `UPDATE Payments SET \`By\` = ${seller} WHERE idPayments = ${id}`

      mysqlConnection.query(query_, function(error, results, fields) {
        if (error) {
          console.log('Error in update payments By, PaymentsRoutes /invoice/:id/:seller' + error)
          res.status(500).json('Failed to update payments to propertie By')
          return mysqlConnection.rollback(function() {
            throw error
          })
        }
        console.log('Update payment completed', results)

        query_1 = `DELETE FROM Payments WHERE idPayments = ${id}`
  
        mysqlConnection.query(query_1, function(error1, results1, fields){
          
          if(error1) {
            console.log('Error in delete Payments in PaymentRoutes /invoices/:id/:seller' + error)
            res.status(500).json('Failed to delete payments')
            return mysqlConnection.rollback(function() {
              throw error
            })
          };
          if(results1.length == 0) {
            console.log('Error en delete')
            res.status(200).json({ estado: false, data: {}});
          } else {
            res.status(200).json({results1})
            commitTransaction();
            return;
          }
        })
      })

    })}catch(error){
        res.status(409).send(error);
    }
    
    function commitTransaction() {
      mysqlConnection.commit(function(err) {
        if (err) {
          console.log('Error in paymentRoutes.delete /invoice/id ' + err);
          res.status(500).json('Failed to delete payment');
          return mysqlConnection.rollback(function() {
            throw err;
          });
        }
    
        console.log('Transaction committed successfully, payment delete');
        return;
      });
    }

  })
       
module.exports = PaymentRouter