const express = require('express')
const statsRouter = express.Router()
const mysqlConnection = require('../db')
const paymentStats = require('../Controllers/paymentStats')

statsRouter.get('/', async function(req, res){

    const { sellerID, month, year } = req.query

    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0]

    query_1A = `SELECT ROUND(SUM(Value), 2) AS TotalValue FROM Sales WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
    query_2A = `SELECT COUNT(*) AS InvoicesNumber FROM Sales WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
    query_3A = `SELECT ROUND(AVG(Value), 2) AS AvgValue FROM Sales WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
    query_4A = `SELECT DISTINCT YEAR(InvoiceDate) AS dates FROM Sales ORDER BY InvoiceDate DESC`;
    query_5A = `SELECT Sales.Naturali_Invoice, Sales.Value, Sales.InvoiceDate, Sales.SellerID, Sales.Payment_Stamp, Payments.idPayments,
               GROUP_CONCAT(
                CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
                LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID 
                WHERE InvoiceDate BETWEEN "${startDate}" AND "${today}" AND Sales.Status != "Canceled"
                GROUP BY Sales.Naturali_Invoice
                ORDER BY Sales.InvoiceDate DESC`
    query_6A = `SELECT SUM(Payments.Amount) AS total_amount, Payments.*, Sales.SellerID, Sales.Status FROM Payments
                LEFT JOIN Sales ON Payments.InvoiceID = Sales.Naturali_Invoice
                WHERE Payments.Date BETWEEN '${startDate}' AND '${endDate}' AND Sales.Status != 'Canceled'`    
    query_1 = `SELECT ROUND(SUM(Value), 2) AS TotalValue FROM Sales WHERE SellerID = ${sellerID} AND InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
    query_2 = `SELECT COUNT(*) AS InvoicesNumber FROM Sales WHERE SellerID = ${sellerID} AND InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
    query_3 = `SELECT ROUND(AVG(Value), 2) AS AvgValue FROM Sales WHERE SellerID = ${sellerID} AND InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Status != "Canceled"`;
    query_4 = `SELECT DISTINCT YEAR(InvoiceDate) AS dates FROM Sales WHERE SellerID = ${sellerID} ORDER BY InvoiceDate DESC`;
    query_5 = `SELECT Sales.Naturali_Invoice, Sales.Value, Sales.InvoiceDate, Sales.SellerID, Sales.Payment_Stamp, Payments.idPayments,
                GROUP_CONCAT(
                CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
                LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID AND Sales.SellerID = ${sellerID} 
                WHERE InvoiceDate BETWEEN "${startDate}" AND "${endDate}" AND Sales.Status != "Canceled" AND Sales.SellerID = ${sellerID} 
                GROUP BY Sales.Naturali_Invoice ORDER BY Sales.InvoiceDate DESC`
    query_6 = `SELECT SUM(Payments.Amount) AS total_amount, Payments.*, Sales.SellerID, Sales.Status FROM Payments
                LEFT JOIN Sales ON Payments.InvoiceID = Sales.Naturali_Invoice
                WHERE Sales.SellerID = ${sellerID} AND Payments.Date BETWEEN '${startDate}' AND '${endDate}' AND Sales.Status != 'Canceled'`

    let promisesA = [query_1A, query_2A, query_3A, query_4A, query_5A, query_6A].map(query => new Promise((resolve, reject) => {
        mysqlConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }));
    let promises = [query_1, query_2, query_3, query_4,query_5, query_6].map(query => new Promise((resolve, reject) => {
        mysqlConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }));
    
    Promise.all(sellerID == '3' ? promisesA : promises)
        .then(results => {
            // Aquí puedes trabajar con los resultados de cada consulta
            const [result_1, result_2, result_3, result_4, result_5, result_6] = results;
          
            if(result_1[0].TotalValue === null || result_1[0].TotalValue === undefined) result_1[0].TotalValue = 0;
            if(result_2[0].InvoicesNumber === null || result_2[0].InvoicesNumber === undefined) result_2[0].InvoicesNumber = 0;
            if(result_3[0].AvgValue === null || result_3[0].AvgValue === undefined) result_3[0].AvgValue = 0;
            let Payments = paymentStats(result_5)
            let { ClosingRate, TotalCharged, ClosingDaysAvg, ClosingQuotes, PaidQuotes } = Payments
            const totalResults = {
                TotalValue: result_1[0].TotalValue, 
                InvoicesNumber: result_2[0].InvoicesNumber,
                AverageAmount: result_3[0].AvgValue,
                YearsInvoices: result_4.map(e => e.dates),
                ClosingRate,
                TotalCharged,
                ClosingDaysAvg,
                ClosingQuotes,
                PaidQuotes,
                TotalAmount: result_6[0].total_amount
                }
            res.status(200).json(totalResults);
        })
        .catch(error => {
            console.error(error);
        });
    


            })

// statsRouter.get('/sellers/:id', async function(req, res){
    
//     const { id } = req.params
//     const { admin } = req.query
//     const today = new Date().toISOString().split('T')[0]
//     const currentMonth = getCurrentMonth()

//     if(id === '3'){
//       query_ = `SELECT ROUND(SUM(Value), 2) As TotalValue FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}"  AND Status != "Canceled"`
//       query_2 = `SELECT count(*) As InvoicesNumber FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}" `
//       query_3 = `SELECT ROUND(AVG(Value), 2) As AvgValue FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}" AND Status != "Canceled"`
//     } else {
//       query_ = `SELECT ROUND(SUM(Value), 2) As TotalValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}" AND Status != "Canceled"`
//       query_2 = `SELECT count(*) As InvoicesNumber FROM Sales where SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}" AND Status != "Canceled"`
//       query_3 = `SELECT ROUND(AVG(Value), 2) As AvgValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}" AND Status != "Canceled"`
//     }
    
//     try{
//         mysqlConnection.query(query_, function(error1, results, fields){
//            if(error1) throw error1;
//            if(results.length == 0) {

//                res.status(400).send('Error obtaining data in CurrentMonth Value!', error1);
//             } else {
//                try{
//                    mysqlConnection.query(query_2, function(error2, results2, fields){
//                        if(error2) throw error2;
//                        if(results2.length == 0) {

//                            res.status(400).json('Error obtaining data in Invoice number Count!', error2);
//                         } else {
//                             try{
//                                 mysqlConnection.query(query_3, function(error3, results3, fields){
//                                     if(error3) throw error3;
//                                     if(results3.length == 0) {

//                                         res.status(400).json('Error obtaining data in Average Value!');
//                                     }else {
//                                         console.log('Data CurrentMonth Value OK')
//                                         console.log('Data Invoice number Count OK')
//                                         console.log('Data Average Value OK')

//                                         if(results[0].TotalValue === null) results[0].TotalValue = 0;
//                                         if(results2[0].InvoicesNumber === null) results2[0].InvoicesNumber = 0;
//                                         if(results3[0].AvgValue === null) results3[0].AvgValue = 0;
//                                         const totalResults = {
//                                             TotalValue: results[0].TotalValue, 
//                                             InvoicesNumber: results2[0].InvoicesNumber,
//                                             AverageAmount: results3[0].AvgValue
//                                          }
//                                         res.status(200).json(totalResults);
//                                     }
//                                 })
//                                 } catch(error3) {
//                                     res.status(400).send(error3)
//                                 }  
//                         } 
//                     })
//                 } catch(error2){
//                     res.status(409).send(error2);
//                 }
//             }
//         })
//     } catch(error1){
//         res.status(409).send(error1);
//     }   
// });

// statsRouter.get('/payments/:id', async function(req, res){
    
//     const {id} = req.params
//     const { admin } = req.query
//     const today = new Date().toISOString().split('T')[0]
//     const currentMonth = getCurrentMonth()


//     if(id === '3'){
//       query_ = `SELECT Sales.Naturali_Invoice, Sales.Value, Sales.InvoiceDate, Sales.SellerID, Sales.Payment_Stamp, Payments.idPayments,
//       GROUP_CONCAT(
//       CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
//       LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID 
//       WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}" AND Sales.Status != "Canceled"
//       GROUP BY Sales.Naturali_Invoice
//       ORDER BY Sales.InvoiceDate DESC`  
//     } else {
//       query_ = `SELECT Sales.Naturali_Invoice, Sales.Value, Sales.InvoiceDate, Sales.SellerID, Sales.Payment_Stamp, Payments.idPayments,
//       GROUP_CONCAT(
//       CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
//       LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID AND Sales.SellerID = ${id} 
//       WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}" AND Sales.Status != "Canceled" AND Sales.SellerID = ${id} 
//       GROUP BY Sales.Naturali_Invoice
//       ORDER BY Sales.InvoiceDate DESC`
//     }
//     try{
//         mysqlConnection.query(query_, function(error, Invoices, fields){
//          if(error) throw error;
//          if(Invoices.length == 0) {
//              console.log('Error en statsRoutes.get /payments')
//              res.status(200).json({});
//          }else{
//             let result = paymentStats(Invoices)
//             res.status(200).json(result);
//          }})}catch(error){
//              res.status(409).send(error);
//       }
// });

module.exports = statsRouter;