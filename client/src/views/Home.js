import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { useSelector } from "react-redux";
import { Box, Text } from "@chakra-ui/react";
import HomeContainer from "../components/homeContainer";
import InfoContainer from "../components/infoContainer";
import Stats from "../components/Stats";


const Home = () => {

  const user = useSelector(state => state.user)
  const [site, setSite] = useState('home')
  
  function handleSite(site){
    if(site === 'Home') return(<HomeContainer/>)
    if(site === 'Invoices') return(<InfoContainer/>)
    if(site === 'Stats') return (<Stats/>)
  }

  return(
    <>
    { user.length ? (
      <>
    <SideBar user={user} site={site} setSite={setSite}/>
    <Box>{handleSite(site)}</Box>
      </>
    ) : <Text>Loading...</Text> }
    </>
  )
}

export default Home