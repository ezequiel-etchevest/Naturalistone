const express = require('express')
const salesRouter = express.Router()
const mysqlConnection = require('../db')
const  getLimitDate = require('../Controllers/LastWeek');
const invoicesPayments = require('../Controllers/invoicesPayments')
const  { getLimitDateMonth, getCurrentMonth } = require('../Controllers/LastMonth')
const uniqueFormatNames = require('../Controllers/quotesValues')
const invoicesFilters = require('../Controllers/invoicesFilters')

salesRouter.get('/:id', async function(req, res){
    
  const {id} = req.params
  const { name, time, seller, number } = req.query

  query_0 = `SELECT Secction7Flag From Logins Where SellerID = ${id}` 
  try{
    mysqlConnection.query(query_0, function(error, results, fields){

      if(error) throw error;
      if(results.length === 0) {
          console.log('Error en salesRoutes/:id Logins')
          res.status(200).json({});
      } else {
      if(time === 'All' || time === ''){
      if(results[0].Secction7Flag === 1){
         query_ =    `SELECT Sales.*, Projects.*, Customers.*, Payments.idPayments, Seller.FirstName, Seller.LastName, Seller.SellerReference, Seller.SellerID,
         GROUP_CONCAT(
         CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
         LEFT JOIN Projects ON Sales.ProjectID = Projects.idProjects
         LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
         LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID 
         LEFT JOIN Seller ON Sales.SellerID = Seller.SellerID 
         GROUP BY Sales.Naturali_Invoice
         ORDER BY Sales.InvoiceDate DESC` 
      } else {
        query_ =    `SELECT Sales.*, Projects.*, Customers.*, Payments.idPayments, Seller.FirstName, Seller.LastName, Seller.SellerReference, Seller.SellerID,
        GROUP_CONCAT(
        CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
        LEFT JOIN Projects ON Sales.ProjectID = Projects.idProjects
        LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
        LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID
        LEFT JOIN Seller ON Sales.SellerID = Seller.SellerID  
        WHERE Seller.SellerID = ${id}
        GROUP BY Sales.Naturali_Invoice
        ORDER BY Sales.InvoiceDate DESC`;
      }
    } else {
      const today = new Date().toISOString().split('T')[0]
      const limitDateWeek = getLimitDate()
      const limitDateMonth = getLimitDateMonth()

      if(results[0].Secction7Flag === 1){
        query_ = `SELECT Sales.*, Projects.*, Customers.*, Payments.idPayments, Seller.FirstName, Seller.LastName, Seller.SellerReference, Seller.SellerID,
        GROUP_CONCAT(
        CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
        LEFT JOIN Projects ON Sales.ProjectID = Projects.idProjects
        LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
        LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID 
        LEFT JOIN Seller ON Sales.SellerID = Seller.SellerID 
        WHERE InvoiceDate BETWEEN "${time === 'LastWeek' ? limitDateWeek : limitDateMonth}" AND "${today}" 
        GROUP BY Sales.Naturali_Invoice
        ORDER BY Sales.InvoiceDate DESC`  
      } else {
        query_ = `SELECT Sales.*, Projects.*, Customers.*, Payments.idPayments, Seller.FirstName, Seller.LastName, Seller.SellerReference, Seller.SellerID,
        GROUP_CONCAT(
        CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
        LEFT JOIN Projects ON Sales.ProjectID = Projects.idProjects
        LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
        LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID
        LEFT JOIN Seller ON Sales.SellerID = Seller.SellerID
        WHERE InvoiceDate BETWEEN "${time === 'LastWeek' ? limitDateWeek : limitDateMonth}" AND "${today}" AND Seller.SellerID = ${id}
        GROUP BY Sales.Naturali_Invoice
        ORDER BY Sales.InvoiceDate DESC`
      }
    }
  try{
    mysqlConnection.query(query_, function(error, Invoices, fields){
     if(error) throw error;
     if(Invoices.length == 0) {
         console.log('Error en salesRoutes.get /:id')
         res.status(200).json({});
     }else{
        let invoicesFiltered = invoicesFilters(Invoices, name, number, seller)
        let result = invoicesPayments(invoicesFiltered)
        res.status(200).json(result);
     }})}catch(error){
         res.status(409).send(error);
        }
    }})
  } catch(error){
      res.status(409).send(error);
  }
})
        
