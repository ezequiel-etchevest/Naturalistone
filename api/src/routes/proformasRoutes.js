const express = require('express');
const proformasRoutes = express.Router();
const mysqlConnection = require('../db')

proformasRoutes.get('/:invoiceId/:factoryId', async function(req, res) {

    const { invoiceId, factoryId } = req.params

  let query_ = `SELECT * FROM Proformas WHERE Invoice = "${invoiceId}" AND FactoryID = ${factoryId}`

  try {
    mysqlConnection.query(query_, function(error, results) {
      if(!results?.length) {
        console.log('Error in proformasRoute /')
        }

        return res.status(200).json(results)
      })
  } catch (error) {
      console.log(error)
      return res.status(400).json({success: false, msg:'Error al obtener data Proformas /'})
  }
})

module.exports = proformasRoutes