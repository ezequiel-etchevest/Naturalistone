import axios from 'axios';

export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_EMPLOYEES_BY_ID = 'GET_EMPLOYEES_BY_ID';

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
            dispatch({
                type: GET_EMPLOYEES_BY_ID,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }
    }
}

