import axios from 'axios';

export const GET_MONTH_FILTER = 'GET_MONTH_FILTER';

export function getMonthFilter(data){
    return async function(dispatch){
        try{ 
            dispatch(
            {
                type: GET_MONTH_FILTER,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
}
}