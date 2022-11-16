import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Box, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoicesBySeller, getEmployeeById } from "../redux/actions";



const InvoiceDetail = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const [site, setSite] = useState('home')

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
            <Box></Box>
          </>
        )
    }else return (<Text>Loading </Text>)
  }}
 


export default InvoiceDetail