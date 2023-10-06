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
  console.log("soy payments", payments)
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

async function getPayments(id) {
  try {
  const query_getPayments = `SELECT InvoiceID, SUM(Amount) as Payments, Sales.Value FROM Payments 
  LEFT JOIN Sales ON Sales.Naturali_Invoice = Payments.InvoiceID 
  WHERE InvoiceID = ${id} GROUP BY InvoiceID;`

  return new Promise((resolve, reject) => {
    mysqlConnection.query(query_getPayments, function(err, results) {
      if(err) {
        reject('Error in get payments')
      }
      resolve(results)
    })
  })
  } catch (error) {
    console.log('Error in get payments')
    throw error
  }
}

async function createDelivery(deliveryID, id) {
  try {
    const query_createDelivery = `INSERT INTO Deliveries (DeliveryNumber, SaleID) VALUES (${deliveryID}, ${id});`
    return new Promise((resolve, reject) => {
      mysqlConnection.query(query_createDelivery, function(err, results) {
        if(err) {
          reject('Error in create delivery')
        }
        resolve(results)
      })
    })
  } catch (error) {
    console.log('Error in create delivery')
    throw error
  }
}

async function createDeliveriesProducts(deliveryID, element) {
  try {
    const query_createDeliveriesProducts = `INSERT INTO Deliveries_Products (DeliveryNumber, ProdID, Quantity) VALUES (${deliveryID}, ${element.prodID}, ${element.quantity});`

    return new Promise((resolve, reject) => {
      mysqlConnection.query(query_createDeliveriesProducts, function(err, results) {
        if(err) {
          reject(err)
        }
        resolve(results)
      })
    })
  } catch (error) {
    console.log('Error in create deliveries product')
    throw error
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


  module.exports = {
    generateDeliveryID,
    paymentsValidation,
    getPayments,
    createDelivery,
    createDeliveriesProducts
  }
  