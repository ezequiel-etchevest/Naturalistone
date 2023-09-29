const express = require('express');
const { sendEmailClient, sendSamplesEmail } = require('../utils/email');
const emailInvoiceRouter = express.Router();
const multer = require('multer')
const upload = multer();
const fs = require('fs');
const axios = require('axios');
require('dotenv').config()


emailInvoiceRouter.post('/', upload.single('pdfFile'), async function(req, res) {

    const data = JSON.parse(req.body.data)

    const { htmlBody, subject, clientEmail, pdf, sellerEmail, ccEmail } = data

    try {
        const email = await sendEmailClient(sellerEmail, clientEmail, ccEmail, htmlBody, subject, pdf)
        return res.status(200).json({success: true, msg:'Email enviado'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, msg:'Error al enviar email'})
    }
})

emailInvoiceRouter.post('/quoteDetail', async function(req, res) {

  const { quoteId, htmlBody, subject, clientEmail, sellerEmail, ccEmail } = req.body

  const pdf = await axios.get(`${process.env.API_BASE_URL}/s3/pdf/send/${quoteId}`)

  const pdfBase64 = pdf.data

    try {
      const email = await sendEmailClient(sellerEmail, clientEmail, ccEmail, htmlBody, subject, pdfBase64)
      res.status(200).json({success: true, msg: 'Email sent'})
    } catch (error) {
      console.log(error)
      res.status(400).json({success: false, msg: 'Error in send email'})
    }
})

emailInvoiceRouter.post('/samples', async function (req, res) {
  
  const { userName } = req.params 
  const { htmlBody, subject, clientEmail, sellerEmail, ccEmail } = req.body


  try {
    await sendSamplesEmail(
      sellerEmail,
      clientEmail,
      ccEmail,
      htmlBody,
      subject,
      )
    return res.status(200).json({success: true, data: "email send successfully"})
  } catch (error) {
    return res.status(400).json({success: false, data: error})
  }
})

emailInvoiceRouter.post('/customer', async function (req, res) {
  
  const { htmlBody, subject, clientEmail, sellerEmail, ccEmail } = req.body

  try {
    await sendSamplesEmail(
      sellerEmail,
      clientEmail,
      ccEmail,
      htmlBody,
      subject,
      )
    return res.status(200).json({success: true, data: "email send successfully"})
  } catch (error) {
    return res.status(400).json({success: false, data: error})
  }
})

module.exports = emailInvoiceRouter