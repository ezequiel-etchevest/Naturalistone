const express = require('express')
const projectsRouter = express.Router()
const mysqlConnection = require('../db')



projectsRouter.get('/', async function(req, res){

  query_ = `SELECT * FROM  Projects`;

  try{
       mysqlConnection.query(query_, function(error, results, fields){
          if(!results.length) {
              console.log('Error al obtener data en projects.get !')
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

projectsRouter.get('/id/:ProjectID', async function(req, res){

    const {ProjectID} = req.params 


    query_ = `SELECT * FROM Projects WHERE idProjects = ${ProjectID} `;
  
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(!results.length) {
                console.log('Error al obtener data en projectbyid.get !')
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

projectsRouter.get('/:idCustomer', async function(req, res){

  const {idCustomer} = req.params 

  query_ = `SELECT * FROM  Projects WHERE CustomerID = ${idCustomer}`;

  try{
       mysqlConnection.query(query_, function(error, results, fields){
          if(!results.length) {
              console.log('Error al obtener data en get.projects/:idCustomer !')
              res.status(200).json([{ProjectName: 'No projects related'}]);
          } else {
              console.log('Data OK')
              res.status(200).json(results);
          }
      });
  } catch(error){
      res.status(409).send(error);
  }
});

projectsRouter.post('/:customerID', async function(req, res){

    const { customerID } = req.params
    const { ProjectName, CustomerID, State, ZipCode, City, Shipping_Address } = req.body
   
    query_ = `INSERT INTO Projects (ProjectName, CustomerID, State, ZipCode, City, Shipping_Address ) VALUES ("${ProjectName}", "${CustomerID}", "${State}", "${ZipCode}", "${City}", "${Shipping_Address}")`
            
    try{
         mysqlConnection.query(query_, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0) {
                console.log('Error en salesRoutes.get /create-project/:customerID')
                res.status(200).json([]);
            } else {
                console.log('Project created successfully')
                res.status(200).json(results);
            }
            });
    } catch(error){
        res.status(409).send(error);
    }
  });


  module.exports = projectsRouter;