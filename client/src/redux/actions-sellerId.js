
export const GET_SELLER_ID = 'GET_SELLER_ID';

export function getSellerId(data){
    return async function(dispatch){
        try{ 
            dispatch(
            {
                type: GET_SELLER_ID,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
}
}