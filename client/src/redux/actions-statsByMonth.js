import axios from 'axios';

export const GET_CURRENT_MONTH = 'GET_CURRENT_MONTH';
export const GET_PAYMENT_STATS = 'GET_PAYMENT_STATS';
export const CLEAN_STATS = 'CLEAN_STATS';


export function getMonth(id, month){
    return async function(dispatch){
        try{ 
            let {data} = await axios.get(`/statsByMonth/sellers/${id}?month=${month}`)
            console.log('soy data', data)
            dispatch(
            {
                type: GET_CURRENT_MONTH,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function getPaymentStatsByMonth(id, month){
    return async function(dispatch){
        try{ 
            let {data} = await axios.get(`/statsByMonth/payments/${id}?month=${month}`)
            dispatch(
            {
                type: GET_PAYMENT_STATS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }}

export function cleanStats(){
    return async function(dispatch){
        try{
            dispatch({
                type: CLEAN_STATS,
                payload: {}
            })
        }catch(error){

        }
    }
}