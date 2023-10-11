const express = require('express')
const projectsRouter = express.Router()
const mysqlConnection = require('../db')
const { createAddress } = require('../Controllers/adressController');
const createProject = require('../Controllers/projectController');

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
              res.status(200).json('No projects related');
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
    const { ProjectName, Shipping_State, Shipping_ZipCode, Shipping_City, Shipping_Address } = req.body

    const numberZipCode = parseFloat(Shipping_ZipCode);

    try{
      mysqlConnection.beginTransaction();

      const addressProject = await createAddress(customerID, Shipping_Address, '', Shipping_City, Shipping_State, numberZipCode, '')

      await createProject(ProjectName, customerID, addressProject.insertId);

      mysqlConnection.commit();

      return res.status(200).json({ success: true, msg: 'Project create successfully'})
    } catch(error){
      console.log('General error in create project' + error)
      mysqlConnection.rollback();
      res.status(400).json({success: false, msg: 'Error in create project'});
    }
  });


  module.exports = projectsRouter;