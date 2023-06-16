import axios from 'axios';
export const GET_FACTORIES = 'GET_FACTORIES';
export const POST_FACTORY = 'POST_FACTORY';

export function getFactories(search){

  return async function(dispatch){
      try{
          let {data} = await axios.get(`/factories?search=${search}`)
          dispatch(
              {
                  type: GET_FACTORIES,
                  payload: data
              })
      } catch(error){
          console.log({error})           
      }
  }
}

export function addFactory(factory){
   
  return async function(dispatch){
    try{
        let {} = await axios.post(`/factories`, factory)
        const data =  await axios.get(`/factories?search=${''}`)
        dispatch(
            {
                type:POST_FACTORY,
                payload: data
              })
       } catch(error){
           console.log({error})           
       }
    }
}