const express = require('express')
const productsRouter = express.Router()
const mysqlConnection = require('../db')
const filterProducts = require('../Controllers/productFilters')

productsRouter.get('/', async function(req, res){

    // query_ =    `SELECT ProdNames.*, Inventory.* FROM ProdNames 
    //             LEFT JOIN Inventory ON ProdNames.ProdNameID = Inventory.ProdID ORDER BY ProdNames.Naturali_ProdName ASC`;   
    
    query_ = `SELECT    
                    ProdNames.Naturali_ProdName AS ProductName,
                    Dimension.Type,
                    Dimension.Size,
                    Dimension.Thickness,
                    Products.SalePrice AS Price,
                    Inventory.CurrentlyAvailable AS Stock,
                    Inventory.NextArrival,
                    Inventory.PendingPayment
                  FROM Products
                  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                  INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID`
    try{
        mysqlConnection.query(query_, function(error, results, fields){   

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

productsRouter.get('/id/:id', async function(req, res){

    const {id} = req.params

    query_ =    `SELECT ProdNames.*, Inventory.* FROM ProdNames 
                LEFT JOIN Inventory ON ProdNames.ProdNameID = Inventory.ProdID WHERE ProdNameID = ${id}  ORDER BY ProdNames.Naturali_ProdName ASC`;

    try{
        mysqlConnection.query(query_, function(error, results, fields){   

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});


// productsRouter.get('/:name', async function(req, res){
    
//     const {name} = req.params
    
//     query_ =    `SELECT ProdNames.*, Inventory.* FROM ProdNames 
//                 LEFT JOIN Inventory ON ProdNames.ProdNameID = Inventory.ProdID WHERE Reference = ${name}`;

//     try{
//         mysqlConnection.query(query_, function(error, results, fields){   

//             if(error) throw error;
//             if(results.length == 0) {
//                 console.log('Error al obtener data!')
//                 res.status(200).json({});
//             } else {
//                 console.log('Data OK')
//                 res.status(200).json(results);
//             }
//         });
//     } catch(error){
//         res.status(409).send(error);
//     }
// });

productsRouter.get('/filtered', async function(req, res){
    
    const { type, size, thickness, price1, price2 } = req.query

    query_ = `SELECT    
                    ProdNames.Naturali_ProdName AS ProductName,
                    Dimension.Type,
                    Dimension.Size,
                    Dimension.Thickness,
                    Products.SalePrice AS Price,
                    Inventory.CurrentlyAvailable AS Stock,
                    Inventory.NextArrival,
                    Inventory.PendingPayment
                  FROM Products
                  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                  INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID`
    try{
        mysqlConnection.query(query_, function(error, results, fields){   
            
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                const filter = filterProducts(type, size, thickness, price1, price2, results)
                res.status(200).json(filter);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});
module.exports = productsRouter;