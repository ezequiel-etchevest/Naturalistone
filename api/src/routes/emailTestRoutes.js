const express = require('express');
const sendEmailUser = require('../utils/email');
const emailRouter = express.Router();

emailRouter.post('/email', function(req, res) {
    try {
        const email = sendEmailUser()
        return res.status(200).json({success: true, msg:'Email enviado'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, msg:'Error al enviar email'})
    }
})

module.exports = emailRouter