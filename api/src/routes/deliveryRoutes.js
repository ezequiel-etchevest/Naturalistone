const express = require('express');
const { generateDeliveryID } = require('../Controllers/deliveryController');
const deliveryRouter = express.Router()
const mysqlConnection = require('../db')


deliveryRouter.get('/:id', async function(req, res){
 
  const { id } = req.params
  
  query_ = `SELECT * FROM Deliveries WHERE SaleID = ${id}`;
  try{
       mysqlConnection.query(query_, function(error, results, fields){
          if(!results.length) {
              console.log(`Error al obtener data in get.Deliveries/:${id}!`)
              res.status(200).json([]);
          } else {
              console.log('Data OK')
              res.status(200).json(results);
          }
      });
  } catch(error){
      res.status(409).send(error);
  }
});
deliveryRouter.get('/id/:id', async function(req, res){
 
  const { id } = req.params
  
  query_ = `SELECT Deliveries_Products.*, Products.ProdID, Products.ProdNameID, 
  ProdNames.Naturali_ProdName as ProdName,
  Deliveries.SaleID, 
  Deliveries.Delivery_Date,        
  Dimension.Type,
  Dimension.Size,
  Dimension.Finish,
  Dimension.Thickness, 
  ProdSold.* FROM NaturaliStone.Deliveries_Products
  INNER JOIN Products ON Products.ProdID = Deliveries_Products.ProdID
  INNER JOIN Dimension ON Dimension.DimensionID = Products.DimensionID
  INNER JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
  INNER JOIN Deliveries ON Deliveries.DeliveryNumber = Deliveries_Products.DeliveryNumber
  INNER JOIN ProdSold ON ProdSold.ProdID = Products.ProdID
  WHERE Deliveries_Products.DeliveryNumber = ${id}`;
  
  try{
       mysqlConnection.query(query_, function(error, results, fields){
          if(!results.length) {
              console.log(`Error al obtener data in get.Deliveries/id/:${id}!`)
              res.status(200).json([]);
          } else {
              console.log('Data OK')
              res.status(200).json(results);
          }
      });
  } catch(error){
      res.status(409).send(error);
  }
});

deliveryRouter.post('/:id', async function(req, res){
  
  const { id } = req.params
  const  quantities  = req.body
  const deliveryID = await generateDeliveryID();
      
  query_ = `INSERT INTO Deliveries (DeliveryNumber, SaleID) VALUES (${deliveryID}, ${id});`
       
  try{
    mysqlConnection.query(query_, function(error, results, fields){
     if(error) throw error;  
     if(results.length === 0) {
           console.log('Query1 Error at Post /delivery/:id!')
           res.status(200).json(error);
      }
      })
  } catch(error){
        res.status(409).send(error);
  }

  quantities.forEach(element => {
    query_2 = `INSERT INTO Deliveries_Products (DeliveryNumber, ProdID, Quantity) VALUES (${deliveryID}, ${element.prodID}, ${element.quantity});`

    try{
      mysqlConnection.query(query_2, function(error2, results2, fields){
        if(error2) throw error2;  
        if(results2.length === 0) {
          console.log('Query2 Error at Post /delivery/:id!')
          res.status(200).json(error2);
        }
      })} catch(error2){
            res.status(409).send(error2);
      }
    })
    res.status(200).send({msg:'Delivery inserted correctly', deliveryID: deliveryID})
  })
      


module.exports = deliveryRouter