salesRouter.get('/invoice/:id', async function(req, res){
    const { id } = req.params

//Replased Seller.* for , Seller.FirstName, Seller.LastName, Seller.SellerID//

    query_ =    `SELECT Sales.*, Projects.*, Customers.*, Seller.FirstName, Seller.LastName, Seller.SellerReference, Seller.SellerID FROM Sales
                LEFT JOIN Seller ON Sales.SellerID = Seller.SellerID 
                LEFT JOIN Projects ON Sales.ProjectID = Projects.idProjects
                LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
                WHERE Naturali_Invoice = ${id}`;

    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('No invoices linked')
                res.status(200).json({ estado: false, data: []});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

salesRouter.get('/currentMonth/:id', async function(req, res){
    
    const {id} = req.params
    const today = new Date().toISOString().split('T')[0]
    const currentMonth = getCurrentMonth()

    query_0 = `SELECT Secction7Flag From Logins Where SellerID = ${id}` 
    try{
      mysqlConnection.query(query_0, function(error, results, fields){
      
        if(error) throw error;
        if(results.length === 0) {
            console.log('Error en salesRoutes/:id Logins')
            res.status(200).json({});
          } else {
        if(results[0].Secction7Flag === 1){
        
          query_ = `SELECT ROUND(SUM(Value), 2) As TotalValue FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
          query_2 = `SELECT count(*) As InvoicesNumber FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
          query_3 = `SELECT ROUND(AVG(Value), 2) As AvgValue FROM Sales WHERE InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
        
        } else {
          query_ = `SELECT ROUND(SUM(Value), 2) As TotalValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
          query_2 = `SELECT count(*) As InvoicesNumber FROM Sales where SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
          query_3 = `SELECT ROUND(AVG(Value), 2) As AvgValue FROM Sales WHERE SellerID = ${id} AND InvoiceDate BETWEEN "${currentMonth}" AND "${today}"`
        }

        try{
            mysqlConnection.query(query_, function(error1, results, fields){
               if(error1) throw error1;
               if(results.length == 0) {
              
                   res.status(400).send('Error obtaining data in CurrentMonth Value!', error1);
                } else {
                   try{
                       mysqlConnection.query(query_2, function(error2, results2, fields){
                           if(error2) throw error2;
                           if(results2.length == 0) {
                          
                               res.status(400).json('Error obtaining data in Invoice number Count!', error2);
                            } else {
                                try{
                                    mysqlConnection.query(query_3, function(error3, results3, fields){
                                        if(error3) throw error3;
                                        if(results3.length == 0) {
                                        
                                            res.status(400).json('Error obtaining data in Average Value!');
                                        }else {
                                            console.log('Data CurrentMonth Value OK')
                                            console.log('Data Invoice number Count OK')
                                            console.log('Data Average Value OK')
                                        
                                            if(results[0].TotalValue === null) results[0].TotalValue = 0;
                                            if(results2[0].InvoicesNumber === null) results2[0].InvoicesNumber = 0;
                                            if(results3[0].AvgValue === null) results3[0].AvgValue = 0;
                                            const totalResults = {
                                                TotalValue: results[0].TotalValue, 
                                                InvoicesNumber: results2[0].InvoicesNumber,
                                                AverageAmount: results3[0].AvgValue
                                             }
                                            res.status(200).json(totalResults);
                                        }
                                    })
                                    } catch(error3) {
                                        res.status(400).send(error3)
                                    }  
                            } 
                        })
                    } catch(error2){
                        res.status(409).send(error2);
                    }
                }
            })
        } catch(error1){
            res.status(409).send(error1);
        }}
      })
    } catch(error){
          res.status(409).send(error);
    }   
});

salesRouter.patch('/quote/:id', async function(req, res){
    
    const {id} = req.params

    query_ = `UPDATE Sales SET Payment_Stamp = true WHERE Naturali_Invoice =${id}`

    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('Failure updating Stamped Column')
                res.status(200).json('');
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

salesRouter.patch('/cancelquote/:id', async function(req, res){
    
    const {id} = req.params

    query_ = `UPDATE Sales SET Status = 'Canceled' WHERE Naturali_Invoice =${id}`

    try{
       mysqlConnection.query(query_, function(error, results, fields){

            if(error) throw error;
            if(results.length == 0) {
                console.log('Failure updating Stamped Column')
                res.status(200).json('');
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

salesRouter.get('/values/seller', async function(req, res){

    query_ =   `SELECT Sales.*, Projects.*, Customers.*, Payments.idPayments, Seller.FirstName, Seller.LastName, Seller.SellerID, Seller.SellerReference,
                GROUP_CONCAT(
                CONCAT(Payments.idPayments,';',Payments.Amount,';',Payments.Date))AS Payments FROM Sales 
                LEFT JOIN Projects ON Sales.ProjectID = Projects.idProjects
                LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
                LEFT JOIN Payments ON Sales.Naturali_Invoice = Payments.InvoiceID 
                LEFT JOIN Seller ON Sales.SellerID = Seller.SellerID
                WHERE Sales.SellerID IS NOT NULL
                GROUP BY Sales.Naturali_Invoice
                ORDER BY Sales.InvoiceDate DESC`

    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en salesRoutes.get /values')
                res.status(200).json({ estado: false, data: {}});
            } else {
                let values = uniqueFormatNames(results)
                res.status(200).json(values);
            }
            });
    } catch(error){
        res.status(409).send(error);
    }
});


// Sin Variable beginTransaction

// salesRouter.post('/create-quote/:sellerID', async function(req, res) {
//   const { sellerID } = req.params
//   const { customer, project, products, variables } = req.body

//   const Value = products.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
//   const ProjectID = project.idProjects
//   const date = new Date().toLocaleDateString("en-US")
//   const InsertDate = `${date.split('/')[2]}-${date.split('/')[0]}-${date.split('/')[1]}`

//   const EstDelivery_Date = variables.estDelivDate

//   try {
//     // Obtener el último Naturali_Invoice de la tabla Sales
//     const query_0 = `SELECT Naturali_Invoice FROM NaturaliStone.Sales ORDER BY Naturali_Invoice DESC LIMIT 1;`
//     const quotesIDs = await new Promise((resolve, reject) => {
//       mysqlConnection.query(query_0, function(error, quotesIDs, fields) {
//         if (error) {
//           console.log('Error in salesRoutes.get /create-quote/:sellerID: ' + error)
//           reject(error)
//         } else {
//           console.log('QuotesIds retrieved successfully')
//           resolve(quotesIDs)
//         }
//       })
//     })

//     const ids = quotesIDs.map(q => Number(q.Naturali_Invoice))
//     const Naturali_Invoice = Math.max(...ids) + 1

//     const query_ = `INSERT INTO Sales (Naturali_Invoice, Value, ProjectID, InvoiceDate, EstDelivery_Date, SellerID, ShippingMethod, PaymentTerms, P_O_No) VALUES ("${Naturali_Invoice}", "${Value}", "${ProjectID}", "${InsertDate}", "${EstDelivery_Date}", "${sellerID}", "${variables.shipVia}", "${variables.paymentTerms}", "${variables.method}")`
//     await new Promise((resolve, reject) => {
//       mysqlConnection.query(query_, function(error, results, fields) {
//         if (error) {
//           console.log('Error in salesRoutes.get /create-quote/:sellerID: ' + error)
//           reject(error)
//         } else {
//           console.log('Quote created successfully')
//           resolve()
//         }
//       })
//     })

//     const insertProductsPromises = products.map((product) => {
//       const { prodID, quantity, price } = product;
//       const query = `INSERT INTO ProdSold (SaleID, ProdID, Quantity, SalePrice) VALUES ("${Naturali_Invoice}", "${prodID}", "${quantity}", "${price}")`;
//       return new Promise((resolve, reject) => {
//         mysqlConnection.query(query, function(error, results, fields) {
//           if (error) {
//             console.log('Error in salesRoutes.get Insert INTO ProdSold ' + error)
//             reject(error)
//           } else {
//             console.log('Product inserted successfully');
//             resolve()
//           }
//         });
//       })
//     })

//     await Promise.all(insertProductsPromises)

//     res.status(200).json({ Naturali_Invoice: Naturali_Invoice, InsertDate: InsertDate })
//   } catch (error) {
//     res.status(500).json('Failed to create quote')
//   }
// })



// Variable solo insert en Sales, sin la query de los productos

// salesRouter.post('/create-quote/:sellerID', async function(req, res){
//   const { sellerID } = req.params
//   const { customer, project, variables, products } = req.body

//   const parsedProducts = Object.entries(products)
//                       .flat()
//                       .filter((element) => typeof element === 'object')
//                       .map((product, index) => ({ variableName: `${index + 1}`, ...product }))
                      
//   const Value = parsedProducts.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)

//   const ProjectID = project.idProjects
//   const date = new Date().toLocaleDateString("en-US")
//   // const InsertDate = `${date.split('/')[2]}-${date.split('/')[0]}-${date.split('/')[1]}`
//   const InsertDate = `2019-02-20`

//   const EstDelivery_Date = variables.estDelivDate

//   // Obtener el último Naturali_Invoice de la tabla Sales
//   const query_0 = `SELECT Naturali_Invoice FROM NaturaliStone.Sales ORDER BY Naturali_Invoice DESC LIMIT 1;`

//   try {
//     mysqlConnection.query(query_0, function(error, quotesIDs, fields) {
//       if (error) {
//         console.log('Error in salesRoutes.get /create-quote/:sellerID: ' + error)
//         res.status(500).json("Can't obtain Naturali_Invoice")
//       } else {
//         console.log('QuotesIds retrieved successfully')

//         const ids = quotesIDs.map(q => Number(q.Naturali_Invoice)) // crea un quoteID agregando +1 al ultimo registrado en la db
//         const Naturali_Invoice = Math.max(...ids) + 1

//         // Hace el posteo en la tabla de Sales con los valores que llegaron por body y el id del quote creado.
//         const query_ = `INSERT INTO Sales (Naturali_Invoice, Value, ProjectID, InvoiceDate, EstDelivery_Date, SellerID, ShippingMethod, PaymentTerms, P_O_No) VALUES ("${Naturali_Invoice}", "${Value}", "${ProjectID}", "${InsertDate}", "${EstDelivery_Date}", "${sellerID}", "${variables.shipVia}", "${variables.paymentTerms}", "${variables.method}")`
//         try {
//           mysqlConnection.query(query_, function(error, results, fields) {
//             if (error) {
//               console.log('Error in salesRoutes.get /create-quote/:sellerID: ' + error)
//               res.status(500).json('Failed to create quote')
//             } else {
//               console.log(`Quote created successfully ${Naturali_Invoice}`)
//               res.status(200).json({ Naturali_Invoice: Naturali_Invoice, InsertDate: InsertDate, parsedProducts:  parsedProducts })
//             }
//           })
//         } catch (error) {
//           res.status(409).send(error)
//         }
//       }
//     })
//   } catch (error) {
//     res.status(409).send(error)
//   }
// })

// Variable insert solo producto sin crear nada en Sales.

// salesRouter.post('/create-quote/:sellerID', async function(req, res){
    
//   const { products } = req.body

//   let query = `INSERT INTO ProdSold (SaleID, ProdID, Quantity, SalePrice) VALUES `;
//   const values = [];

//   try{
// console.log(products)
//   for (const product of products) {
//     const { prodID, quantity, price } = product;
//     values.push(`("100003", "${prodID}", "${quantity}", "${price}")`);
//   }

//   query += values.join(", ");

//   mysqlConnection.query(query, function(error, results, fields) {

//     if (error) {
//       console.log('Error in salesRoutes.get Insert INTO ProdSold ' + error)
//       res.status(500).json('Failed to insert ProdSold')
//     } else {
//       console.log('Products inserted successfully');
//       res.status(200).json('Products inserted successfully');
//     }
//     });
//   } catch(error){
//       res.status(409).send(error);
//   }
// });


// Con variable BeginTransaction

salesRouter.post('/create-quote/:sellerID', async function(req, res) {
  const { sellerID } = req.params;
  const { customer, project, products, variables } = req.body;

  const parsedProducts = Object.entries(products)
                      .flat()
                      .filter((element) => typeof element === 'object')
                      .map((product, index) => ({ variableName: `${index + 1}`, ...product }))

  const Value = parsedProducts.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  const ProjectID = project.idProjects;
  const date = new Date().toLocaleDateString("en-US");
  const InsertDate = `${date.split('/')[2]}-${date.split('/')[0]}-${date.split('/')[1]}`;
  const EstDelivery_Date = variables.estDelivDate;

  // Obtener el último Naturali_Invoice de la tabla Sales
  const query_0 = `SELECT Naturali_Invoice FROM NaturaliStone.Sales ORDER BY Naturali_Invoice DESC LIMIT 1;`;

  try {
    mysqlConnection.beginTransaction(function(err) {
      if (err) {
        console.log('Error in salesRoutes.post /create-quote/:sellerID: ' + err);
        res.status(500).json("Failed to create quote");
        return;
      }

      mysqlConnection.query(query_0, async function(error, quotesIDs, fields) {
        if (error) {
          console.log('Error in salesRoutes.post /create-quote/:sellerID: ' + error);
          res.status(500).json("Can't obtain Naturali_Invoice");
          return mysqlConnection.rollback(function() {
            throw error;
          });
        }

        console.log('QuotesIds retrieved successfully');

        const ids = quotesIDs.map(q => Number(q.Naturali_Invoice));
        const Naturali_Invoice = Math.max(...ids) + 1;

        const query_ = `INSERT INTO Sales (Naturali_Invoice, Value, ProjectID, InvoiceDate, EstDelivery_Date, SellerID, ShippingMethod, PaymentTerms, P_O_No) VALUES ("${Naturali_Invoice}", "${Value}", "${ProjectID}", "${InsertDate}", "${EstDelivery_Date}", "${sellerID}", "${variables.shipVia}", "${variables.paymentTerms}", "${variables.method}")`;

        mysqlConnection.query(query_, function(error, results, fields) {
          if (error) {
            console.log('Error in salesRoutes.post /create-quote/:sellerID: ' + error);
            res.status(500).json('Failed to create quote');
            return mysqlConnection.rollback(function() {
              throw error;
            });
          }

          console.log('Quote created successfully');

          let query = `INSERT INTO NaturaliStone.ProdSold (SaleID, ProdID, Quantity, SalePrice) VALUES `;
          const values = [];

          for (const product of parsedProducts) {
            const { prodID, quantity, price } = product;
            values.push(`("${Naturali_Invoice}", "${prodID}", "${quantity}", "${price}")`);
          }

          query += values.join(", ");

          mysqlConnection.query(query, function(error, results, fields) {
            if (error) {
              console.log('Error in salesRoutes.post /create-quote/:sellerID: ' + error);
              res.status(500).json('Failed to insert ProdSold');
              return mysqlConnection.rollback(function() {
                throw error;
              });
            }

            mysqlConnection.commit(function(err) {
              if (err) {
                console.log('Error in salesRoutes.post /create-quote/:sellerID: ' + err);
                res.status(500).json('Failed to create quote');
                return mysqlConnection.rollback(function() {
                  throw err;
                });
              }

              console.log('Products inserted successfully');
              res.status(200).json({ Naturali_Invoice: Naturali_Invoice, InsertDate: InsertDate, parsedProducts:  parsedProducts });
              });
            });
          });
        });
      });
    } catch (error) {
      res.status(409).send(error);
    }
  });
  

salesRouter.get('/project-invoices/:id', async function(req, res){
  const { id } = req.params

  query_ =    `SELECT * FROM NaturaliStone.Sales
                WHERE Sales.ProjectID = ${id}`;

  try{
       mysqlConnection.query(query_, function(error, results, fields){
          if(error) throw error;
          if(results.length == 0) {
              console.log('No invoices linked to this project')
              res.status(200).json({ estado: false, data: []});
          } else {
              console.log('Data OK')
              res.status(200).json(results);
          }
      });
  } catch(error){
      res.status(409).send(error);
  }
});
salesRouter.get('/customer/:id', async function(req, res){
  const { id } = req.params

  query_ =    `SELECT Sales.* FROM NaturaliStone.Sales
              LEFT JOIN NaturaliStone.Projects ON Sales.ProjectID = Projects.idProjects
              LEFT JOIN NaturaliStone.Customers ON Projects.CustomerID = Customers.CustomerID
              WHERE Customers.CustomerID = ${id};`

  try{
       mysqlConnection.query(query_, function(error, results, fields){
          if(error) throw error;
          if(results.length == 0) {
              console.log('Error en salesRoutes.get /invoice/:id')
              res.status(400).json({ estado: false, data: {}});
          } else {
              console.log('Data OK')
              res.status(200).json(results);
          }
      });
  } catch(error){
      res.status(409).send(error);
  }
});




module.exports = salesRouter;
