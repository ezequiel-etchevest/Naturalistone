import axios from 'axios';
export const GET_INVOICE_BY_ID = 'GET_INVOICE_BY_ID';
export const GET_INVOICES_BY_SELLER = 'GET_INVOICEs_BY_SELLER';
export const GET_INVOICES_BY_SELLER_ALL = 'GET_INVOICES_BY_SELLER_ALL';
export const GET_FILTERED_INVOICES = 'GET_FILTERED_INVOICES';
export const GET_INVOICE_PRODUCTS = 'GET_INVOICE_PRODUCTS';
export const GET_SELLER_VALUES = 'GET_SELLER_VALUES';
export const PATCH_STAMP = 'PATCH_STAMP';
export const PATCH_STATUS = 'PATCH_STATUS';
export const POST_QUOTE = 'POST_QUOTE';
export const CLEAN_POST_QUOTE = 'CLEAN_POST_QUOTE';

export function getInvoicesBySeller(id, inputValues){

    return async function(dispatch){

        try{
            let {data} = await axios.get(`/sales/${id}?name=${inputValues.inputName}&number=${inputValues.inputNumber}&seller=${inputValues.selectSeller}&time=${inputValues.timeFilter}`)

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

// export function getInvoicesLastWeek(id){
//     return async function(dispatch){
//         try{
//             let {data} = await axios.get(`/sales/lastWeek/${id}`)
//             if(data.length === 0){
//                 dispatch(
//                 {
//                     type: GET_INVOICES_LASTWEEK,
//                     payload: {data, result: 'no_results'}
//                 })
//             }else{
//                 dispatch(
//                     {
//                         type: GET_INVOICES_LASTWEEK,
//                         payload: {data, result: 'results'}
//                     })
//             }
//         }catch(error){
//             console.log({error})           

//         }
//     }
// }

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

// export function getInvoicesLastMonth(id){
//     return async function(dispatch){
//         try{
//             let {data} = await axios.get(`/sales/lastMonth/${id}`)
//             if(data.length === 0){
//                 dispatch(
//                 {
//                     type: GET_INVOICES_LASTMONTH,
//                     payload: {data, result: 'no_results'}
//                 })
//             }else{
//                 dispatch(
//                     {
//                         type: GET_INVOICES_LASTMONTH,
//                         payload: {data, result: 'results'}
//                     })
//             }
//         }catch(error){
//             console.log({error})           

//         }
//     }
// }

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
            console.log({response})
            let { data } = await axios.get(`/sales/invoice/${id}`)
            console.log(response)
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

export function createQuote(sellerId, quoteDetails){


  return async function(dispatch){
      try{
          let { data } = await axios.post(`/sales/create-quote/${sellerId}`, quoteDetails)
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