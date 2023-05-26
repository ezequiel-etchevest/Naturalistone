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
    query_7A = `SELECT Payments.*, Sales.SellerID, Sales.Status FROM Payments
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
    query_7 = `SELECT Payments.*, Sales.SellerID, Sales.Status FROM Payments
                LEFT JOIN Sales ON Payments.InvoiceID = Sales.Naturali_Invoice
                WHERE Sales.SellerID = ${sellerID} AND Payments.Date BETWEEN '${startDate}' AND '${endDate}' AND Sales.Status != 'Canceled'`

    let promisesA = [query_1A, query_2A, query_3A, query_4A, query_5A, query_6A, query_7A].map(query => new Promise((resolve, reject) => {
        mysqlConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }));
    let promises = [query_1, query_2, query_3, query_4,query_5, query_6, query_7].map(query => new Promise((resolve, reject) => {
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
            const [result_1, result_2, result_3, result_4, result_5, result_6, result_7] = results;
          
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
                TotalAmount: result_6[0].total_amount,
                invoices: result_5,
                payments: result_7,
                }
            res.status(200).json(totalResults);
        })
        .catch(error => {
            console.error(error);
        });
    


            })


module.exports = statsRouter;