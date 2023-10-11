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

const getProjectsCustomer = async (idCustomer) => {
  query_getProjects = 
    `SELECT
       Projects.*,
       shipping_address.address AS shipping_address,
       shipping_address.address2 AS shipping_address2,
       shipping_address.city AS shipping_city,
       shipping_address.state AS shipping_state,
       shipping_address.zip_code AS shipping_zip_code,
       shipping_address.nickname AS shipping_nickname,
       billing_address.address AS billing_address,
       billing_address.address2 AS billing_address2,
       billing_address.city AS billing_city,
       billing_address.state AS billing_state,
       billing_address.zip_code AS billing_zip_code,
       billing_address.nickname AS billing_nickname
    FROM Projects
      LEFT JOIN Address AS shipping_address ON shipping_address.address_id = Projects.shipping_address_id
      LEFT JOIN Address AS billing_address ON billing_address.address_id = Projects.billing_address_id
    WHERE CustomerID = ${idCustomer}`;

  return new Promise((resolve, reject) => {
      mysqlConnection.query(query_getProjects, function(err, projects) {
        if(err) {
          reject('Error in get projects from customer')
        }
        resolve(projects)
      })
  })
}

projectsRouter.get('/:idCustomer', async function(req, res){

  const {idCustomer} = req.params 

  try{
    const projects = await getProjectsCustomer(idCustomer)
    return res.status(200).json(projects)
  } catch(error){
    return res.status(409).send(error);
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