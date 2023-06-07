const express = require('express');
const { sendEmailClient } = require('../utils/email');
const emailInvoiceRouter = express.Router();
const multer = require('multer')
const upload = multer();

emailInvoiceRouter.post('/', upload.single('pdfFile'), async function(req, res) {
    const { subject, htmlBody, clientEmail, sellerEmail, pdf, nameValue } = req.body

    console.log('soy body', req.body)

    // console.log('soy req', req)

    console.log('soy req,file', req.file)

    try {
        // const email = await sendEmailClient(null, 'eduardoasm19@gmail.com', htmlBody, subject)
        return res.status(200).json({success: true, msg:'Email enviado'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, msg:'Error al enviar email'})
    }
})

module.exports = emailInvoiceRouter