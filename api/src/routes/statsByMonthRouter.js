const express = require('express')
const statsByMonthRouter = express.Router()
const mysqlConnection = require('../db')
const { getLimitDateMonth,getCurrentMonth} = require('../Controllers/LastMonth')
const invoicesPayments = require('../Controllers/invoicesPayments')
const paymentStats = require('../Controllers/paymentStats')
const uniqueYears = require('../Controllers/uniqueYear')

statsByMonthRouter.get('/sellers/:id', async function(req, res){
    
    const { id } = req.params;
    const { month } = req.query;
    const { year } = req.query;
    
    if (!year || !month) {
      res.status(400).json({ message: 'Year and month are required parameters.' });
      return;
    }

    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    console.log('soy mes', month)
    console.log('soy year', year)
    console.log('soy id', id)
    
    if (id === '3') {
      query_ = `SELECT ROUND(SUM(Value), 2) AS TotalValue FROM Sales WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
      query_2 = `SELECT COUNT(*) AS InvoicesNumber FROM Sales WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
      query_3 = `SELECT ROUND(AVG(Value), 2) AS AvgValue FROM Sales WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
      query_4 = `SELECT DISTINCT YEAR(InvoiceDate) AS dates FROM Sales ORDER BY InvoiceDate DESC`;
    } else {
      query_ = `SELECT ROUND(SUM(Value), 2) AS TotalValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
      query_2 = `SELECT COUNT(*) AS InvoicesNumber FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
      query_3 = `SELECT ROUND(AVG(Value), 2) AS AvgValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
      query_4 = `SELECT DISTINCT YEAR(InvoiceDate) AS dates FROM Sales WHERE SellerID = ${id} ORDER BY InvoiceDate DESC`;
    }
    
    
    try{
        mysqlConnection.query(query_, function(error1, results, fields){
           if(error1) throw error1;
           if(results.length == 0) {

               res.status(400).send('Error obtaining data in CurrentMonth Value!', error1);
            } else {
               try{
                   mysqlConnection.query(query_2, function(error2, results2, fields){
                       if(error2) throw error2;
                       if(results2.length == 0) {

                           res.status(400).json('Error obtaining data in Invoice number Count!', error2);
                        } else {
                            try{
                                mysqlConnection.query(query_3, function(error3, results3, fields){
                                    if(error3) throw error3;
                                    if(results3.length == 0) {

                                        res.status(400).json('Error obtaining data in Average Value!');
                                    }else {
                                        try {
                                            mysqlConnection.query(query_4, function(error4, results4, fields){
                                                if(error4) throw error4;
                                                if(results4.length == 0){
                                                    res.status(400).json('Error obtaining data in dates')
                                                }
                                                else{

                                            console.log('Data CurrentMonth Value OK')
                                            console.log('Data Invoice number Count OK')
                                            console.log('Data Average Value OK')
                                            console.log('Data dates OK')
                                        if(results[0].TotalValue === null) results[0].TotalValue = 0;
                                        if(results2[0].InvoicesNumber === null) results2[0].InvoicesNumber = 0;
                                        if(results3[0].AvgValue === null) results3[0].AvgValue = 0;
                                        if(results4[0].dates === null) results4[0].dates = 0;
                                        const totalResults = {
                                            TotalValue: results[0].TotalValue, 
                                            InvoicesNumber: results2[0].InvoicesNumber,
                                            AverageAmount: results3[0].AvgValue,
                                            invoiceDates: results4
                                        }
                                        res.status(200).json(totalResults);
                                    }
                                })
                                    } catch (error4) {
                                        res.status(400).send(error4)
                                    }
                                }
                                })
                                } catch(error3) {
                                    res.status(400).send(error3)
                                }  
                        } 
                    })
                } catch(error2){
                    res.status(409).send(error2);
                }
            }
        })
    } catch(error1){
        res.status(409).send(error1);
    }   
});

statsByMonthRouter.get('/payments/:id', async function(req, res){
    
    const { id } = req.params;
    const { month } = req.query;
    const { year } = req.query;
    const { admin } = req.query
    
    if (!year || !month) {
      res.status(400).json({ message: 'Year and month are required parameters.' });
      return;
    }
    
    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];


    if(id === '3'){
      query_ = `SELECT Sales.Naturali_Invoice, Sales.Value, Sales.InvoiceDate, Sales.SellerID, Sales.Payment_Stamp, Payments.idPayments,
      GROUP_CONCAT(
      CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
      LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID 
      WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Sales.Status != "Canceled"
      GROUP BY Sales.Naturali_Invoice
      ORDER BY Sales.InvoiceDate DESC`  
    } else {
      query_ = `SELECT Sales.Naturali_Invoice, Sales.Value, Sales.InvoiceDate, Sales.SellerID, Sales.Payment_Stamp, Payments.idPayments,
      GROUP_CONCAT(
      CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
      LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID AND Sales.SellerID = ${id} 
      WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Sales.Status != "Canceled" AND Sales.SellerID = ${id} 
      GROUP BY Sales.Naturali_Invoice
      ORDER BY Sales.InvoiceDate DESC`
    }
    try{
        mysqlConnection.query(query_, function(error, Invoices, fields){
         if(error) throw error;
         if(Invoices.length == 0) {
            console.log('Error en statsRoutesByMonth.get /payments')
            let result = paymentStats(Invoices)
            res.status(200).json(result);
         }else{
            let result = paymentStats(Invoices)
            res.status(200).json(result);
         }})}catch(error){
             res.status(409).send(error);
      }
});

module.exports = statsByMonthRouter;