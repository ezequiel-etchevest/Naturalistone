import axios from 'axios';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
//export const GET_PRODUCTS_BY_ID = 'GET_PRODUCTS_BY_ID';

export function getAllProducts(){
    return async function(dispatch){
        try{ 
            let {data} = await axios.get(`http://localhost:5000/products`)
            
            dispatch(
            {
                type: GET_ALL_PRODUCTS,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }
    }
}