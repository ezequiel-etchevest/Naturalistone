import axios from 'axios';
import { FaFlag } from 'react-icons/fa';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_FILTERED_PRODUCTS = 'GET_FILTERED_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_FPRODUCT_BY_ID';
export const CLEAN_PRODUCT_BY_ID = 'CLEAN_PRODUCT_BY_ID';
export const GET_HISTORY_PRICES = ' GET_HISTORY_PRICES';
export const PATCH_PRODUCT_NOTES = 'PATCH_PRODUCT_NOTES';
export const PATCH_DISCONTINUED = 'PATCH_DISCONTINUED';


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
export function getFiltered(finish, size, thickness, material, search, price){
    return async function(dispatch){
        console.log(search)
        try{
            
            let {data} = await axios.get(`http://localhost:5000/products/filtered?finish=${finish}&size=${size}&thickness=${thickness}&material=${material}&search=${search}&price1=${price[0] ? price[0] : ''}&price2=${price[1]? price[1] : ''}`)
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
            let {data} = await axios.get(`http://localhost:5000/products/id/${id}`)
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

export function cleanProductById(){

  return async function(dispatch){
    try{
        return dispatch({
            type: CLEAN_PRODUCT_BY_ID,
            payload: {}
        })}catch(error){
            console.log(error)
        }
    }
}

export function getHistoryPrices(id){

    return async function(dispatch){
        try{
            let {data} = await axios.get(`http://localhost:5000/prodSold/historyprice/${id}`)

            dispatch(
                {
                    type: GET_HISTORY_PRICES,
                    payload: data
                })
            }catch(error){
                console.log({error})           
            }
        }
    }

export function updateProductNotes(input, idProduct){

    return async function(dispatch){
        try{
            
            let {response} = await axios.patch(`http://localhost:5000/products/notes/${idProduct}`, input)
            
            let {data} = await axios.get(`http://localhost:5000/products/id/${idProduct}`)
            
            dispatch(
                {
                    type: PATCH_PRODUCT_NOTES,
                    payload: data
                })
            }catch(error){
                console.log({error})     
            }
        }
    }

export function patchDiscontinued(idProduct, flag){

    return async function(dispatch){
        try{
            console.log({flag})
            let {response} = await axios.patch(`http://localhost:5000/products/discontinued/${idProduct}`, {flag})
            
            let {data} = await axios.get(`http://localhost:5000/products`)
            
            dispatch(
                {
                    type: PATCH_DISCONTINUED,
                    payload: data
                })
            }catch(error){
                console.log({error})     
            }
        }
    }

    
