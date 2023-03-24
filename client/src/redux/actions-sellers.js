import axios from 'axios';
export const GET_ALL_SELLERS = 'GET_ALL_SELLERS'

export function getSellers() {
    return async function(dispatch){
        try{
            
            let {data} = await axios.get('/seller')
            dispatch({
                type: GET_ALL_SELLERS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}