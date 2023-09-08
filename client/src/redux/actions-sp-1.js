import axios from 'axios';
export const GET_ALL_SPECIAL_PRODUCTS = 'GET_ALL_SPECIAL_PRODUCTS';
export const ADD_SPECIAL_PRODUCTS = 'ADD_SPECIAL_PRODUCTS';



export function getAllSpecialProducts(){
    return async function(dispatch){
        try{ 
            let {data} = await axios.get(`/sp-1prods`)
            dispatch(
            {
                type: GET_ALL_SPECIAL_PRODUCTS,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }
    }
}

export function addSpecialProducts(saleID, products){
  
    return async function(dispatch){
        try{ 
            let {data} = await axios.post(`/sp-1prods/${saleID}`, products)
            dispatch(
            {
                type: ADD_SPECIAL_PRODUCTS,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }
    }
}
