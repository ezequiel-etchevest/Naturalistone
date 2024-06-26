import axios from 'axios';
import { filterCustomer } from '../utils/customerFilters';

export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const GET_CUSTOMER_BY_ID = 'GET_CUSTOMERS_BY_ID';
export const POST_CUSTOMER = 'POST_CUSTOMER';
export const GET_CUSTOMER_INVOICES = 'GET_CUSTOMER_INVOICES';
export const CLEAN_CUSTOMER_DETAIL = 'CLEAN_CUSTOMER_DETAIL'
export const PATCH_CUSTOMER = 'PATCH_CUSTOMER'
export const POST_CUSTOMER_RELATIONSHIP = 'POST_CUSTOMER_RELATIONSHIP'
export const GET_CUSTOMER_RELATIONSHIP = 'GET_CUSTOMER_RELATIONSHIP'
export const CLEAN_CUSTOMER_RELATIONSHIP = 'CLEAN_CUSTOMER_RELATIONSHIP'
export const UPDATE_ADDRESS_CUSTOMER = 'UPDATE_ADDRESS_CUSTOMER'
export const GET_CUSTOMERS_FILTER = 'GET_CUSTOMERS_FILTER'


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
            payload: data.data
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
          const response = await axios.post(`/customers/relationship?SellerID=${user}&CustomerID=${customer}`, relationshipDetails)
              dispatch(
              {
                  type: POST_CUSTOMER_RELATIONSHIP,
              })
          return response.data
      }catch(error){
          console.log({error})
          return error.response       
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

export function cleanCustomerRelationship(){
  return async function(dispatch){
    dispatch({
      type: CLEAN_CUSTOMER_RELATIONSHIP,
      payload: ''
    })
  }
}

export function createAddressCustomer(customerId, address){

  return async function(dispatch){
    try{ 
      let {data} = await axios.patch(`/customers/createAddress/${customerId}`, address)
        dispatch(
          {
            type: UPDATE_ADDRESS_CUSTOMER,
          })
          return data.data
      }catch(error){
        console.log({error})
        return error.msg
      }
    }
}

export function getCustomersByFilter(customers, filter){

  return async function(dispatch){
    try{ 
        const data = filterCustomer(customers, filter)
        dispatch(
          {
            type: GET_CUSTOMERS_FILTER,
            payload: data
          })
      }catch(error){
        console.log({error})
      }
    }
}