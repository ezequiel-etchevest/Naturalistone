const express = require('express');
const sendEmailUser = require('../utils/email');
const emailRouter = express.Router();

emailRouter.post('/email', function(req, res) {
    try {
        const email = sendEmailUser()
        return res.status(200).json(email)
    } catch (error) {
        console.log(error)
    }
})

module.exports = emailRouter