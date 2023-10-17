const express = require('express')
const prodSoldRouter = express.Router()
const mysqlConnection = require('../db')
const historyPrice = require('../Controllers/historyPrice')


prodSoldRouter.get('/:id', async function(req, res){
    
    const {id} = req.params

    query_ =   `SELECT Products.*,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.Quantity
                  ELSE SpecialProducts.Quantity
                END AS Quantity,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.Delivered
                  ELSE SpecialProducts.Delivered
                END AS Delivered,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.SalePrice
                  ELSE SpecialProducts.SalePrice
                END AS SalePrice,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.InStock_Reserved
                  ELSE 0
                END AS InStock_Reserved,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.InStock_PendingPayment
                  ELSE 0
                END AS InStock_PendingPayment,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.Incoming_Reserved
                  ELSE 0
                END AS Incoming_Reserved,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.Incoming_PendingPayment
                  ELSE 0
                END AS Incoming_PendingPayment,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.Order_PaymentCompleted
                  ELSE 0
                END AS Order_PaymentCompleted,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdSold.Order_PendingPayment
                  ELSE 0
                END AS Order_PendingPayment,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdNames.Naturali_ProdName
                  ELSE SpecialProducts.ProdName
                END AS ProductName,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN Dimension.Type
                  ELSE SpecialProducts.Type
                END AS Type,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN Dimension.Type
                  ELSE SpecialProducts.Type
                END AS Type,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN Dimension.Size
                  ELSE SpecialProducts.Size
                END AS Size,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN Dimension.Finish
                  ELSE SpecialProducts.Finish
                END AS Finish,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN ProdNames.Material
                  ELSE SpecialProducts.Material
                END AS Material,
                CASE
                  WHEN Products.ProdID IS NOT NULL THEN Dimension.Thickness
                  ELSE SpecialProducts.Thickness
                END AS Thickness
                FROM ProdSold
                LEFT JOIN Products ON Products.ProdID = ProdSold.ProdID
                LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                LEFT JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                LEFT JOIN SpecialProducts ON SpecialProducts.SaleID = ProdSold.SaleID
                WHERE ProdSold.SaleID = ${id} AND ProdSold.Status != "Canceled"
                ORDER BY ProdNames.Naturali_ProdName ASC`;


    try{
        mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('No products linked to this quote')
                res.status(200).send('No products linked to this quote');
            } else {

                console.log('data ok')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

prodSoldRouter.get('/historyprice/:id', async function(req, res){
    
    const {id} = req.params

    query_ =   `SELECT ProdSold.SalePrice, Sales.InvoiceDate, Sales.Naturali_Invoice, Sales.SellerID, Seller.SellerID, Seller.FirstName, Seller.LastName FROM ProdSold
                INNER JOIN Sales ON ProdSold.SaleID = Sales.Naturali_Invoice
                INNER JOIN Seller ON Sales.SellerID = Seller.SellerID
                WHERE ProdID = ${id} ORDER BY InvoiceDate DESC`;
               
    try{
        mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en prodSold.get /:id')
                res.status(200).json({});
            } else {

                console.log('data ok')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});



module.exports = prodSoldRouter;