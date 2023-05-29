import axios from 'axios'
export const GET_INVOICE_ERRORS = 'GET_INVOICE_ERRORS'
export const GET_INVOICE_ERRORS_FILTERED = 'GET_INVOICE_ERRORS_FILTERED'


export function getInvoiceErrors(user) {

    let admin = user[0].Secction7Flag === 1 ? true : false
    let seller = user[0].SellerID

    return async function(dispatch){
        try{
            
            let {data} = await axios.get(`/invoiceErrors?admin=${admin}&seller=${seller}`)
            dispatch({
                type: GET_INVOICE_ERRORS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function getInvoiceErrorsFiltered(filter) {
    const { user, sellerID, type, number } = filter
    let admin = user[0]?.Secction7Flag === 1 ? true : false
    let seller = user[0]?.SellerID

    return async function(dispatch){
        try{
            let {data} = await axios.get(`/invoiceErrors/filtered?sellerID=${sellerID}&type=${type}&number=${number}&admin=${admin}&seller=${seller}`)
            dispatch({
                type: GET_INVOICE_ERRORS_FILTERED,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}