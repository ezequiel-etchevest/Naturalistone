const express = require('express')
const factoryRouter = express.Router()
const mysqlConnection = require('../db')



factoryRouter.get('/', async function(req, res){  

    const { search } = req.query
    
    query_ =   `SELECT * FROM NaturaliStone.Factory
    ${
        search ? 
        `WHERE (Factory.Factory_Name LIKE LOWER('%${search}%') OR Factory.Email LIKE LOWER('%${search}%'))`
        : (``)
    }`;

    try{
        mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en factory.get /')
                res.status(200).json({});
            } else {
                console.log('data ok')
                res.status(200).json(results);
            }
        });
    } catch(error){
        res.status(409).send(error);
    }
});

factoryRouter.post('/', async function(req, res){

    const { FactoryID, Reference, Factory_Name, Phone, Email, WebSite, International_Flag } = req.body

    query_ = `INSERT INTO Factory (FactoryID, Reference, Factory_Name, Phone, Email, WebSite, International_Flag) 
    VALUES ("${FactoryID}", "${Reference}", "${Factory_Name}", "${Phone}", "${Email}", "${WebSite}", "${International_Flag}")`;
    
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en factoriesRoutes.post /add-factory')
                res.status(200).json('');
            } else {
                console.log('Factory added successfully')
                res.status(200).json(results);
            }
            });
    } catch(error){
        res.status(409).send(error);
    }
});

module.exports = factoryRouter;