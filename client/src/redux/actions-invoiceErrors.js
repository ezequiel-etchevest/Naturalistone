import axios from 'axios'
export const GET_INVOICE_ERRORS = 'GET_INVOICE_ERRORS'
export const GET_INVOICE_ERRORS_FILTERED = 'GET_INVOICE_ERRORS_FILTERED'


export function getInvoiceErrors() {
    return async function(dispatch){
        try{
            
            let {data} = await axios.get('/invoiceErrors')
            dispatch({
                type: GET_INVOICE_ERRORS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function getInvoiceErrorsFiltered(sellerID, type) {
    return async function(dispatch){
        try{
            
            let {data} = await axios.get(`/invoiceErrors/filtered?id=${sellerID}&type=${type}`)
            dispatch({
                type: GET_INVOICE_ERRORS_FILTERED,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}