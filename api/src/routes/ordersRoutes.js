const express = require('express')
const ordersRouter = express.Router()
const mysqlConnection = require('../db')


ordersRouter.get('/', async function(req, res){

    query_ = `SELECT Orders.*, Factory.Factory_Name as FactoryName FROM Orders
    LEFT JOIN Factory ON  Factory.FactoryID = Orders.FactoryID`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error en ordersRoutes.get /')
                res.status(400).json(error);
            } else {
                console.log('Orders Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

ordersRouter.get('/:id', async function(req, res){

    const { id } = req.params
    
    query_ = `SELECT Orders.*, Factory.Factory_Name as FactoryName FROM Orders
    LEFT JOIN Factory ON  Factory.FactoryID = Orders.FactoryID WHERE OrderID = ${id} ORDER BY InvoiceDate `;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error en ordersRoutes.get /:id')
                res.status(400).json(error);
            } else {
                console.log('Orders Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

ordersRouter.get('/products/:id', async function(req, res){

    const { id } = req.params
    
    query_ = `SELECT ProdOrdered.*, Products.*, Dimension.*, ProdNames.Naturali_ProdName as ProductName FROM ProdOrdered
    INNER JOIN Products ON  ProdOrdered.ProdID = Products.ProdID 
    INNER JOIN ProdNames ON  ProdNames.ProdNameID = Products.ProdNameID
    INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
    WHERE OrderID = ${id} ORDER BY Quantity DESC`;
    
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error en ordersRoutes.get /products/:id')
                res.status(400).json(error);
            } else {
                console.log('Orders Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});


module.exports = ordersRouter;