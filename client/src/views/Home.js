import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import HomeContainer from "../components/homeContainer";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getCurrentMonth } from "../redux/actions-stats";
import Redirect from "./RedirectPage";



const Home = ({focus, setFocus}) => {

  const dispatch = useDispatch()
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
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            <HomeContainer currentMonth={currentMonth}/>
          </>
        )
  }}
 

export default Home