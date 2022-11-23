import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoiceById } from '../redux/actions-invoices'
import {getEmployeeById } from "../redux/actions-employees";
import { useParams } from "react-router-dom";
import Detail from '../components/invoices/detail';



const InvoiceDetail = ({site, setSite}) => {

  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const invoice = useSelector(state=>state.invoice)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()

  useEffect(()=>{
      if(!invoice.length) dispatch(getInvoiceById(id))} 
      ,[])

  useEffect(()=>{
      if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))}
    },[user])

    if(user) {
      if(user.length){
        return(
          <>
            <SideBar user={user} site={site} setSite={setSite}/>
            {
              invoice.length ? (
                <Detail invoice={invoice}/>
                ):(
                <Text> Loading... </Text>
                )
            }
          </>
        )
    }else return (<Text>Loading </Text>)
  }}
 


export default InvoiceDetail