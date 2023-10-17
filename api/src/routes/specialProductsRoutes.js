const express = require('express')
const specialProductsRouter = express.Router()
const mysqlConnection = require('../db');
const { year, month0, day0 } = require('../todayDate');


specialProductsRouter.get('/', async function(req, res){
    
  query_ = `SELECT * FROM SpecialProducts`
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

// specialProductsRouter.post('/:CustomerID', async function(req, res){
  
//   const InsertDate = `${year}-${month0}-${day0}`
//   const { CustomerID } = req.params
//   const  products  = req.body 
//   const { quantity, um, prodName, material, size, type, thickness, finish, price } = products

//   console.log(CustomerID)
//   console.log(products)
//   query_ = `INSERT INTO SpecialProducts(SaleID, ProdName, Type, Thickness, Size, Finish, Material, Quantity, SalePrice, Delivered, Status, InsertDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
//   const specialProductsValues = [4293, products.prodName, products.type, products.thickness, products.size, products.finish, products.material, products.quantity, products.price, 0, 'Pending', InsertDate]
  
//   try{
//       mysqlConnection.query(query_, specialProductsValues, async function(error, results, fields){   
//         if (error) {
//           console.log('Error in SpecialProducts.post api/sp-1prods/:sellerID: ' + error);
//           res.status(500).json('Failed to POST sp-1');
//           } else {
//             res.status(200).json({success: true, results: results}); 
//           }
//       });
//   } catch(error){
//       res.status(409).send({success: false, results: error});
//   }
// });

specialProductsRouter.post('/:SaleID', async function(req, res){
  const { SaleID } = req.params
  const products  = req.body 
  const InsertDate = `${year}-${month0}-${day0}`

try{

  products.forEach(product => {

    const query = ` INSERT INTO SpecialProducts(SaleID, ProdName, Type, Thickness, Size, Finish, Material, Quantity, SalePrice, Delivered, Status, InsertDate ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [ SaleID, product.prodName, product.type, product.thickness, product.size, product.finish, product.material, product.quantity, product.price, 0, 'Pending', InsertDate ];

    mysqlConnection.query(query, values, (error, results) => {
      if (error) {
        console.log('Error in SpecialProducts.post api/sp-1prods/:sellerID: ' + error);
        return res.status(500).json('Failed to POST sp-1');
        }
        console.log('insert successfully specialProducts')
        return res.status(200).json({success: true}); 
      })
    })
  } catch(error){
    res.status(409).send({success: false, results: error});
  }
});

module.exports = specialProductsRouter;