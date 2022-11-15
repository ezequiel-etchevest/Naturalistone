import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Box, Text } from "@chakra-ui/react";
import HomeContainer from "../components/homeContainer";
import InfoContainer from "../components/infoContainer";
import Stats from "../components/Stats";
import { useDispatch, useSelector } from "react-redux";
import { getInvoicesBySeller } from "../redux/actions";


const Home = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  const [site, setSite] = useState('home')
  const dispatch = useDispatch()
  const seller_invoices = useSelector(state => state.seller_invoices)

  function handleSite(site){
    if(site === 'Home') return(<HomeContainer/>)
    if(site === 'Invoices') return(<InfoContainer seller_invoices={seller_invoices}/>)
    if(site === 'Stats') return (<Stats/>)
  }
  console.log(seller_invoices)
  useEffect(()=>{
    if(seller_invoices.length < 0){
    dispatch(getInvoicesBySeller(user.SellerID))}
  },[seller_invoices])

  return(
    <>
    { !Object.entries(user).length ? (
    <>
    <Text>Loading...</Text> 
    </>
    ) : (
    <>
    <SideBar user={user} site={site} setSite={setSite}/>
    <Box>{handleSite(site)}</Box>
    </>
    )}
    </>
  )
}

export default Home