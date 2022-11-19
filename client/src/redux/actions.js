import axios from 'axios';

export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_EMPLOYEES_BY_ID = 'GET_EMPLOYEES_BY_ID';
export const LOG_OUT = 'LOG_OUT';
export const GET_INVOICE_BY_ID = 'GET_INVOICE_BY_ID';
export const GET_INVOICES_BY_SELLER = 'GET_INVOICEs_BY_SELLER';
export const PATCH_PAYMENT_METHOD = 'PATCH_PAYMENT_METHOD';
export const GET_INVOICES_LASTWEEK = 'GET_INVOICES_LASTWEEK'
export const GET_INVOICES_LASTMONTH = 'GET_INVOICES_LASTMONTH'

export function getEmployees() {
    return async function(dispatch){
        try{
            
            let {data} = await axios.get('http://localhost:5000/login')
            dispatch({
                type: GET_EMPLOYEES,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function getEmployeeById(id){
    return async function(dispatch){

        try{
            let {data} = await axios.get(`http://localhost:5000/seller/${id}`)
            const saveData = localStorage.setItem('user', JSON.stringify(data[0]))

            dispatch(
            {
                type: GET_EMPLOYEES_BY_ID,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }
    }
}

export function logOut(){
    return async function(dispatch){
        localStorage.clear()
        dispatch(
            {
                type: LOG_OUT,
                payload: []
            })

    }
}

export function getInvoicesBySeller(id){
    return async function(dispatch){

        try{
            let {data} = await axios.get(`http://localhost:5000/sales/${id}`)
            dispatch(
            {
                type: GET_INVOICES_BY_SELLER,
                payload: data
            })
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


export function getInvoicesLastWeek(id){
    return async function(dispatch){

        try{
            let {data} = await axios.get(`http://localhost:5000/sales/lastWeek/${id}`)
            dispatch(
            {
                type: GET_INVOICES_LASTWEEK,
                payload: data
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
            dispatch(
            {
                type: GET_INVOICES_LASTMONTH,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }
    }
}
