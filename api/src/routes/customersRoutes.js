const express = require('express')
const customersRouter = express.Router()
const mysqlConnection = require('../db');
const {
  createCustomer,
  updateCustomerAddress,
} = require('../Controllers/customerController');
const { 
  createAddress
} = require('../Controllers/adressController');
const { executeQueries } = require('../Controllers/customerRelationship');




customersRouter.get('/', async function(req, res){

    const { search } = req.query

    let query_ = `
        SELECT NaturaliStone.Customers.*, Discount.Rate As DiscountRate 
        FROM Customers
        LEFT JOIN Discount ON Discount.DiscountID = Customers.DiscountID
        ${
            search ? 
            `WHERE (Customers.Company LIKE LOWER('%${search}%') OR Customers.Contact_Name LIKE LOWER('%${search}%'))`
            : (``)
        }
        `;
    try{
        mysqlConnection.query(query_, function(error, results, fields){
                console.log('Data OK')
                if(!results.length) res.status(200).send([])
                else res.status(200).json(results);
            
        });
    } catch(error){
        res.status(409).send(error);
    }
});

// customersRouter.get("/relationship", async function(req, res) {

//   const { customerId } = req.query

//   try {
//       const getCustomerRelationshipQuery = `SELECT Customer_Relationship.*, CONCAT (Seller.FirstName, ' ', Seller.LastName) AS SellerName
//       FROM Customer_Relationship
//       LEFT JOIN Seller ON Seller.SellerID = Customer_Relationship.SellerID
//       WHERE CustomerID = ${customerId}`
    
//       mysqlConnection.query(relationshipQuery, function(err, results) {
//         if (err) {
//             return res.status(400).json({success:false, msg:"Error in get customer relationship"})
//           }

//         if (results.length === 0) {
//           return res.status(200).json({success: true, msg:"No customers relationship", data: results})
//         }

//           return res.status(200).json({success: true, msg:"Customer relationship get successful", data: results})
//       })
//   } catch (error) {
//     return res.status(500).json({success: false, msg:"General error in get customer relationship", data: results})
      
//   }
// })


customersRouter.get("/relationship", async function(req, res) {
    try {  
      const { customerId } = req.query

        await executeQueries(mysqlConnection)
        const selectAllDataQuery = `
        SELECT 
            Date, Type, 
            CASE WHEN ProjectName = '' THEN NULL ELSE ProjectName END AS ProjectName, 
            Description, 
            CASE WHEN User = '' THEN NULL ELSE User END AS User, 
            CustomerID
          FROM 
            (
                SELECT * FROM Temp_Task_Created WHERE CustomerID = ${customerId}
                UNION 
                SELECT * FROM Temp_Task_Completed WHERE CustomerID = ${customerId}
                UNION
                SELECT * FROM Temp_Task_Comments WHERE CustomerID = ${customerId}
                UNION
                SELECT * FROM Temp_Quote_Created WHERE CustomerID = ${customerId}
                UNION
                SELECT * FROM Temp_Quote_Modified WHERE CustomerID = ${customerId}
                UNION
                SELECT * FROM Temp_Quote_Status_Updated WHERE CustomerID = ${customerId}
                UNION
                SELECT * FROM Temp_Quote_Status_Canceled WHERE CustomerID = ${customerId}
                UNION
                SELECT * FROM Temp_Payments WHERE CustomerID = ${customerId}
                UNION
                SELECT * FROM Temp_Samples WHERE CustomerID = ${customerId}
                UNION
                SELECT * FROM Actions WHERE CustomerID = ${customerId}
            ) Unions 
        ORDER BY \`Date\` DESC;
    `;
    
        mysqlConnection.query(selectAllDataQuery, function(err, results) {
          if (err) {
            console.log(err)
            return res.status(400).json({ success: false, msg: "Error in get customer relationship" });
          }
  
          if (results.length === 0) {
            return res.status(200).json({ success: true, msg: "No customers relationship", data: [] });
          }
  
          return res.status(200).json({ success: true, msg: "Customer relationship get successful", data: results });
        });
      } catch (error) {
      return res.status(500).json({ success: false, msg: "General error in get customer relationship" });
    }
  })


