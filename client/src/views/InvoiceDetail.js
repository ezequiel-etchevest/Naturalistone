import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoiceById } from '../redux/actions-invoices'
import {getEmployeeById } from "../redux/actions-employees";
import { getPayments } from "../redux/actions-payments";
import { useParams } from "react-router-dom";
import Detail from '../components/invoices/detail';



const InvoiceDetail = () => {

  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const invoice = useSelector(state=>state.invoice)
  const payments = useSelector(state => state.payments_by_id)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()

  useEffect(()=>{
      dispatch(getInvoiceById(id))
      dispatch(getPayments(id))} 
      ,[])

  useEffect(()=>{
      if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))}
    },[user])

    if(user) {
      if(user.length){
        return(
          <>
            <SideBar user={user}/>
            {
              invoice.length ? (
                <Detail payments={payments} invoice={invoice}/>
                ):(
                <Text> Loading... </Text>
                )
            }
          </>
        )
    }else return (<Text>Loading </Text>)
  }}
 


export default InvoiceDetail