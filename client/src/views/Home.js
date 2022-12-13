import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Button } from "@chakra-ui/react";
import HomeContainer from "../components/homeContainer";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getCurrentMonth } from "../redux/actions-stats";
import { useNavigate } from "react-router-dom";



const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const currentMonth = useSelector(state => state.current_month)

  const userLocal = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(userLocal && !user.length){
          dispatch(getEmployeeById(userLocal.SellerID))
        }},[dispatch, userLocal, user])

      useEffect(() => {
        if(user.length && Object.entries(currentMonth).length === 0){
          dispatch(getCurrentMonth(user[0].SellerID))
        }}, [dispatch, user, currentMonth])

      if(user.length){
        return(
          <>
            <SideBar user={user}/>
            <HomeContainer currentMonth={currentMonth}/>
          </>
        )
    }else return (
      <>
      Go to log in
      <Button onClick={()=>navigate('/login')}>Log in</Button>
      </>
    )
  }
 

export default Home