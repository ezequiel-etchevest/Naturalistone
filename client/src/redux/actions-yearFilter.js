import axios from 'axios';

export const GET_YEAR_FILTER = 'GET_YEAR_FILTER';

export function getYearFilter(data){
    return async function(dispatch){
        try{ 
            dispatch(
            {
                type: GET_YEAR_FILTER,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
}
}