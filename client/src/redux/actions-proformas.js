import axios from 'axios';
export const GET_PROFORMAS = 'GET_PROFORMAS'

export function getProformas(invoiceId, factoryId) {

  return async function (dispatch) {

    try {

      const { data } = await axios.get(`/proformas/${invoiceId}/${factoryId}`)
  
      return dispatch({
        type: GET_PROFORMAS,
        payload: data,
      })
      
    } catch (error) {
      console.log({error})
    }

  }
}