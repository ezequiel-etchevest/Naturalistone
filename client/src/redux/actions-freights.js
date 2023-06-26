import axios from 'axios';
export const GET_FREIGHTS = 'GET_FREIGHTS';
export const GET_FREIGHT_ID = 'GET_FREIGHT_ID';
export const GET_FREIGHTS_FACTORY = 'GET_FREIGHTS_FACTORY';
export const CLEAN_STATS_FREIGHT = 'CLEAN_STATS_FREIGHT'

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

export function getFreightId(freightRef) {

  return async function(dispatch){

    try {
      const {data} = await axios.get(`/freight/${freightRef}`)

      return dispatch({
        type: GET_FREIGHT_ID,
        payload: data
      })

    } catch (error) {
      console.log(error)
    }
  }
}

export function getFreightOrders(freightRef) {

  return async function(dispatch){

    try {
      const {data} = await axios.get(`/freight/orders/${freightRef}`)

      return dispatch({
        type: GET_FREIGHTS_FACTORY,
        payload: data
      })

    } catch (error) {
      console.log(error)
    }
  }
}

export function cleanStatsFreight() {
  return async function (dispatch) {
    return dispatch({
      type: CLEAN_STATS_FREIGHT,
      payload: [],
    })
  }
}