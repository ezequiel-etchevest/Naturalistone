const express = require('express')
const statsRouter = express.Router()
const mysqlConnection = require('../db')
const {getCurrentMonth} = require('../Controllers/LastMonth')



statsRouter.get('/:id', async function(req, res){
    
    const {id} = req.params
    const { admin } = req.query
    const today = new Date().toISOString().split('T')[0]
    const currentMonth = getCurrentMonth()
    console.log({id, admin})
    if(admin === '1'){
      query_ = `SELECT ROUND(SUM(Value), 2) As TotalValue FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
      query_2 = `SELECT count(*) As InvoicesNumber FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
      query_3 = `SELECT ROUND(AVG(Value), 2) As AvgValue FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
    } else {
      query_ = `SELECT ROUND(SUM(Value), 2) As TotalValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
      query_2 = `SELECT count(*) As InvoicesNumber FROM Sales where SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
      query_3 = `SELECT ROUND(AVG(Value), 2) As AvgValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
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
                                        console.log('Data CurrentMonth Value OK')
                                        console.log('Data Invoice number Count OK')
                                        console.log('Data Average Value OK')

                                        if(results[0].TotalValue === null) results[0].TotalValue = 0;
                                        if(results2[0].InvoicesNumber === null) results2[0].InvoicesNumber = 0;
                                        if(results3[0].AvgValue === null) results3[0].AvgValue = 0;
                                        const totalResults = {
                                            TotalValue: results[0].TotalValue, 
                                            InvoicesNumber: results2[0].InvoicesNumber,
                                            AverageAmount: results3[0].AvgValue
                                         }
                                        res.status(200).json(totalResults);
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

module.exports = statsRouter;