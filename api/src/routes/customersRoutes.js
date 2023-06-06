const express = require('express')
const customersRouter = express.Router()
const mysqlConnection = require('../db');
const CustomerFilters = require('../Controllers/customerController');
const listBuckets = require('./testS3Mitu');



customersRouter.get('/', async function(req, res){
    listBuckets();
    const { search } = req.query

    query_ = `SELECT NaturaliStone.Customers.*, Discount.Rate As DiscountRate FROM Customers
    Left JOIN Discount ON Discount.DiscountID = Customers.DiscountID;`;
    try{
        mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error al obtener data!')
                res.status(400).json(error);
            } else {
                console.log('Data OK')
                let filtered = CustomerFilters(results, search)
                res.status(200).json(filtered);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

customersRouter.get('/:id', async function(req, res){

    const {id} = req.params

    query_ = `SELECT * FROM  Customers WHERE CustomerID = ${id}`;
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
    const {Company, Phone, Email, DiscountID, Contact_Name, Billing_Address, ZipCode, State} = req.body

    query_ = `INSERT INTO Customers (Company, Phone, Email, DiscountID, Contact_Name, Billing_Address, ZipCode, State) VALUES ("${Company}", "${Phone}", "${Email}", "${DiscountID}", "${Contact_Name}", "${Billing_Address}", "${ZipCode}", "${State}")`
            
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
    const { Contact_Name, Company, Company_Position, Phone, Email, DiscountRate, Address, City, ZipCode, State} = req.body

    const DiscountID = (() => {
        switch (DiscountRate) {
          case '0':
            return  1;
          case '5':
            return  2;
          case '10':
            return  3;
          case '15':
            return  4;
          default:
            return  0;
        }
      })();


    
    // const parsedDiscount = () => {
    //     if(DiscountID === '15') return 4
    //     else if(DiscountID === '10') return 3
    //     else if(DiscountID === '5') return 2
    //     else return 1
    // } 
    
    query_ = `UPDATE Customers SET Contact_Name = "${Contact_Name}", 
                Company = "${Company}", 
                Company_Position = "${Company_Position}", 
                Phone = "${Phone}", 
                Email = "${Email}", 
                DiscountID = "${DiscountID}", 
                Address = "${Address}", 
                City = "${City}", 
                ZipCode = "${ZipCode}", 
                State = "${State}" 
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

module.exports = customersRouter;