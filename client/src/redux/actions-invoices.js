import axios from 'axios';
export const GET_INVOICE_BY_ID = 'GET_INVOICE_BY_ID';
export const GET_INVOICES_BY_SELLER = 'GET_INVOICEs_BY_SELLER';
export const GET_INVOICES_BY_SELLER_ALL = 'GET_INVOICES_BY_SELLER_ALL';
export const GET_FILTERED_INVOICES = 'GET_FILTERED_INVOICES';
export const GET_INVOICE_PRODUCTS = 'GET_INVOICE_PRODUCTS';
export const CLEAN_INVOICE_PRODUCTS = 'CLEAN_INVOICE_PRODUCTS';
export const GET_SELLER_VALUES = 'GET_SELLER_VALUES';
export const PATCH_STAMP = 'PATCH_STAMP';
export const PATCH_STATUS = 'PATCH_STATUS';
export const POST_QUOTE = 'POST_QUOTE';
export const CLEAN_POST_QUOTE = 'CLEAN_POST_QUOTE';
export const PATCH_QUOTE = 'PATCH_QUOTE';
export const PATCH_QUOTE_PRODS = 'PATCH_QUOTE_PRODS';
export const CLEAN_INVOICE_DETAIL = 'CLEAN_INVOICE_DETAIL';

export function getInvoicesBySeller(id, inputValues){

    return async function(dispatch){

        try{
            let {data} = await axios.get(`/sales/${id}?name=${inputValues.inputName}&number=${inputValues.inputNumber}&seller=${inputValues.selectSeller}&time=${inputValues.timeFilter}&quoteStatus=${inputValues.quoteStatus ? inputValues.quoteStatus : ''}`)

            dispatch(
                {
                    type: GET_INVOICES_BY_SELLER,
                    payload: {data, result: 'results'}
                })
        } catch(error){
            console.log({error})           
        }
    }
}

export function getInvoiceById(id){
    return async function(dispatch){

        try{
            let {data} = await axios.get(`/sales/invoice/${id}`)
            dispatch(
            {
                type: GET_INVOICE_BY_ID,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }
    }
}

export function getFilteredInvoices(filteredInvoices){
    return async function(dispatch){
        try{

            dispatch(
            {
                type: GET_FILTERED_INVOICES,
                payload: filteredInvoices
            })
        }catch(error){
            console.log({error})           

        }
    }
}


export function getInvoiceProducts(id){
    return async function(dispatch){
        try{
            let {data} = await axios.get(`/prodSold/${id}`)
 
            return dispatch({
                type: GET_INVOICE_PRODUCTS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}
export function cleanInvoiceProducts(){
    return async function(dispatch){
        try{
            return dispatch({
                type: CLEAN_INVOICE_PRODUCTS
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function stampInvoice(id){

    return async function(dispatch){
        try{
            let {response} = await axios.patch(`/sales/quote/${id}`)
            let { data } = await axios.get(`/sales/invoice/${id}`)

            dispatch(
            {
                type: PATCH_STAMP,
                payload: data
            })
        }catch(error){
            console.log({error})           

        }}}

export function changeStatus(id, action){

    return async function(dispatch){
        try{
            let {response} = await axios.patch(`/sales/changeStatus/${id}`, {action})
            let { data } = await axios.get(`/sales/invoice/${id}`)

            dispatch(
                {
                    type: PATCH_STATUS,
                    payload: data
                })
        }catch(error){
            console.log({error})     
        }
    }
}

export function getSellerValues(){
    return async function(dispatch){
        try{
            let {data} = await axios.get(`/sales/values/seller`)
            return dispatch({
                type: GET_SELLER_VALUES,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function createQuote(sellerId, formData, authFlag){


  return async function(dispatch){
  
      try{
          let { data } = await axios.post(`/sales/create-quote/${sellerId}`, formData, authFlag)
        //   let { data } = await axios.get(`/create-quote/${sellerId}`, quoteDetails)
         
              dispatch(
              {
                  type: POST_QUOTE,
                  payload: data
              })

      }catch(error){
          console.log({error})           
      }}
    }

export function cleanCreatedQuote(){

  return async function(dispatch){
      try{
            dispatch(
            {
                type: CLEAN_POST_QUOTE,
            })

      }catch(error){
          console.log({error})           
      }}
    }


export function updateQuoteProds(quoteID, formData, SellerID){
    
    return async function(dispatch){
        try{
            let {} = await axios.patch(`/sales/sales-update-products/${quoteID}`, {formData, SellerID})
            let prods = await axios.get(`/prodSold/${quoteID}`)
            let invoice = await axios.get(`/sales/invoice/${quoteID}`)
            const data = {prods: prods.data, invoice: invoice.data}
            dispatch(
                {
                    type: PATCH_QUOTE_PRODS,
                    payload: data
                })
        }catch(error){
            console.log({error})     
        }
    }
}
export function updateQuote(quoteID, formData, SellerID){
    
    return async function(dispatch){
        try{
            let {} = await axios.patch(`/sales/sales-update/${quoteID}`, {formData, SellerID})
            let { data } = await axios.get(`/sales/invoice/${quoteID}`)
            dispatch(
                {
                    type: PATCH_QUOTE,
                    payload: data
                })
        }catch(error){
            console.log({error})     
        }
    }
}