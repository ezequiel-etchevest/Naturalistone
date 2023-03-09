const express = require('express')
const loginRouter = express.Router()
const mysqlConnection = require('../db')


loginRouter.get('/', async function(req, res){
    const data = req.body


    query_ = `SELECT * FROM  Logins`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results)  res.status(200).json('Chequea tu conexion a internet');
            if(!results.length) {
                console.log('Error en loginRoutes.get /')
                res.status(200).json(error);
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