import axios from 'axios';

export const POST_ADDRESS = 'POST_ADDRESS';
export const PATCH_ADDRESS = 'PATCH_ADDRESS';

export function createAddress(CustomerID, address){
    
  return async function(dispatch){
    try{ 
      let {data} = await axios.post(`/address/${CustomerID}`, address)
        dispatch(
          {
            type: POST_ADDRESS,
          })
          return data.data
      }catch(error){
        console.log({error})
        return error.msg
      }
    }
}

export function updateAddress(idAddress, address){

  return async function(dispatch){
    try{ 
      let {data} = await axios.patch(`/address/${idAddress}`, address)
        dispatch(
          {
            type: PATCH_ADDRESS,
          })
          return data.data
      }catch(error){
        console.log({error})
        return error.msg
      }
    }
}
