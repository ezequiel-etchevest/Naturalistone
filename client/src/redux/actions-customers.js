import axios from 'axios';

export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const GET_CUSTOMER_BY_ID = 'GET_CUSTOMERS_BY_ID';
export const POST_CUSTOMER = 'POST_CUSTOMER';
export const GET_CUSTOMER_INVOICES = 'GET_CUSTOMER_INVOICES';



export function getCustomers(search){
    
  return async function(dispatch){
    try{ 
      let {data} = await axios.get(`/customers?search=${search}`)
        dispatch(
          {
            type: GET_CUSTOMERS,
            payload: data
          })
      }catch(error){
        console.log({error})
      }
    }
}

export function getCustomerById(customerId){

  return async function(dispatch){
    try{ 
      let {data} = await axios.get(`/customers/${customerId}`)
        dispatch(
          {
            type: GET_CUSTOMER_BY_ID,
            payload: data
          })
      }catch(error){
        console.log({error})
      }
    }
}

export function createCustomer(customerDetails){

  return async function(dispatch){
      try{
          let { } = await axios.post(`/customers`, customerDetails)
          let {data} = await axios.get(`/customers?name=${''}&Company=${''}`)

              dispatch(
              {
                  type: POST_CUSTOMER,
                  payload: data
              })

      }catch(error){
          console.log({error})           
      }}
}

export function getCustomerInvoices(id){
    
  return async function(dispatch){
    try{ 
      let {data} = await axios.get(`sales/customer/${id}`)
        dispatch(
          {
            type: GET_CUSTOMER_INVOICES,
            payload: data
          })
      }catch(error){
        console.log({error})
      }
    }
}