const express = require('express')
const customersRouter = express.Router()
const mysqlConnection = require('../db');
const CustomerFilters = require('../Controllers/customerController');

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

customersRouter.get("/relationship", async function(req, res) {

  const { customerId } = req.query

  try {
      const getCustomerRelationshipQuery = `SELECT Customer_Relationship.*, Seller.FirstName AS SellerName FROM Customer_Relationship
      LEFT JOIN Seller ON Seller.SellerID = Customer_Relationship.SellerID
      WHERE CustomerID = ${customerId}`

      mysqlConnection.query(getCustomerRelationshipQuery, function(err, results) {
        if (err) {
            return res.status(400).json({success:false, msg:"Error in get customer relationship"})
          }

        if (results.length === 0) {
          return res.status(200).json({success: true, msg:"No customers relationship", data: results})
        }

          return res.status(200).json({success: true, msg:"Customer relationship get successful", data: results})
      })
  } catch (error) {
    return res.status(500).json({success: false, msg:"General error in get customer relationship", data: results})
      
  }
})


customersRouter.get('/:id', async function(req, res){

    const {id} = req.params

    query_ = `SELECT NaturaliStone.Customers.*, Discount.Rate As DiscountRate 
        FROM Customers
        LEFT JOIN Discount ON Discount.DiscountID = Customers.DiscountID 
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

    //hay que agregar el sellerID, el vendedor encargado de cargar al cliente.
    const {
        Company,
        Phone,
        Email,
        DiscountID,
        Contact_Name,
        Address,
        Billing_Address,
        ZipCode, 
        State, 
        Billing_City, 
        Billing_ZipCode,
        Billing_State,
        Company_Position,
        City
    } = req.body

    query_ = `INSERT INTO Customers (Company, Phone, Email, DiscountID, Contact_Name, Address, Billing_Address, ZipCode, State, Billing_City, Billing_ZipCode, Billing_State, Company_Position, City) 
    VALUES ("${Company}", "${Phone}", "${Email}", "${DiscountID}", "${Contact_Name}", "${Address}", "${Billing_Address}", "${ZipCode}", "${State}", "${Billing_City}", "${Billing_ZipCode}", "${Billing_State}", "${Company_Position}", "${City}")`;
    
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en salesRoutes.get /create-customer')
                res.status(200).json('');
            } else {
                console.log('Customer created successfully')
                res.status(200).json(results);
            }
            });
    } catch(error){
        res.status(409).send(error);
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
        Date,
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