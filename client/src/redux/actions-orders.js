import  axios  from "axios"
export const GET_ORDERS = 'GET_ORDERS'
export const GET_ORDERS_BY_ID = 'GET_ORDERS_BY_ID'
export const GET_ORDERS_PRODUCTS = 'GET_ORDERS_PRODUCTS'


export function getOrders() {
  return async function(dispatch){
    try{ 
        let {data} = await axios.get(`http://localhost:5000/orders`)
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

export function getOrdersByID(id) {
    return async function(dispatch){
      try{ 
          let {data} = await axios.get(`http://localhost:5000/orders/${id}`)
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

  export function getOrderProducts(id) {
    return async function(dispatch){
      try{ 
          let {data} = await axios.get(`http://localhost:5000/orders/products/${id}`)
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