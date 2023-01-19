import axios from 'axios'
export const GET_INVOICE_ERRORS = 'GET_INVOICE_ERRORS'


export function getInvoiceErrors() {
    return async function(dispatch){
        try{
            
            let {data} = await axios.get('http://localhost:5000/invoiceErrors')
            dispatch({
                type: GET_INVOICE_ERRORS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}