const mysqlConnection = require('../db');
const express = require('express');
const adressRouter = express.Router();
const { getAddress } = require('../Controllers/adressController');

adressRouter.get('/:addressId', async function(req, res) {
  const { addressId } = req.params;

  const numberAddressId = Number(addressId)

  try {
    const address = await getAddress(numberAddressId)
    return res.status(200).json({success: true, msg: "Get address successful", data: address })
  } catch (error) {
    console.log('Error in get address')
    throw error
  }
})

module.exports = adressRouter;