const mysqlConnection = require('../db');

const CustomerFilters = (invoices, name) => {

  let filtered = invoices;

  if (name !== '' && name !== undefined) {
    filtered = filtered.filter((inv) => {
        return (
          inv.Contact_Name && inv.Contact_Name.toLowerCase().includes(name.toLowerCase()) ||
          inv.Company && inv.Company.toLowerCase().includes(name.toLowerCase())
        );
    });
  }

  return filtered;
};

const createCustomer = async (
  company,
  phone,
  email,
  discountId,
  contact_name,
  company_position,
) => {

  postCustomerQuery = `INSERT INTO Customers (Company, Phone, Email, DiscountID, Contact_Name, Company_Position) 
  VALUES ("${company}", "${phone}", "${email}", "${discountId}", "${contact_name}", "${company_position}")`;
    
  return new Promise((resolve, reject) => {
    try{
      mysqlConnection.query(postCustomerQuery, function(error, createCustomerResults){
        if(error) throw error;
        if(createCustomerResults.length == 0) {
          console.log('Error in /create-customer')
          reject('Error in create customer')
        } else {
          resolve(createCustomerResults)
          return createCustomerResults.insertId
        }
    });
    } catch(error){
        console.log('Error in create customer')
        throw error
    }
    })

}

const updateCustomerAddress = async (address_properties, address_id, customerId) => {

  postCustomerQuery = `UPDATE Customers SET ${address_properties} = ${address_id}
                      WHERE CustomerID = ${customerId}`;
    
  return new Promise((resolve, reject) => {
    try{
      mysqlConnection.query(postCustomerQuery, function(error, updateCustomersResult){
        if(error) throw error;
        if(updateCustomersResult.length == 0) {
          console.log('Error in /update-customer')
          reject('Error in update customer')
        } else {
          resolve(updateCustomersResult)
          return updateCustomersResult
        }
    });
    } catch(error){
        console.log('Error in update customer')
        throw error
    }
    })
}

async function getCustomer(id) {
  try {
    const query_get_customer = `
        SELECT
        Customers.*,
        Discount.Rate AS DiscountRate,
        CONCAT(Seller.FirstName, ' ', Seller.LastName) AS SellerName,
        shipping_address.address AS shipping_address,
        shipping_address.address2 AS shipping_address2,
        shipping_address.city AS shipping_city,
        shipping_address.state AS shipping_state,
        shipping_address.zip_code AS shipping_zip_code,
        shipping_address.nickname AS shipping_nickname,
        billing_address.address AS billing_address,
        billing_address.address2 AS billing_address2,
        billing_address.city AS billing_city,
        billing_address.state AS billing_state,
        billing_address.zip_code AS billing_zip_code,
        billing_address.nickname AS billing_nickname
      FROM Customers
      LEFT JOIN Discount ON Discount.DiscountID = Customers.DiscountID
      LEFT JOIN Seller ON Seller.SellerID = Customers.SellerID
      LEFT JOIN Address AS shipping_address ON shipping_address.address_id = Customers.shipping_address_id
      LEFT JOIN Address AS billing_address ON billing_address.address_id = Customers.billing_address_id
      WHERE Customers.CustomerID = ${id}`;

        return new Promise((resolve, reject) => {
          mysqlConnection.query(query_get_customer, function(err, customer) {
            if(err) {
              reject('Error in get customer')
            }
            resolve(customer)
          })
        })
  } catch (error) {
    console.log('Error in get customer')
    throw error
  }
}

module.exports = {
  CustomerFilters,
  createCustomer,
  updateCustomerAddress,
  getCustomer
} 
