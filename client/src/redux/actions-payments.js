import axios from 'axios';
export const PATCH_PAYMENT_METHOD = 'PATCH_PAYMENT_METHOD';
export const GET_PAYMENTS_BY_ID = 'GET_PAYMENTS_BY_ID';

export function patchPaymentMethod(id, body){

    return async function(dispatch){
        try{
            let {response} = await axios.patch(`http://localhost:5000/sales/invoice/${id}`, body)
            let {data} = await axios.get(`http://localhost:5000/sales/invoice/${id}`)
            dispatch(
            {
                type: PATCH_PAYMENT_METHOD,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }}}

export function getPayments(id){
    return async function(dispatch){
        try{
            let { data } = await axios.get(`http://localhost:5000/payments/${id}`)
            return dispatch({
                type: GET_PAYMENTS_BY_ID,
                payload: data
            })}catch(error){
                console.log(error)
            }
        }
}


