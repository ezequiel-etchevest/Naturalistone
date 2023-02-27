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
    let deliveredAmount = 0 // representa en $ las cantidades entregadas previamente

    // console.log('quantities', quantities)
    // console.log('payments', payments)

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



  // function paymentsValidation(quantities, payments) {
  //   if (payments[0].Payments === payments[0].Value) {
  //     return true;
  //   } else {
  //     let sum = 0;
  //     let deliveredAmount = 0;
  //     let totalCost = 0;
  
  //     // Calculate total cost of products
  //     for (let i = 0; i < quantities.length; i++) {
  //       const quantity = quantities[i].quantity;
  //       const price = quantities[i].SalePrice;
  //       const cost = quantity * price;
  //       sum += cost;
  //       deliveredAmount += quantities[i].delivered * price;
  //       totalCost += cost;
  //     }
  
  //     // Calculate percentage representation of each product in the invoice
  //     const percentages = quantities.map((quantity) => {
  //       const cost = quantity.quantity * quantity.SalePrice;
  //       const percentage = (cost / totalCost) * 100;
  //       return percentage;
  //     });
  
  //     // Calculate price of extra costs
  //     const extraCostsPrice = payments[0].Value - sum;
  
  //     // Calculate real price of each product including extra costs
  //     const realPrices = quantities.map((quantity, index) => {
  //       const percentage = percentages[index];
  //       const realPrice = (percentage / 100) * (sum + extraCostsPrice) / quantity.quantity;
  //       return realPrice;
  //     });
  
  //     // Check if remaining payments are enough to cover the delivery
  //     const paymentsYetToDeliver = payments[0].Payments - deliveredAmount;
  //     const requiredPayment = sum + extraCostsPrice / 2;
       
  //     if (paymentsYetToDeliver >= requiredPayment) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // }


  module.exports = {generateDeliveryID, paymentsValidation}
  