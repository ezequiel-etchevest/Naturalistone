const express = require('express');
const freightRouter = express.Router();
const mysqlConnection = require('../db')

freightRouter.get('/', async function(req, res) {

  let query_ = `SELECT FreightInvoices.*, Freight.CompanyName FROM Freight
  LEFT JOIN FreightInvoices ON Freight.FreightKey = FreightInvoices.FreightKey
  ORDER BY FreightInvoices.InvoiceDate desc
  `

  try {
    mysqlConnection.query(query_, function(error, results) {
      if(!results.length) {
        console.log('Error in freightRouter /')
        res.status(400).json(error)
        }

        return res.status(200).json(results)
      })
  } catch (error) {
      console.log(error)
      return res.status(400).json({success: false, msg:'Error al obtener data Freight /'})
  }
})

module.exports = freightRouter