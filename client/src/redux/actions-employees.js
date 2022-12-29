import axios from 'axios';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_EMPLOYEES_BY_ID = 'GET_EMPLOYEES_BY_ID';
export const LOG_OUT = 'LOG_OUT';




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
            console.log(saveData)
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
                type: LOG_OUT
            })

    }
}
