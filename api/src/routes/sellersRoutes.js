const express = require('express')
const sellerRouter = express.Router()
const mysqlConnection = require('../db')


sellerRouter.get('/', async function(req, res){
    const data = req.body

    query_ = `SELECT * FROM  Seller`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en sellerRoutes.get /')
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
sellerRouter.get('/:id', async function(req, res){
    const { id } = req.params

    query_ = `SELECT * FROM  Seller WHERE SellerID = ${id}`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en sellerRoutes.get /:id')
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



module.exports = sellerRouter;