const util = require('util')
const mysqlConnection = require('../db')
const queryPromise = util.promisify(mysqlConnection.query).bind(mysqlConnection)

async function generateDeliveryID() {
  
  let deliveryID = Math.floor(3000 + Math.random() * 9000);
  const query = `SELECT * FROM Deliveries WHERE DeliveryNumber = ${deliveryID}`;
  
  try {
    const result = await queryPromise(query);
    if (!result.length) {
      console.log(`deliveryID successfully created ${deliveryID}`)
      return deliveryID;
    } else {
      return await generateDeliveryID();
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

  module.exports = {generateDeliveryID}