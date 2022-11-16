import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Box, Text } from "@chakra-ui/react";
import HomeContainer from "../components/homeContainer";
import InfoContainer from "../components/infoContainer";
import Stats from "../components/Stats";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById, getInvoicesBySeller } from "../redux/actions";


const Home = () => {

  const [site, setSite] = useState('home')
  const dispatch = useDispatch()
  const seller_invoices = useSelector(state => state.seller_invoices)
  const user = useSelector(state=>state.user)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  
  function handleSite(site){
    if(site === 'Home') return(<HomeContainer/>)
    if(site === 'Invoices') return(<InfoContainer seller_invoices={seller_invoices}/>)
    if(site === 'Stats') return (<Stats/>)
  }

  useEffect(()=>{
    if(user){
      if(Object.entries(user).length){
      dispatch(getInvoicesBySeller(user[0].SellerID))}
    }
  },[dispatch])

  useEffect(()=>{
      if(userLocal){
      dispatch(getEmployeeById(userLocal.SellerID))}
    },[])

    if(user) {
      if(user.length){
        return(
          <>
            <SideBar user={user} site={site} setSite={setSite}/>
            <Box>{handleSite(site)}</Box>
          </>
        )
    }else return (<Text>Loading </Text>)
  }}
 

export default Home