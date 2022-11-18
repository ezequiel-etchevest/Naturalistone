const express = require('express')
const loginRouter = express.Router()
const mysqlConnection = require('../db')


loginRouter.get('/', async function(req, res){
    const data = req.body

    query_ = `SELECT * FROM  Loginss`;
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

module.exports = loginRouter;