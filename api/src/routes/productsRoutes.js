const express = require('express')
const productsRouter = express.Router()
const mysqlConnection = require('../db')
const filterProducts = require('../Controllers/productFilters')
const { getUniqueFinishes, findMaxMinPrice, getUniqueSizes, thicknessValues } = require('../Controllers/productValues')

productsRouter.get('/', async function(req, res){

    // query_ =    `SELECT ProdNames.*, Inventory.* FROM ProdNames 
    //             LEFT JOIN Inventory ON ProdNames.ProdNameID = Inventory.ProdID ORDER BY ProdNames.Naturali_ProdName ASC`;   
    
    query_ = `SELECT    
                    ProdNames.Naturali_ProdName AS ProductName,
                    Dimension.Type,
                    Dimension.Size,
                    Dimension.Thickness,
                    Dimension.Finish,
                    Products.SalePrice AS Price,
                    Products.ProdID,
                    Products.Discontinued_Flag,
                    Inventory.*
                  FROM Products
                  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                  INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID`
    try{
        mysqlConnection.query(query_, function(error, results, fields){   

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en productRoutes.get /:id')
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

    query_ =    `SELECT
                  ProdNames.Naturali_ProdName AS ProductName,
                  Dimension.Type,
                  Dimension.Size,
                  Dimension.Finish,
                  Dimension.Thickness,
                  Products.SalePrice AS Price,
                  Products.ProdID,
                  Products.Notes,
                  Inventory.*
                FROM Products
                INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID WHERE Products.ProdID = ${id}  
                ORDER BY ProdNames.Naturali_ProdName ASC`;
              
    try{
        mysqlConnection.query(query_, function(error, results, fields){   

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en productsRoutes.get /:id')
                res.status(200).json({});
            } else {
                console.log('Data OK')
                res.status(200).json(results[0]);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

productsRouter.get('/filtered', async function(req, res){

    const { type, size, thickness, price1, price2 } = req.query

    query_ = `SELECT    
                    ProdNames.Naturali_ProdName AS ProductName,
                    Dimension.Type,
                    Dimension.Size,
                    Dimension.Thickness,
                    Products.SalePrice AS Price,
                    Products.ProdID,
                    Inventory.*
                  FROM Products
                  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                  INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID`
    try{
        mysqlConnection.query(query_, function(error, results, fields){   
            
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en productsRoutes.get /filtered')
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

productsRouter.patch('/notes/:id', async function(req, res){
    
    const {id} = req.params
    const input = req.body

    query_ = `UPDATE Products SET Notes = '${input.Notes}' WHERE ProdID =${id}`

    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('Failure updating Notes')
                res.status(200).json('');
            } else {
                console.log('Note OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

productsRouter.patch('/discontinued/:id', async function(req, res){
    
    const {id} = req.params
    const flag = req.body

    query_ = `UPDATE Products SET Discontinued_Flag = ${flag === true ? 'False' : 'True'} WHERE ProdID =${id}`

    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log(`Failure updating Discontinued on prod ${id}`)
                res.status(200).json('');
            } else {
                console.log('discontinued OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

productsRouter.get('/values', async function(req, res){

    // query_ =    `SELECT ProdNames.*, Inventory.* FROM ProdNames 
    //             LEFT JOIN Inventory ON ProdNames.ProdNameID = Inventory.ProdID ORDER BY ProdNames.Naturali_ProdName ASC`;   
    
    query_ = `SELECT    
                    ProdNames.Naturali_ProdName AS ProductName,
                    Dimension.Type,
                    Dimension.Size,
                    Dimension.Thickness,
                    Dimension.Finish,
                    Products.SalePrice AS Price,
                    Products.ProdID,
                    Products.Discontinued_Flag,
                    Inventory.*
                  FROM Products
                  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
                  INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID`
    try{
        mysqlConnection.query(query_, function(error, results, fields){   

            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en productRoutes.get /:id')
                res.status(200).json({});
            } else {
                let finishValues = getUniqueFinishes(results)
                let priceMaxmin = findMaxMinPrice(results)
                let sizes = getUniqueSizes(results)
                let thickness = thicknessValues(results)
                res.status(200).json({finishValues, priceMaxmin, sizes, thickness});
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});


module.exports = productsRouter;