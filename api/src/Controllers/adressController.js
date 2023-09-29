const mysqlConnection = require('../db');

const createAddress = async (customerId, address, address2, city, state, zip_code, nickname) => {
  postAddressQuery = `INSERT INTO Address (customer_id, address, address2, city, state, zip_code, nickname)
  VALUES (${customerId}, "${address}", "${address2}", "${city}", "${state}", ${zip_code}, "${nickname}")`
    
  return new Promise((resolve, reject) => {
    try {
      mysqlConnection.query(postAddressQuery, function(error, result) {
        if (error) {
          reject('Error in create address')
        }
        resolve(result)
        return result.insertId
      })
    } catch (error) {
      console.log('Error in create address')
      throw error
    }
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

  const patchAddressQuery = `UPDATE Address SET address = "${address1}", address2 = "${address2}", city = "${city}", state = "${state}", zip_code = ${zip_code}, nickname = "${nickname}"
                            WHERE address_id = ${addressId}`

  return new Promise((resolve, reject) => {
    try {
      mysqlConnection.query(patchAddressQuery, function(err, updateAddressResult) {
        if(err) {
          reject('Error in update address')
        }
        resolve(updateAddressResult);
        return updateAddressResult
      })
    } catch (error) {
      console.log('Error in update address')
      throw error
    }
  })
}


module.exports = {
    createAddress,
    getAddress,
    patchAddress,
}