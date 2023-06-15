import axios from 'axios';
export const GET_FREIGHTS = 'GET_FREIGHTS';

export function getFreight() {

  return async function(dispatch){

    try {
      const {data} = await axios.get('/freight')

      return dispatch({
        type: GET_FREIGHTS,
        payload: data
      })

    } catch (error) {
      console.log(error)
    }
  }
}