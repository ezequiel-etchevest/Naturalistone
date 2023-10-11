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

module.exports = createProject;