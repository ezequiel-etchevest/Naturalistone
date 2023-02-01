import axios from 'axios';
export const POST_DELIVERY_NOTE = 'POST_DELIVERY_NOTE';
export const GET_DELIVERIESS = 'GET_DELIVERIESS';
// export const DELETE_PAYMENT_METHOD = 'DELETE_PAYMENT_METHOD';
// export const CLEAN_PAYMENTS_BY_ID = 'CLEAN_PAYMENTS_BY_ID';

export function postDeliveryNote(id, quantities){
    return async function(dispatch){
        try{
            let { data } = await axios.post(`http://localhost:5000/delivery/${id}`, quantities)
            
            dispatch(
            {
                type: POST_DELIVERY_NOTE,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }}}

export function getDeliveriesNotes(id){
    return async function(dispatch){
        try{
            let { data } = await axios.get(`http://localhost:5000/delivery/${id}`)
            return dispatch({
                type: GET_DELIVERIESS,
                payload: data
            })}catch(error){
                console.log(error)
            }
        }
}

// export function deletePayment(invoiceID, paymentID){
//     console.log({paymentID})
//     return async function(dispatch){
//         try{
//             let { response } = await axios.delete(`http://localhost:5000/payments/invoice/${paymentID}`)
//             let { data } = await axios.get(`http://localhost:5000/payments/${invoiceID}`)
//             console.log(response)
//             dispatch(
//             {
//                 type: DELETE_PAYMENT_METHOD,
//                 payload: data
//             })
//         }catch(error){
//             console.log({error})           

//         }}}


// export function cleanStatePayments(){
//     return async function(dispatch){
//         try{
//             return dispatch({
//                 type: CLEAN_PAYMENTS_BY_ID,
//                 payload: {}
//             })}catch(error){
//                 console.log(error)
//             }
//         }
// }


