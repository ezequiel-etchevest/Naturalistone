const express = require('express')
const prodSoldRouter = express.Router()
const mysqlConnection = require('../db')


prodSoldRouter.get('/:id', async function(req, res){
    
    const {id} = req.params

    query_ =     `SELECT ProdSold.*, Naturali_ProdName AS ProductName, Inventory.CurrentlyAvailable AS Stock,
                Inventory.NextArrival FROM Products
                INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                INNER JOIN ProdSold ON ProdSold.ProdID = Products.ProdID
                INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID 
                WHERE SaleID = ${id} `;
                

    try{
        mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
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