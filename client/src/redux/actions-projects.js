import axios from 'axios';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_BY_ID = 'GET_PROJECTS_BY_ID';
export const POST_PROJECT = 'POST_PROJECT';


export function getProjects(){
    return async function(dispatch){
        try{ 

            let {data} = await axios.get(`/projects`)
            dispatch(
            {
                type: GET_PROJECTS,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function getCustomerProjects(idCustomer){
    return async function(dispatch){
        try{ 

            let {data} = await axios.get(`/projects/${idCustomer}`)
            dispatch(
            {
                type: GET_PROJECTS_BY_ID,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function createProject(customerId, projectDetails){

    return async function(dispatch){
        try{
            let { data } = await axios.post(`/project/${customerId}`, projectDetails)
  
                dispatch(
                {
                    type: POST_PROJECT,
                    payload: data
                })
  
        }catch(error){
            console.log({error})           
        }}
      }