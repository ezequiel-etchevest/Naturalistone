import axios from 'axios';
export const POST_DELIVERY_NOTE = 'POST_DELIVERY_NOTE';
export const GET_DELIVERIESS = 'GET_DELIVERIESS';
export const GET_DELIVERY_BY_ID = 'GET_DELIVERY_BY_ID';
export const POST_DELIVERY_NOTE_FAIL = 'POST_DELIVERY_NOTE_FAIL';
// export const CLEAN_PAYMENTS_BY_ID = 'CLEAN_PAYMENTS_BY_ID';

export function postDeliveryNote(id, quantities){
    return async function(dispatch){
        try{
            let { data } = await axios.post(`http://localhost:5000/delivery/${id}`, quantities)

            if(data.val){
                dispatch(
                {
                    type: POST_DELIVERY_NOTE,
                    payload: data.deliveryID
                })
            } else {
                dispatch(
                    {
                        type: POST_DELIVERY_NOTE_FAIL,
                        payload: data.deliveryID
                    })
            }
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

export function getDeliveryNote(id){
    return async function(dispatch){
        try{
            let { data } = await axios.get(`http://localhost:5000/delivery/id/${id}`)
            return dispatch({
                type: GET_DELIVERY_BY_ID,
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


