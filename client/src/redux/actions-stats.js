import axios from 'axios';

export const GET_CURRENT_MONTH = 'GET_CURRENT_MONTH'


export function getCurrentMonth(id, admin){
    return async function(dispatch){
        try{ 
            let {data} = await axios.get(`/stats/${id}?admin=${admin}`)
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