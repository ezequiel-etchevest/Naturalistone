import axios from 'axios';

export const GET_PAYMENTS_BY_MONTH = 'GET_PAYMENTS_BY_MONTH'

const currentYear = new Date().getFullYear() 
const currentMonth = new Date().getMonth() + 1

export function getPaymentByMonth(id, month, year){
    return async function(dispatch){
        try{
            let {data} = await axios.get(
                `/paymentByMonth/${id}?month=${month ? month : currentMonth}&year=${year ? year : currentYear}`
                )
            dispatch(
            {
                type: GET_PAYMENTS_BY_MONTH,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}
