import axios from 'axios';
export const GET_SAMPLES = 'GET_SAMPLES';
export const POST_SAMPLES = 'POST_SAMPLES';
export const GET_SAMPLES_PRODUCTS = 'GET_SAMPLES_PRODUCTS'
export const GET_SAMPLES_TRACKINGNUMBER = 'GET_SAMPLES_TRACKINGNUMBER'
export const DELETE_SAMPLE = 'DELETE_SAMPLE'
export const CLEAR_SAMPLES = 'CLEAR_SAMPLES'

export function getSamples(search, sellerId){
  
  return async function(dispatch){
      try {
        const { data } = await axios.get(`/samples?search=${search}&sellerId=${sellerId}`)
        dispatch({
          type: GET_SAMPLES,
          payload: data.data
        })       
      } catch (error) {
      console.error('Error al obtener las muestras:', error.message);

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
        await axios.post('/samples', formData)
    
        return dispatch({
          type: POST_SAMPLES,
        })
    } catch (error) {
      console.log('error in post samples')
    }
  }
}

export function validateTrackingNumber(trackingNumber){
  return async function(dispatch) {
    try {
      if(trackingNumber.length){
        const { data } = await axios.get(`/samples/validation/${trackingNumber}`)

        return dispatch({
          type: GET_SAMPLES_TRACKINGNUMBER,
          payload: data
        })
      }
    } catch (error) {
      console.log('error validating Trackingnumber')
    }
  }
}

export function deleteSample(idSample) {
  return async function (dispatch) {
    try {
      const {data} = await axios.delete(`/samples/${idSample}`)

      return dispatch({
        type: DELETE_SAMPLE
      })
    } catch (error) {
      console.log('error in delete sample', error)
    }
  }
}

export function clearSamples() {
  return async function (dispatch) {
    try {

      return dispatch({
        type: CLEAR_SAMPLES,
        payload: {},
      })
    } catch (error) {
      console.log('error clear samples', error)
    }
  }
}