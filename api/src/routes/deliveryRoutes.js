const express = require('express');
const {
  generateDeliveryID,
  paymentsValidation,
  getPayments,
  createDeliveriesProducts,
  createDelivery
} = require('../Controllers/deliveryController');
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
  
  query_=`SELECT Deliveries_Products.*, Products.ProdID, Products.ProdNameID, ProdNames.Naturali_ProdName as ProdName, ProdNames.Material, Deliveries.SaleID, 
  Deliveries.Delivery_Date,
  Dimension.Type,
  Dimension.Size,
  Dimension.Finish,
  Dimension.Thickness FROM NaturaliStone.Deliveries_Products 
  INNER JOIN Products ON Deliveries_Products.ProdID = Products.ProdID
  INNER JOIN Dimension ON Products.DimensionID = Dimension.DimensionID 
  INNER JOIN Deliveries ON Deliveries_Products.DeliveryNumber = Deliveries.DeliveryNumber 
  INNER JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID 
  WHERE Deliveries_Products.DeliveryNumber = ${id}`

  try{
       mysqlConnection.query(query_, function(error, results, fields){
          if(!results.length) {
              console.log(`Error al obtener data in get.Deliveries/id/${id}!`)
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

deliveryRouter.post('/:id', async function(req, res) {
  const { id } = req.params;

  const quantities = req.body;

  const deliveryID = await generateDeliveryID();

  try {
    mysqlConnection.beginTransaction();

    const payments = await getPayments(id);

    if (paymentsValidation(quantities, payments)) {
      await createDelivery(deliveryID, id);

      await Promise.all(
        quantities.map((element) => {
          return createDeliveriesProducts(deliveryID, element)
        })
      )
    }

    mysqlConnection.commit();

    return res.status(200).json({success: true, msg:"Create delivery successful"})
  } catch (error) {
    console.log("General error in post delivery")
    mysqlConnection.rollback();
    res.status(400).json({ success: false, msg:"General error in create delivery"})
    throw error
  }
})

// deliveryRouter.post('/:id', async function(req, res){
  
//   const { id } = req.params
//   const  quantities  = req.body
//   const deliveryID = await generateDeliveryID();
//     console.log("soy quantiy", quantities)
//   query_0 = `SELECT InvoiceID, SUM(Amount) as Payments, Sales.Value FROM Payments 
//               LEFT JOIN Sales ON Sales.Naturali_Invoice = Payments.InvoiceID 
//               WHERE InvoiceID = ${id} GROUP BY InvoiceID;`

//   try {
//     mysqlConnection.query(query_0, function(error, payments, fields) {
//       if (error) throw error;  
//       if (payments.length === 0) {
//         console.log('Query0 Error at Post /delivery/:id! payments related')
//         res.status(200).json({msg: `Not money enough`, error: error, val: false});
//       } else {
//         if (paymentsValidation(quantities, payments)) {
//           console.log("aqui entrraaaaaaaa")
//           try {
//             query_1 = `INSERT INTO Deliveries (DeliveryNumber, SaleID) VALUES (${deliveryID}, ${id});`
//             mysqlConnection.query(query_1, function(error, results, fields){
//               if(error) throw error;  
//               if(results.length === 0) {
//                 console.log('Query1 Error at Post /delivery/:id!')
//                 res.status(200).json(error);
//               } else {
//                 console.log("aqui tambien")
//                 quantities.forEach(element => {

//                   query_2 = `INSERT INTO Deliveries_Products (DeliveryNumber, ProdID, Quantity) VALUES (${deliveryID}, ${element.prodID}, ${element.quantity});`
//                   try {
//                     mysqlConnection.query(query_2, function(error2, results2, fields){
//                       if(error2) throw error2;  
//                       if(results2.length === 0) {
//                         console.log('Query2 Error at Post /delivery/:id!')
//                         res.status(200).json(error2);
//                       }
//                     });
//                   } catch(error2) {
//                     res.status(409).send(error2);
//                   }
//                 });
//                 res.status(200).send({deliveryID: deliveryID, val:true})
//               }
//             });
//           } catch(error) {
//             res.status(409).send(error);
//           }
//         } else {
//           res.status(200).send({deliveryID: 'error msg', val:false})
//         }
//       }
//     });
//   } catch(error) {
//     res.status(409).send(error);
//   }
// });

      


module.exports = deliveryRouter
