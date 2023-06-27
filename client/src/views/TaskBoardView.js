import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import TaskBoardContainer from "../components/taskBoard/taskBoardContainer";


const TaskBoardView = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userLocal = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(userLocal && !user.length){
          dispatch(getEmployeeById(userLocal.SellerID))
        }

        },[dispatch, userLocal, user])

  if(user.length){
    return(
      <>
        <SideBar user={user} focus={focus} setFocus={setFocus}/>
        <TaskBoardContainer user={user}/>
      </>
    )
  }
}

export default TaskBoardView