const express = require('express');
const { sendEmailClient } = require('../utils/email');
const emailInvoiceRouter = express.Router();
const multer = require('multer')
const upload = multer();
const fs = require('fs')

emailInvoiceRouter.post('/', upload.single('pdfFile'), async function(req, res) {

    console.log(req.body)

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

module.exports = emailInvoiceRouter