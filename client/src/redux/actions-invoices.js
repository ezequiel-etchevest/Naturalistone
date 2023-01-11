import axios from 'axios';
export const GET_INVOICE_BY_ID = 'GET_INVOICE_BY_ID';
export const GET_INVOICES_BY_SELLER = 'GET_INVOICEs_BY_SELLER';
export const GET_INVOICES_LASTWEEK = 'GET_INVOICES_LASTWEEK';
export const GET_INVOICES_LASTMONTH = 'GET_INVOICES_LASTMONTH';
export const GET_FILTERED_INVOICES = 'GET_FILTERED_INVOICES';
export const GET_INVOICE_PRODUCTS = 'GET_INVOICE_PRODUCTS';
export const PATCH_STAMP = 'PATCH_STAMP';
export const PATCH_STATUS = 'PATCH_STATUS';

export function getInvoicesBySeller(id){
    return async function(dispatch){

        try{
            let {data} = await axios.get(`http://localhost:5000/sales/${id}`)
            if(data.length === 0){
                dispatch(
                {
                    type: GET_INVOICES_BY_SELLER,
                    payload: {data, result: 'no_results'}
                })
            }else{
                dispatch(
                    {
                        type: GET_INVOICES_BY_SELLER,
                        payload: {data, result: 'results'}
                    })
            }
        }catch(error){
            console.log({error})           
        }
    }
}

export function getInvoiceById(id){
    return async function(dispatch){

        try{
            let {data} = await axios.get(`http://localhost:5000/sales/invoice/${id}`)
            dispatch(
            {
                type: GET_INVOICE_BY_ID,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }
    }
}

export function getInvoicesLastWeek(id){
    return async function(dispatch){
        try{
            let {data} = await axios.get(`http://localhost:5000/sales/lastWeek/${id}`)
            if(data.length === 0){
                dispatch(
                {
                    type: GET_INVOICES_LASTWEEK,
                    payload: {data, result: 'no_results'}
                })
            }else{
                dispatch(
                    {
                        type: GET_INVOICES_LASTWEEK,
                        payload: {data, result: 'results'}
                    })
            }
        }catch(error){
            console.log({error})           

        }
    }
}

export function getFilteredInvoices(filteredInvoices){
    return async function(dispatch){
        try{

            dispatch(
            {
                type: GET_FILTERED_INVOICES,
                payload: filteredInvoices
            })
        }catch(error){
            console.log({error})           

        }
    }
}

export function getInvoicesLastMonth(id){
    return async function(dispatch){
        try{
            let {data} = await axios.get(`http://localhost:5000/sales/lastMonth/${id}`)
            if(data.length === 0){
                dispatch(
                {
                    type: GET_INVOICES_LASTMONTH,
                    payload: {data, result: 'no_results'}
                })
            }else{
                dispatch(
                    {
                        type: GET_INVOICES_LASTMONTH,
                        payload: {data, result: 'results'}
                    })
            }
        }catch(error){
            console.log({error})           

        }
    }
}

export function getInvoiceProducts(id){
    return async function(dispatch){
        try{
            let {data} = await axios.get(`http://localhost:5000/prodSold/${id}`)
            return dispatch({
                type: GET_INVOICE_PRODUCTS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function stampInvoice(id){

    return async function(dispatch){
        try{
            let {response} = await axios.patch(`http://localhost:5000/sales/quote/${id}`)
            let { data } = await axios.get(`http://localhost:5000/sales/invoice/${id}`)

            dispatch(
            {
                type: PATCH_STAMP,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }}}

export function changeStatus(id){

    return async function(dispatch){
        try{
            let {response} = await axios.patch(`http://localhost:5000/sales/cancelquote/${id}`)
            console.log({response})
            let { data } = await axios.get(`http://localhost:5000/sales/invoice/${id}`)
            console.log(response)
            dispatch(
                {
                    type: PATCH_STATUS,
                    payload: data
                })
        }catch(error){
            console.log({error})     
        }
    }
}
