import axios from 'axios';

export const GET_EMPLOYEES = 'GET_EMPLOYEES';

export function getEmployees() {
    return async function(dispatch){
        try{
            
            let {data} = await axios.get('http://localhost:5000/login')
            console.log(data)
            dispatch({
                type: GET_EMPLOYEES,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    } 
}