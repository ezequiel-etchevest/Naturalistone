const express = require('express')
const loginRouter = express.Router()
const mysqlConnection = require('../db')


loginRouter.get('/', async function(req, res){
    const data = req.body

    query_ = `SELECT * FROM  Logins`;
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error al obtener data!')
                res.status(200).json({});
            } else {
                console.log('Data OK')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(String(error));
    }
});

module.exports = loginRouter;