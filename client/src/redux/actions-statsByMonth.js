import axios from 'axios';

export const GET_CURRENT_MONTH = 'GET_CURRENT_MONTH';
export const GET_PAYMENT_STATS = 'GET_PAYMENT_STATS';
export const CLEAN_STATS = 'CLEAN_STATS';


const currentYear = new Date().getFullYear() 
const currentMonth = new Date().getMonth() + 1


export function getMonthAndYear(id, month, year){
    return async function(dispatch){
        try{
            console.log('soy idd', id)
            let {data} = await axios.get(
                `/statsByMonth/sellers/${id}?month=${month ? month : currentMonth}&year=${year ? year : currentYear}`
                )
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

export function getPaymentStatsByMonth(id, month, year){
    return async function(dispatch){
        try{ 
            let {data} = await axios.get(
                `/statsByMonth/payments/${id}?month=${month ? month : currentMonth}&year=${year ? year : currentYear}`
                )
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