import axios from 'axios'
export const GET_INVOICE_ERRORS = 'GET_INVOICE_ERRORS'
export const GET_INVOICE_ERRORS_BY_ID = 'GET_INVOICE_ERRORS_BY_ID'


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

export function getInvoiceErrorsByID(id) {
    return async function(dispatch){
        try{
            
            let {data} = await axios.get(`http://localhost:5000/invoiceErrors/${id}`)
            dispatch({
                type: GET_INVOICE_ERRORS_BY_ID,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}