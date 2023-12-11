const express = require('express')
const prodSoldRouter = express.Router()
const mysqlConnection = require('../db')
const historyPrice = require('../Controllers/historyPrice')

const getProductsSoldInProds = async (id) => {
    const query_ = `SELECT 
                    ProdSold.*,
                    ProdNames.Naturali_ProdName AS ProductName,
                    Dimension.Type,
                    Dimension.Finish,
                    Dimension.Thickness,
                    Dimension.Size
                    FROM Sales
                    LEFT JOIN ProdSold ON Sales.Naturali_Invoice = ProdSold.SaleID
                    LEFT JOIN Products ON ProdSold.ProdID = Products.ProdID
                    LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
                    LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
                    WHERE Sales.Naturali_Invoice = ${id} AND ProdSold.Status != "Canceled" AND ProdSold.ProdID IS NOT NULL`

  return new Promise((resolve, reject) => {
    mysqlConnection.query(query_, function(err, results) {
      if (err) {
        return reject('Error in get products in prodSold')
      }
      return resolve(results)
    })
  })
}

const getProdSoldInSpecialProducts = async (id) => {
  const query_ = `SELECT 
                  SpecialProducts.Type,
                  SpecialProducts.Thickness,
                  SpecialProducts.Size,
                  SpecialProducts.Finish,
                  SpecialProducts.Material,
                  SpecialProducts.Quantity,
                  SpecialProducts.SalePrice,
                  SpecialProducts.ProdName AS ProductName,
                  SpecialProducts.Delivered
                  FROM SpecialProducts
                  WHERE SaleID = ${id}`

  return new Promise((resolve, reject) => {
    mysqlConnection.query(query_, function(err, results) {
      if (err) {
        return reject('Error in get specialproducts in prodsold')
      }
      return resolve(results)
    })
  })
}

prodSoldRouter.get('/:id', async function(req, res){
    
  const {id} = req.params

  try {
    const products = await getProductsSoldInProds(id);
    const specialProducts = await getProdSoldInSpecialProducts(id);

    const prodSolds = specialProducts.concat(products)

  prodSolds.sort((a, b) => {
    
    if(a.ProductName === 'Shipping- Delivery') {
      return 1;
    }
    if(b.ProductName === 'Shipping- Delivery') {
      return -1
    };
    return a.ProductName - b.ProductName
  })

    return res.status(200).json(prodSolds)
  } catch (error) {
    console.log("error", error)
    return res.status(400).json({ success: false, msg: "General error in get prodsold"})
  }

});

prodSoldRouter.get('/historyprice/:id', async function(req, res){
    
    const {id} = req.params

    query_ =   `SELECT ProdSold.SalePrice, Sales.InvoiceDate, Sales.Naturali_Invoice, Sales.SellerID, Seller.SellerID, Seller.FirstName, Seller.LastName FROM ProdSold
                INNER JOIN Sales ON ProdSold.SaleID = Sales.Naturali_Invoice
                INNER JOIN Seller ON Sales.SellerID = Seller.SellerID
                WHERE ProdID = ${id} ORDER BY InvoiceDate DESC`;
               
    try{
        mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en prodSold.get /:id')
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