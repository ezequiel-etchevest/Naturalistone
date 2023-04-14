import axios from 'axios';

export const GET_CURRENT_MONTH = 'GET_CURRENT_MONTH';
export const GET_PAYMENT_STATS = 'GET_PAYMENT_STATS';
export const CLEAN_STATS = 'CLEAN_STATS';


export function getCurrentMonth(id, admin){
    return async function(dispatch){
        try{ 
            console.log('month',{id},{admin})
            let {data} = await axios.get(`/stats/sellers/${id}?admin=${admin}`)
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

export function getPaymentStats(id, admin){

    return async function(dispatch){
        try{ 
            let {data} = await axios.get(`/stats/payments/${id}?admin=${admin}`)

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