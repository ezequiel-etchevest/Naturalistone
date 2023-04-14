import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import HomeContainer from "../components/homeContainer";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { cleanStats } from './../redux/actions-stats'


const Home = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userLocal = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(userLocal && !user.length){
          dispatch(getEmployeeById(userLocal.SellerID))
        }
        return ()=>{
          dispatch(cleanStats())
        }},[dispatch, userLocal, user])

      if(user.length){
        return(
          <>
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            <HomeContainer user={user}/>
          </>
        )
  }}
 

export default Home