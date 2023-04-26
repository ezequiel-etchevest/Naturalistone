const express = require('express');
const paymentsByMonthRouter = express.Router();
const mysqlConnection = require('../db')


paymentsByMonthRouter.get('/:id', async function(req, res) {

    const { id } = req.params;
    const { month } = req.query;
    const { year } = req.query;
    
    if (!year || !month) {
      res.status(400).json({ message: 'Year and month are required parameters.' });
      return;
    }

    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    
    if(id === '3'){
        query_ = `SELECT SUM(Payments.amount) AS total_amount, Payments.*, Sales.SellerID, Sales.Status FROM Payments
        LEFT JOIN Sales ON Payments.InvoiceID = Sales.Naturali_Invoice
        WHERE Payments.Date BETWEEN '${startDate}' AND '${endDate}' AND Sales.Status != 'Canceled'`
      } else {
        query_ = `SELECT SUM(Payments.amount) AS total_amount, Payments.*, Sales.SellerID, Sales.Status FROM Payments
        LEFT JOIN Sales ON Payments.InvoiceID = Sales.Naturali_Invoice
        WHERE Sales.SellerID = ${id} AND Payments.Date BETWEEN '${startDate}' AND '${endDate}' AND Sales.Status != 'Canceled'`
      }

      try {
          mysqlConnection.query(query_, function(error1, results, fields) {
            console.log('soy error1', error1)
            console.log('soy results', results[0])
            try {
                if (results.length === 0) {
                    return res.status(400).json({success: false, msg:'Error obtaining data in CurrentMonth Value!', error1})
                }
                return res.status(200).json({success: true, data: results[0]})
            } catch (error) {
                if (error1) throw error1
                console.log('soy error en paymentsByMonth', error)
            }
        })
      } catch (error) {
        
      }
})

module.exports = paymentsByMonthRouter;