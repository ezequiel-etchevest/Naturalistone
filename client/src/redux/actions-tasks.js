import axios from 'axios';

export const GET_ALL_TASKS = 'GET_ALL_TASKS';
export const GET_TASK_BY_ID = 'GET_TASK_BY_ID';
export const POST_COMMENT = 'POST_COMMENT';
export const POST_TASK = 'POST_TASK';
export const GET_COMMENTS = 'GET_COMMENTS'



export function getAllTasks(SellerID){
    
  return async function(dispatch){
    try{ 
      let {data} = await axios.get(`/tasks/all-tasks?SellerID=${SellerID}`)
        dispatch(
          {
            type: GET_ALL_TASKS,
            payload: data
          })
      }catch(error){
        console.log({error})
      }
    }
}

export function postTask(task){
    
    return async function(dispatch){
      try{ 
        let {} = await axios.post(`/tasks/new-task`, task)
        let { data } = await axios.get(`/tasks/all-tasks?SellerID=${task.SellerID}`)
          dispatch(
            {
              type: POST_TASK,
              payload: data
            })
        }catch(error){
          console.log({error})
        }
      }
  }

export function getTaskById(TaskId){
    
    return async function(dispatch){
      try{ 
        let {data} = await axios.get(`/tasks/id/${TaskId}`)
          dispatch(
            {
              type: GET_TASK_BY_ID,
              payload: data
            })
        }catch(error){
          console.log({error})
        }
      }
}

export function postComment(comment){


    return async function(dispatch){
      try{ 
        let { } = await axios.post(`/tasks/new-comment`, comment)
        let {data} = await axios.get(`tasks/comments/${comment.TaskID}`)
          dispatch(
            {
              type: POST_COMMENT,
              payload: data
            })
        }catch(error){
          console.log({error})
        }
      }
}

export function getComments(TaskId){

  return async function(dispatch){
    try{ 
      let {data} = await axios.get(`tasks/comments/${TaskId}`)
      console.log(data)
        dispatch(
          {
            type: GET_COMMENTS,
            payload: data
          })
      }catch(error){
        console.log({error})
      }
    }
}