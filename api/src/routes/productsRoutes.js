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
    const { finish, size, thickness, material, search, price1, price2 } = req.query;
  
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
      ORDER BY ProdNames.Naturali_ProdName ASC
    `;
  
    try {
      mysqlConnection.query(query, function(error, results, fields) {
        if (error) throw error;
  
        if (results.length == 0) {
          console.log('Error en productsRoutes.get /filtered');
          res.status(200).json({});
        } else {
          let instock = objetosFiltrados(results);
          const filter = filterProducts(finish, size, thickness, material, search, price1, price2, instock);
  
          let price = findMaxMinPrice(instock);
          let filteredValues = prodValues(instock, search, price)
          res.status(200).json({filter, filteredValues});
          // Aquí llamamos a la función `getImage` para obtener los datos de las imágenes
        //   getImage(filter.filteredProds)
        //     .then(updatedProds => {
        //       // Aquí actualizamos la propiedad `img` en cada objeto del `filter`
        //       const updatedFilter = {
        //         ...filter,
        //         filteredProds: updatedProds.map((obj, index) => ({
        //           ...obj,
        //           img: updatedProds[index].img
        //         }))
        //       };
  
        //       res.status(200).json({
        //         filter: updatedFilter,
        //         filteredValues: prodValues(updatedFilter.filteredProds, search, price)
        //       });
        //     })
        //     .catch(error => {
        //       console.log('Error al obtener las imágenes', error);
        //       res.status(500).send(error);
        //     });
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