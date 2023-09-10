import axios from 'axios';

export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const GET_CUSTOMER_BY_ID = 'GET_CUSTOMERS_BY_ID';
export const POST_CUSTOMER = 'POST_CUSTOMER';
export const GET_CUSTOMER_INVOICES = 'GET_CUSTOMER_INVOICES';
export const CLEAN_CUSTOMER_DETAIL = 'CLEAN_CUSTOMER_DETAIL'
export const PATCH_CUSTOMER = 'PATCH_CUSTOMER'
export const POST_CUSTOMER_RELATIONSHIP = 'POST_CUSTOMER_RELATIONSHIP'
export const GET_CUSTOMER_RELATIONSHIP = 'GET_CUSTOMER_RELATIONSHIP'

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

export function cleanCustomerDetail(){
  return async function(dispatch){
    dispatch({
      type: CLEAN_CUSTOMER_DETAIL,
      payload: []
    })
  }
}

export function updateCustomer(id, customer){

  return async function(dispatch){
      try{
        let {response} = await axios.patch(`/customers/${id}`, customer)
        let {data} = await axios.get(`/customers`)
        
          dispatch(
          {
              type: PATCH_CUSTOMER,
              payload: data
          })
      }catch(error){
          console.log({error})           
      }}}

export function createCustomerRelationship(relationshipDetails, user, customer){

  return async function(dispatch){
      try{
          let { } = await axios.post(`/customers/relationship?SellerID=${user}&CustomerID=${customer}`, relationshipDetails)
              dispatch(
              {
                  type: POST_CUSTOMER_RELATIONSHIP,
              })

      }catch(error){
          console.log({error})           
      }}
}

export function getCustomerRelationship(customerId){

  return async function(dispatch){
      try{
          let { data } = await axios.get(`/customers/relationship?customerId=${customerId}`)
              dispatch(
              {
                  type: GET_CUSTOMER_RELATIONSHIP,
                  payload: data.data
              })

      }catch(error){
          console.log({error})           
      }}
}
