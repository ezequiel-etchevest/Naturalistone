import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";


const Home = () => {

  const user = useSelector(state => state.user)

  return(
    <>
    { user.length ? <SideBar user={user}/> : <Text>Loading...</Text> }
    </>
  )
}

export default Home