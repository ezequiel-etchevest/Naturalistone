import axios from 'axios';

export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_EMPLOYEES_BY_ID = 'GET_EMPLOYEES_BY_ID';
export const LOG_OUT = 'LOG_OUT';
export const GET_INVOICE_BY_ID = 'GET_INVOICE_BY_ID';
export const GET_INVOICES_BY_SELLER = 'GET_INVOICEs_BY_SELLER'

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
            console.log('acions', {id})
            let {data} = await axios.get(`http://localhost:5000/sales/${id}`)
            console.log('actions', {data})
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
