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


function paymentsValidation(quantities, payments) {

  if(payments[0].Payments === payments[0].Value) return true
  else{

    let sum = 0 // representa en $ las cantidades puestas en el formulario para entregar
    let deliveredAmount = 0
    

    for (let i = 0; i < quantities.length; i++) {
      let amount = quantities[i].quantity * quantities[i].SalePrice
      let previousAmount = quantities[i].delivered * quantities[i].SalePrice

      sum += amount
      deliveredAmount += previousAmount
    }

    let paymentsYetToDeliver = payments[0].Payments - deliveredAmount // pago restante para entregar
    let a = (sum + (payments[0].Value - (deliveredAmount + sum)) / 2 )

    if(paymentsYetToDeliver >= (sum + (payments[0].Value - (deliveredAmount + sum)) / 2 )) return true
    else return false
  }
}

  module.exports = {generateDeliveryID, paymentsValidation}