import axios from 'axios';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_FILTERED_PRODUCTS = 'GET_FILTERED_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_FPRODUCT_BY_ID';

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
export function getFiltered(type, size, thickness, price){
    return async function(dispatch){
        try{ 

            let {data} = await axios.get(`http://localhost:5000/products/filtered?type=${type}&size=${size}&thickness=${thickness}&price1=${price[0]}&price2=${price[1]}`)
 
            dispatch(
            {
                type: GET_FILTERED_PRODUCTS,
                payload: data
            })
        }catch(error){
            console.log({error})           
        }
    }
}

export function getProductById(id){
    return async function(dispatch){
        try{
            let {data} = await axios.get(`http://localhost:5000/products/${id}`)
            dispatch(
                {
                    type: GET_PRODUCT_BY_ID,
                    payload: data
                })
            }catch(error){
                console.log({error})           
            }
        }
    }