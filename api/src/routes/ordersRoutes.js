const express = require('express')
const ordersRouter = express.Router()
const mysqlConnection = require('../db')


ordersRouter.get('/', async function(req, res){

    query_ = `SELECT Orders.*, Factory.Factory_Name as FactoryName FROM Orders
    LEFT JOIN Factory ON  Factory.FactoryID = Orders.FactoryID ORDER BY InvoiceDate DESC`;
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
    LEFT JOIN Factory ON  Factory.FactoryID = Orders.FactoryID WHERE OrderID = ${id} ORDER BY InvoiceDate DESC`;
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
    
    query_ = `SELECT ProdOrdered.*, Products.*, Dimension.*,ProdNames.Material, ProdNames.Naturali_ProdName as ProductName, ProdNames.Factory_ProdName as FactoryProductName FROM ProdOrdered
    INNER JOIN Products ON  ProdOrdered.ProdID = Products.ProdID 
    INNER JOIN ProdNames ON  ProdNames.ProdNameID = Products.ProdNameID
    INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
    WHERE OrderID = ${id} AND Status != 'Canceled'
    ORDER BY Quantity DESC`;
    
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('No products in this order')
                res.status(200).json([]);
            } else {
                console.log('Orders Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

ordersRouter.patch('/cancelorder/:id', async function(req, res){
    
    const {id} = req.params

    query_ = `UPDATE Orders SET Status = 'Canceled' WHERE OrderID =${id}`

    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('Failure updating Status Column')
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


module.exports = ordersRouter;