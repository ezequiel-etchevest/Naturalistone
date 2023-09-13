import axios from 'axios';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_BY_ID = 'GET_PROJECTS_BY_ID';
export const POST_PROJECT = 'POST_PROJECT';
export const GET_PROJECT_INVOICES = 'GET_PROJECT_INVOICES';
export const GET_PROJECT_BY_ID = 'GET_PROJECT_BY_ID';
export const GET_PROJECTS_BY_CUSTOMER = 'GET_PROJECTS_BY_CUSTOMER';
export const CLEAN_PROJECT_DETAIL = 'CLEAN_PROJECT_DETAIL';



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
                type: GET_PROJECTS_BY_CUSTOMER,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}


export function getProjectById(idProject){
    return async function(dispatch){
        try{ 
          
            let {data} = await axios.get(`/projects/id/${idProject}`)

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

export function createProject(project){
    console.log(project)
    return async function(dispatch){
        try{
            let { } = await axios.post(`/projects/${project.CustomerID}`, project)
            let {data} = await axios.get(`/projects/${project.CustomerID}`)
                dispatch(
                {
                    type: POST_PROJECT,
                    payload: data
                })
  
        }catch(error){
            console.log({error})           
        }}
}

export function getProjectInvoices(idProject){
    return async function(dispatch){
        try{ 
          
            let {data} = await axios.get(`/sales/project-invoices/${idProject}`)
            dispatch(
            {
                type: GET_PROJECT_INVOICES,
                payload: data
            })
        }catch(error){
            console.log({error})
        }
    }
}

export function cleanProjectDetail(){
    return async function(dispatch){
        try{ 
          
            dispatch(
            {
                type: CLEAN_PROJECT_DETAIL
            })
        }catch(error){
            console.log({error})
        }
    }
}