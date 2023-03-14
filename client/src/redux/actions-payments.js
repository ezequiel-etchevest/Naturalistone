import axios from 'axios';
export const POST_PAYMENT_METHOD = 'POST_PAYMENT_METHOD';
export const DELETE_PAYMENT_METHOD = 'DELETE_PAYMENT_METHOD';
export const GET_PAYMENTS_BY_ID = 'GET_PAYMENTS_BY_ID';
export const CLEAN_PAYMENTS_BY_ID = 'CLEAN_PAYMENTS_BY_ID';

export function patchPaymentMethod(id, input){

    return async function(dispatch){
        try{
            let {response} = await axios.post(`/payments/invoice/${id}`, input)
            let { data } = await axios.get(`/payments/${id}`)
            
            dispatch(
            {
                type: POST_PAYMENT_METHOD,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }}}

export function getPayments(id){
    return async function(dispatch){
        try{
            let { data } = await axios.get(`/payments/${id}`)
            return dispatch({
                type: GET_PAYMENTS_BY_ID,
                payload: data
            })}catch(error){
                console.log(error)
            }
        }
}

export function deletePayment(invoiceID, paymentID){
    console.log({paymentID})
    return async function(dispatch){
        try{
            let { response } = await axios.delete(`/payments/invoice/${paymentID}`)
            let { data } = await axios.get(`/payments/${invoiceID}`)
            console.log(response)
            dispatch(
            {
                type: DELETE_PAYMENT_METHOD,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }}}


export function cleanStatePayments(){
    return async function(dispatch){
        try{
            return dispatch({
                type: CLEAN_PAYMENTS_BY_ID,
                payload: {}
            })}catch(error){
                console.log(error)
            }
        }
}


