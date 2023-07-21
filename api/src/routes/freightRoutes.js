const express = require('express');
const freightRouter = express.Router();
const mysqlConnection = require('../db')

freightRouter.get('/', async function(req, res) {

  let query_ = `SELECT * FROM FreightInvoices
  ORDER BY FreightInvoices.InvoiceDate DESC
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


freightRouter.get('/orders/:freightRef', async function(req, res) {

  const { freightRef } = req.params
  
  let query_ = `SELECT Factory.Factory_Name, Factory.FactoryID, Orders.OrderID, Orders.Value,
  Orders.InvoiceDate, Orders.Status, Updated_Date FROM Orders
  INNER JOIN FreightInvoices ON FreightInvoices.FreightRefNumber = Orders.FreightRefNumber
  INNER JOIN Factory ON Factory.FactoryID = Orders.FactoryID
  WHERE FreightInvoices.FreightRefNumber = ${freightRef}`

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

freightRouter.get('/:freightRef', async function(req, res) {

  const { freightRef } = req.params

  let query_ = `SELECT * FROM FreightInvoices
  WHERE FreightInvoices.FreightRefNumber = ${freightRef}
  ORDER BY FreightInvoices.InvoiceDate DESC
  `

  try {
  mysqlConnection.query(query_, async function(error, results) {
    if(!results.length) {
      console.log('Error in freightRouter /:freight')
      res.status(400).json(error)
      }

      return res.status(200).json(results[0])
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({success: false, msg:'Error al obtener data Freight /'})
  }
})

module.exports = freightRouter