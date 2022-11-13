import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { useSelector } from "react-redux";

const Home = () => {

  const user = useSelector(state=>state?.user)
  
  const saveData = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  }
  useEffect(()=>{
    saveData(user)
  })

  return(
      <>
        <SideBar/>
      </>
  )
}

export default Home