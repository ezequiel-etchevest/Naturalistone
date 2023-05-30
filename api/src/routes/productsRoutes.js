const express = require('express')
const productsRouter = express.Router()
const mysqlConnection = require('../db')
const filterProducts = require('../Controllers/productFiltersController')
const { prodValues, findMaxMinPrice } = require('../Controllers/productValues')
const objetosFiltrados = require('../Controllers/inventoryController')
const {getImage} = require('../Controllers/oneDriveProductImages')

productsRouter.get('/', async function(req, res){
    
    query_ = `SELECT    
                    ProdNames.Naturali_ProdName AS ProductName,
                    ProdNames.Material,
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
                console.log('Error en productRoutes.get /')
                res.status(200).json({});
            } else {
                let instock = objetosFiltrados(results)
                res.status(200).json(instock);
               
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
                  ProdNames.Material,
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
    let { finish, size, thickness, material, search, price1, price2 } = req.query;
    const min = price1 === '' ? 0 : price1
    const max = price2 === '' ? 99999999 : price2

    const query = `
    SELECT    
      ProdNames.Naturali_ProdName AS ProductName,
      ProdNames.Material,
      Dimension.Type,
      Dimension.Size,
      Dimension.Finish,
      Dimension.Thickness,
      Products.SalePrice AS Price,
      Products.ProdID,
      Inventory.*
    FROM Products
    INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
    INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
    INNER JOIN Inventory ON Inventory.ProdID = Products.ProdID 
    WHERE (Inventory.InStock_Available > 0 OR Inventory.Incoming_Available > 0)
    
    ${
      material.length ? (`AND (ProdNames.Material = "${material}")`) : (``)
    }
    ${
      finish.length ? (`AND (Dimension.Finish = "${finish}")`) : (``)
    }
    ${
      size.length ? (` AND (Dimension.Size = "${size}")`) : (``)
    }
    ${
      thickness.length ? (`AND (Dimension.Thickness = "${thickness}")`) : (``)
    }
    ${
      search.length ? (
        `AND (LOWER(ProdNames.Naturali_ProdName) LIKE LOWER('%${search}%'))`
      ) : (``)
    }
    ${
      (price1 === '' && price2 === '') ? (``) : (
        `AND (
          (Products.SalePrice IS NULL) OR
          (Products.SalePrice >= ${min} AND Products.SalePrice <= ${max})
        )`
      )
    }
    ORDER BY ProdNames.Naturali_ProdName ASC
    `;
  
    try {
      mysqlConnection.query(query, function(error, results, fields) {
        if (error) throw error;
        if (results.length == 0) {

          let price = findMaxMinPrice(results);
          let filteredValues = prodValues(results, search, price)
          console.log('Error en productsRoutes.get /filtered');
          res.status(200).json({results, errorSearch: 'No products found', filteredValues});

        } else {
          console.log(results.length)
          let price = findMaxMinPrice(results);
          let filteredValues = prodValues(results, search, price)
          let errorSearch = {}

          res.status(200).json({results, errorSearch, filteredValues});

        }
      });            
    } catch(error) {
      res.status(409).send(error);
    }
  });
  

productsRouter.patch('/discontinued/:id', async function(req, res){
    
    const {id} = req.params
    const {flag} = req.body
    const val = flag === true ? 'False' : 'True'
    console.log(val)
    query_ = `UPDATE Products SET Discontinued_Flag = "${val}" WHERE ProdID =${id}`

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



module.exports = productsRouter;