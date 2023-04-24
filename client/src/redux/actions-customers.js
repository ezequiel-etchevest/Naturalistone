import axios from 'axios';

export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const GET_CUSTOMERS_BY_ID = 'GET_CUSTOMERS_BY_ID';
export const POST_CUSTOMER = 'POST_CUSTOMER';


export function getCustomers(Name, Company){
    
    return async function(dispatch){
        try{ 
            let {data} = await axios.get(`/customers?name=${Name}&Company=${Company}`)
 
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

export function getCustomersById(customerId){

    return async function(dispatch){
        try{ 

            let {data} = await axios.get(`/customers/${customerId}`)
            dispatch(
            {
                type: GET_CUSTOMERS_BY_ID,
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
          let { data } = await axios.post(`/customers`, customerDetails)

              dispatch(
              {
                  type: POST_CUSTOMER,
                  payload: data
              })

      }catch(error){
          console.log({error})           
      }}
    }