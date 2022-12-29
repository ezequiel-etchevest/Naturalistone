import axios from 'axios';

export const GET_CURRENT_MONTH = 'GET_CURRENT_MONTH'


export function getCurrentMonth(id){
    return async function(dispatch){
        try{ 
            let {data} = await axios.get(`http://localhost:5000/sales/currentMonth/${id}`)
            dispatch(
            {
                type: GET_CURRENT_MONTH,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}