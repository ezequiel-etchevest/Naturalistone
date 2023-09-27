import axios from 'axios';
export const GET_STATS = 'GET_STATS'


export function getStats(filters){

    const { Month, Year, SellerID } = filters
    return async function(dispatch){
        try{
            let {data} = await axios.get(`/stats?sellerID=${SellerID}&month=${Month}&year=${Year}`)
            
            dispatch(
            {
                type: GET_STATS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}