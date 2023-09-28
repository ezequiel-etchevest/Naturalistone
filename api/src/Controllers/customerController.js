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

const updateCustomerAddress = async (address_properties, shipping_address_id, customerId) => {

  postCustomerQuery = `UPDATE Customers SET ${address_properties} = ${shipping_address_id}
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

module.exports = {
  CustomerFilters,
  createCustomer,
  updateCustomerAddress
} 
