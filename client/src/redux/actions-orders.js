import  axios  from "axios"
export const GET_ORDERS = 'GET_ORDERS'
export const GET_ORDERS_BY_ID = 'GET_ORDERS_BY_ID'
export const GET_ORDERS_PRODUCTS = 'GET_ORDERS_PRODUCTS'
export const PATCH_ORDER_STATUS = 'PATCH_ORDER_STATUS'
export const CLEAN_ORDERS_PRODUCTS = 'CLEAN_ORDERS_PRODUCTS'


export function getOrders() {
  return async function(dispatch){
    try{ 
        let {data} = await axios.get(`/orders`)
        dispatch(
        {
            type: GET_ORDERS,
            payload: data
        })
    }catch(error){
        console.log({error})           

    }
}
}

export function getOrdersByID(orderId, factoryId) {
    return async function(dispatch){
      try{  
          let {data} = await axios.get(`/orders/${orderId}/${factoryId}`)
          dispatch(
          {
              type: GET_ORDERS_BY_ID,
              payload: data
          })
      }catch(error){
          console.log({error})           
  
      }
  }
}

export function getOrderProducts(orderId, factoryId) {
  return async function(dispatch){
    try{ 
        let {data} = await axios.get(`/orders/products/${orderId}/${factoryId}`)
        dispatch(
        {
            type: GET_ORDERS_PRODUCTS,
            payload: data
        })
    }catch(error){
        console.log({error})           

    }
  }
}

export function cleanOrderProducts() {
    return async function(dispatch){
      try{ 
          dispatch(
          {
              type: CLEAN_ORDERS_PRODUCTS
          })
      }catch(error){
          console.log({error})           
  
      }
    }
  }


export function cancelOrderStatus(id) {
  return async function(dispatch){
    try{ 
        let { response } = await axios.patch(`/orders/cancelorder/${id}`)
        let {data} = await axios.get(`/orders/${id}`)
        dispatch(
        {
            type: PATCH_ORDER_STATUS,
            payload: data
        })
    }catch(error){
        console.log({error})           
    }
  }
}