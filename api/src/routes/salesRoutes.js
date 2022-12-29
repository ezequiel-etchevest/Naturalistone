const express = require('express')
const salesRouter = express.Router()
const mysqlConnection = require('../db')
const  getLimitDate = require('../Controllers/LastWeek');
const invoicesPayments = require('../Controllers/invoicesPayments')
const  { getLimitDateMonth, getCurrentMonth } = require('../Controllers/LastMonth')

salesRouter.get('/:id', async function(req, res){
    
    const {id} = req.params

    query_ =    `SELECT Sales.*, Projects.*, Payments.idPayments, GROUP_CONCAT(
                CONCAT (Payments.idPayments,';',Payments.Amount,';',Payments. Date))AS Payments FROM Sales 
                LEFT JOIN Projects ON Sales.ProjectID = Projects.CustomerID
                LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID 
                WHERE SellerID = ${id}
                GROUP BY Sales.Naturali_Invoice
                ORDER BY Sales.Naturali_Invoice DESC`;
    
    try{
           mysqlConnection.query(query_, function(error, Invoices, fields){
                        if(error) throw error;
                        if(Invoices.length == 0) {
                            console.log('Error en salesRoutes.get /:id')
                            res.status(200).json({});
                        }else{
                            let result = invoicesPayments(Invoices)
                            res.status(200).json(result);
                        }})}catch(error){
                            res.status(409).send(error);
               }
            })
        

salesRouter.get('/invoice/:id', async function(req, res){
    const { id } = req.params

    query_ =    `SELECT Sales.*, Projects.* FROM Sales
                LEFT JOIN Projects ON Sales.ProjectID = Projects.CustomerID 
                WHERE Naturali_Invoice = ${id}`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en salesRoutes.get /invoice/:id')
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

salesRouter.get('/lastWeek/:id', async function(req, res){
    
    const {id} = req.params
    const today = new Date().toISOString().split('T')[0]
    const limitDateWeek = getLimitDate()

    query_ = `SELECT Sales.*, Customers.* FROM Sales 
                LEFT JOIN Customers ON Sales.CustomerID = Customers.CustomerID 
                WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${limitDateWeek}" AND "${today}" ORDER BY InvoiceDate DESC`
    
//    query_ = `SELECT * FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${limitDateWeek}" AND "${today}"`
    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('No invoices matched')
                res.status(200).json([]);
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

    query_ = `SELECT Sales.*, Customers.* FROM Sales 
                LEFT JOIN Customers ON Sales.CustomerID = Customers.CustomerID 
                WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${limitDateMonth}" AND "${today}" ORDER BY InvoiceDate DESC`
    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('No invoices matched')
                res.status(200).json([]);
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

salesRouter.get('/currentMonth/:id', async function(req, res){
    
    const {id} = req.params
    const today = new Date().toISOString().split('T')[0]
    const currentMonth = getCurrentMonth()

    query_ = `SELECT ROUND(SUM(Value), 2) As TotalValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
    query_2 = `SELECT count(*) As InvoicesNumber FROM Sales where SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
    query_3 = `SELECT ROUND(AVG(Value), 2) As AvgValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
    
    try{
        mysqlConnection.query(query_, function(error1, results, fields){
           if(error1) throw error1;
           if(results.length == 0) {
            //    console.log('Error al obtener data en CurrentMonth Value!')
               res.status(400).send('Error obtaining data in CurrentMonth Value!', error1);
            } else {
               try{
                   mysqlConnection.query(query_2, function(error2, results2, fields){
                       if(error2) throw error2;
                       if(results2.length == 0) {
                        //    console.log('Error al obtener data en Invoice number Count!')
                           res.status(400).json('Error obtaining data in Invoice number Count!', error2);
                        } else {
                            try{
                                mysqlConnection.query(query_3, function(error3, results3, fields){
                                    if(error3) throw error3;
                                    if(results3.length == 0) {
                                        // console.log('Error al obtener data en PaymentStatus!')
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


salesRouter.patch('/quotes/:id', async function(req, res){
    
    const {id} = req.params

    query_ = `UPDATE Sales SET Stamped = true WHERE Naturali_Invoice =${id}`

    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('Failure updating Stamped Column')
                res.status(200).json('');
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