const mysqlConnection = require('../db');

const createAddress = async (customerId, address, address2, city, state, zip_code, nickname) => {
  postAddressQuery = `INSERT INTO Address (customer_id, address, address2, city, state, zip_code, nickname)
  VALUES (${customerId}, "${address}", "${address2}", "${city}", "${state}", ${zip_code}, "${nickname}")`
    
  return new Promise((resolve, reject) => {
      mysqlConnection.query(postAddressQuery, function(error, result) {
        if (error) {
          reject('Error in create address')
        }
        resolve(result)
      })
 })
}

const getAddress = async (address_id) => {
  const getAddressQuery = `SELECT * FROM Address WHERE address_id = ${address_id}`

  return new Promise((resolve, reject) => {
    try {
      mysqlConnection.query(getAddressQuery, function(err, getAddressResult) {
        if (err) {
          reject('Error in get Address')
        }
        resolve(getAddressResult)
      })
    } catch (error) {
      console.log('Error in get address')
      throw error
    }
  })
}

const patchAddress = async (addressId, address1, address2, city, state, zip_code, nickname) => {

  const itemsUpdate = [];

  if(address1) itemsUpdate.push(`address = "${address1}"`)

  if(address2) itemsUpdate.push(`address2 = "${address2}"`)

  if(city) itemsUpdate.push(`city = "${city}"`)

  if(state) itemsUpdate.push(`state = "${state}"`)

  if(zip_code) itemsUpdate.push(`zip_code = ${zip_code}`)

  if(nickname) itemsUpdate.push(`nickname = "${nickname}"`)

  const queryItemsUpdate = itemsUpdate.join(", ")

  const patchAddressQuery = `UPDATE Address SET ${queryItemsUpdate}
                            WHERE address_id = ${addressId}`

  return new Promise((resolve, reject) => {
      mysqlConnection.query(patchAddressQuery, function(err, updateAddressResult) {
        if(err) {
          reject(new Error('Error in update address'))
        }
        resolve(updateAddressResult);
      })
  })
}


module.exports = {
    createAddress,
    getAddress,
    patchAddress,
}