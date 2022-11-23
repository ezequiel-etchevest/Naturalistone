import axios from 'axios';
export const PATCH_PAYMENT_METHOD = 'PATCH_PAYMENT_METHOD';

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


