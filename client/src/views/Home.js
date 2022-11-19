import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Box, Text } from "@chakra-ui/react";
import HomeContainer from "../components/homeContainer";
import InfoContainer from "../components/infoContainer";
import Stats from "../components/Stats";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById, getInvoicesBySeller } from "../redux/actions";


const Home = ({site, setSite}) => {

 
  const dispatch = useDispatch()
  const seller_invoices = useSelector(state => state.seller_invoices)

  const user = useSelector(state=>state.user)
  const userLocal = JSON.parse(localStorage.getItem('user'))
    
    useEffect(()=>{
        if(userLocal && !user.length){
        dispatch(getEmployeeById(userLocal.SellerID))}
      },[])
      
    useEffect(()=>{
      if(user.length && !seller_invoices.length){
      dispatch(getInvoicesBySeller(user[0].SellerID))
    }
  },[user])

    function handleSite(site){
      if(site === 'Home') return(<HomeContainer/>)
      if(site === 'Invoices') return(<InfoContainer site={site} setSite={setSite} seller_invoices={seller_invoices} userId={user[0].SellerID}/>)
      if(site === 'Stats') return (<Stats/>)
    }

      if(user.length){
        console.log('home user', user[0].SellerID)
        return(
          <>
            <SideBar user={user} site={site} setSite={setSite}/>
            <Box>{handleSite(site)}</Box>
          </>
        )
    }else return (<Text>Loading </Text>)
  }
 

export default Home