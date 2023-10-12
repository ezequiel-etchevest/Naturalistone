const mysqlConnection = require('../db');

const createProject =  async (ProjectName, customerID, shipping_address_id) => {
  const query_createProject = `INSERT INTO Projects (ProjectName, CustomerID, shipping_address_id) VALUES (?, ?, ?)`

  return new Promise((resolve, reject) => {
    mysqlConnection.query(query_createProject, [ProjectName, customerID, shipping_address_id], function(err, results) {
      if(err) {
        reject('Error in create project')
      }
      resolve(results)
    })
  })
}

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

const updateProject =  async (idProject, ProjectName, shipping_address_id) => {
  
  const itemsUpdate = [];

  if(ProjectName) itemsUpdate.push(`ProjectName = "${ProjectName}"`)

  if(shipping_address_id) itemsUpdate.push(`shipping_address_id = "${shipping_address_id}"`)

  const queryItemsUpdate = itemsUpdate.join(", ")
                            
  const query_editProject = `UPDATE Projects SET ${queryItemsUpdate}
                            WHERE idProjects = ${idProject}`

  return new Promise((resolve, reject) => {
    mysqlConnection.query(query_editProject, function(err, results) {
      if(err) {
        reject('Error in create project')
      }
      resolve(results)
    })
  })
}


module.exports = { createProject, getProjectsCustomer, updateProject };