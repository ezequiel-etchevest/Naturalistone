import axios from 'axios';
export const GET_SAMPLES = 'GET_SAMPLES';
export const POST_SAMPLES = 'POST_SAMPLES';
export const GET_SAMPLES_PRODUCTS = 'GET_SAMPLES_PRODUCTS'

export function getSamples(customer){
  return async function(dispatch){
      try {
        const { data } = await axios.get(`/samples?customer=${customer}`)
        dispatch({
          type: GET_SAMPLES,
          payload: data.data
        })       
      } catch (error) {
              // Manejar el error según tus necesidades
      console.error('Error al obtener las muestras:', error.message);
      // Puedes mostrar un mensaje de error al usuario o realizar otra acción
    }
      }
  }

  
export function getSamplesProducts(idSamples) {
  return async function(dispatch) {
    try {
      const { data } = await axios.get(`/samples/samplesProducts/${idSamples}`) 

      return dispatch({
        type: GET_SAMPLES_PRODUCTS,
        payload: data,
      })
    } catch (error) {
      console.log(error) 
    }
  }
}

export function postSamples(formData){
  return async function(dispatch) {
    try {
        const { data } = await axios.post('/samples', formData)

        return dispatch({
          type: POST_SAMPLES,
          // payload: data
        })
    } catch (error) {
      console.log('error in post samples')
    }
  }
}