customersRouter.get('/:id', async function(req, res){

    const {id} = req.params

    query_ = `SELECT NaturaliStone.Customers.*, Discount.Rate As DiscountRate, CONCAT (Seller.FirstName, ' ', Seller.LastName) AS SellerName
        FROM Customers
        LEFT JOIN Discount ON Discount.DiscountID = Customers.DiscountID 
        LEFT JOIN Seller ON Seller.SellerID = Customers.SellerID
        WHERE CustomerID = ${id}`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error al obtener data!')
                res.status(400).json(error);
            } else {
                console.log('Data OK')
                res.status(200).json(results[0]);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

customersRouter.post('/', async function(req, res){

    const {
        Company,
        Phone,
        Email,
        DiscountID,
        Contact_Name,
        Address,
        Address2,
        Billing_Address,
        ZipCode, 
        State, 
        Billing_City, 
        Billing_Address2,
        Billing_ZipCode,
        Billing_State,
        Billing_Nickname,
        Company_Position,
        City,
        Nickname,
        ShippingAddressInBilling
    } = req.body

    try{
      mysqlConnection.beginTransaction();

      const customer = await createCustomer(Company, Phone, Email, DiscountID, Contact_Name, Company_Position)
      const shippingAddress = await createAddress(customer.insertId, Address, Address2, City, State, ZipCode, Nickname)

      let billingAddress;

      if (!ShippingAddressInBilling) {
          billingAddress = await createAddress(customer.insertId, Billing_Address, Billing_Address2, Billing_City, Billing_State, Billing_ZipCode, Billing_Nickname)
      }

      await updateCustomerAddress('shipping_address_id', shippingAddress.insertId, customer.insertId)

      await updateCustomerAddress(
        'billing_address_id',
        billingAddress?.insertId ??
        shippingAddress.insertId,
        customer.insertId
        )

      mysqlConnection.commit()

      res.status(200).json({success: true, msg:"Create customer successful"});
    } catch(error){
      console.log('General error:' + error)
      mysqlConnection.rollback();
      res.status(400).send({success: false, msg: "Error in create customer:" + error, error: error});
    }
});

customersRouter.patch('/:id', async function(req, res){
    
    const {id} = req.params
    const {
        Contact_Name,
        Company,
        Company_Position,
        Phone,
        Email,
        Address,
        ZipCode,
        State,
        City,
        Seller,
        DiscountID,
        Billing_Address,
        Billing_City,
        Billing_ZipCode,
        Billing_State,
        DiscountRate
    } = req.body
    const parsedDiscount = () => {
        if(DiscountRate == '15') return 4
        else if(DiscountRate == '10') return 3
        else if(DiscountRate == '5') return 2
        else return 1
    } 
    
    query_ = `UPDATE Customers SET Contact_Name = "${Contact_Name}", 
                Company = "${Company}", 
                Company_Position = "${Company_Position}", 
                Phone = "${Phone}", 
                Email = "${Email}", 
                Address = "${Address}",
                ZipCode = "${ZipCode}",
                State = "${State}",
                City = "${City}",
                SellerID= "${Seller}",
                DiscountID = "${parsedDiscount()}", 
                Billing_Address = "${Billing_Address}", 
                Billing_City = "${Billing_City}", 
                Billing_ZipCode = "${Billing_ZipCode}", 
                Billing_State = "${Billing_State}" 
                WHERE CustomerID = ${id}`;
    try{
      mysqlConnection.query(query_, function(error, results, fields){

           if(error) throw error;
           if(results.length == 0) {
               console.log(`Failure updating Customer ${id}`)
               res.status(200).json('');
           } else {
               console.log('Customer Update OK')
               res.status(200).json(results);
           }
       });
    } catch(error){
        res.status(409).send(error);
    }
});

customersRouter.post('/relationship', async function(req, res){

    const {
        Action,
        Comment,
    } = req.body

    const { SellerID, CustomerID } = req.query

    query_ = `INSERT INTO Customer_Relationship (CustomerID, Action, Comment, SellerID) 
    VALUES ("${CustomerID}", "${Action}", "${Comment}", "${SellerID}")`;
    
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en salesRoutes.post /create-customerRelationship')
                res.status(200).json('');
            } else {
                console.log('Customer relationship created successfully')
                res.status(200).json({success: true, msg: 'Customer relationship created successfully', data: results });
            }
            });
    } catch(error){
        res.status(409).send(error);
    }
});


module.exports = customersRouter;