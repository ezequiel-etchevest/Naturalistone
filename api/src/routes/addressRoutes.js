const mysqlConnection = require('../db');
const express = require('express');
const addressRouter = express.Router();
const { getAddress, createAddress, patchAddress } = require('../Controllers/adressController');

addressRouter.post('/:CustomerID', async function(req, res) {
  const {
    Address,
    Address2,
    City,
    State,
    ZipCode,
    Nickname
  } = req.body

  const { CustomerID } = req.params;

  try {
    await createAddress(CustomerID, Address, Address2 ?? '', City, State, ZipCode, Nickname ?? '')

    return res.status(200).json({success: true, msg:"Create address successful"})
  } catch (error) {
    console.log('Error in route / post address')
    return res.status(400).json({success: false, msg:"Error in create address"})
  }
})

addressRouter.get('/:addressId', async function(req, res) {
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

addressRouter.patch('/:id', async function(req, res) {
  const { address, address2, city, state, zip_code, nickname } = req.body

  const { id } = req.params;

  const addressId = Number(id)

try {
  await patchAddress(addressId, address, address2 ?? '', city, state, zip_code, nickname ?? '')
  return res.status(200).json({ success: true, msg: "Update address successful" })
} catch (error) {
  console.log('Error in route edit address /', error.message); // Imprime el mensaje de error
  return res.status(400).json({ success: false, msg: error.message }); // Responde con el mensaje de error
}
})


module.exports = addressRouter;