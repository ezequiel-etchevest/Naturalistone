const express = require('express')
const specialProductsRouter = express.Router()
const mysqlConnection = require('../db');
const { year, month0, day0 } = require('../todayDate');


specialProductsRouter.get('/:id', async function(req, res){
  const {id} = req.params
  query_ = `SELECT * FROM SpecialProducts WHERE SaleID = ${id}`
  try{
      mysqlConnection.query(query_, function(error, results, fields){   
          if(error) throw error;
          if(results.length == 0) {
              console.log('Error en specialProducts.get /')
              res.status(200).json([]);
          } else {
              res.status(200).json(results);
             
          }
      });
  } catch(error){
      res.status(409).send(error);
  }
});

module.exports = specialProductsRouter;