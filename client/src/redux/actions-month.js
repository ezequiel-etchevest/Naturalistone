import axios from 'axios';

export const GET_MONTH = 'GET_MONTH';

export function getMonth(data){
    return async function(dispatch){
        try{ 
            dispatch(
            {
                type: GET_MONTH,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
}
}