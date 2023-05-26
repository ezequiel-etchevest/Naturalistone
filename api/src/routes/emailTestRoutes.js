const express = require('express');
const { sendInvoiceEmail } = require('../utils/email');
const emailRouter = express.Router();

emailRouter.post('/email', async function(req, res) {
    try {
        const email = await sendInvoiceEmail('eduardoasm19@gmail.com', 123456)
        return res.status(200).json({success: true, msg:'Email enviado'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, msg:'Error al enviar email'})
    }
})

module.exports = emailRouter