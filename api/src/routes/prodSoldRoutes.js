const express = require('express')
const prodSoldRouter = express.Router()
const mysqlConnection = require('../db')
const historyPrice = require('../Controllers/historyPrice')


prodSoldRouter.get('/:id', async function(req, res){
    
    const {id} = req.params

    query_ =   `SELECT ProdSold.*, Naturali_ProdName AS ProductName, 
                  Dimension.Type,
                  Dimension.Size,
                  Dimension.Finish,
                  Dimension.Material,
                  Dimension.Thickness FROM Products
                  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                  INNER JOIN ProdSold ON ProdSold.ProdID = Products.ProdID
                  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                  WHERE SaleID = ${id} 
                  ORDER BY ProdNames.Naturali_ProdName ASC`;

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

prodSoldRouter.get('/historyprice/:id', async function(req, res){
    
    const {id} = req.params

    query_ =   `SELECT ProdSold.SalePrice, Sales.InvoiceDate, Sales.Naturali_Invoice, Sales.SellerID, Seller.SellerID, Seller.  FirstName, Seller.LastName FROM ProdSold
                INNER JOIN Sales ON ProdSold.SaleID = Sales.Naturali_Invoice
                INNER JOIN Seller ON Sales.SellerID = Seller.SellerID
                WHERE ProdID = ${id} `;
               
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