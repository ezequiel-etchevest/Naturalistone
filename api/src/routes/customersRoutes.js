const express = require('express')
const customersRouter = express.Router()
const mysqlConnection = require('../db')



customersRouter.get('/', async function(req, res){
    const data = req.body


    query_ = `SELECT * FROM  Customers`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error al obtener data!')
                res.status(400).json(error);
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

customersRouter.get('/:id', async function(req, res){
    const data = req.body
    const {id} = req.params

    query_ = `SELECT * FROM  Customers WHERE CustomerID = ${id}`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error al obtener data!')
                res.status(400).json(error);
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});
module.exports = customersRouter;