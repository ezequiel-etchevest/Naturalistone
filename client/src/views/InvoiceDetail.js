import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Center, Spinner } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoiceById, getInvoiceProducts } from '../redux/actions-invoices'
import {getEmployeeById } from "../redux/actions-employees";
import { getPayments } from "../redux/actions-payments";
import { getDeliveriesNotes } from "../redux/actions-deliveryNotes";
import { useParams } from "react-router-dom";
import Detail from '../components/invoices/invoiceDetail/detail';
import Redirect from "./RedirectPage";



const InvoiceDetail = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const invoice = useSelector(state=>state.invoice)
  const invoice_products = useSelector(state=> state.invoice_products)
  const deliveries = useSelector(state => state.deliveries_notes_by_id)
  const payments = useSelector(state => state.payments_by_id)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()

  useEffect(()=>{
      dispatch(getInvoiceById(id))
      dispatch(getPayments(id))
      dispatch(getInvoiceProducts(id))
      dispatch(getDeliveriesNotes(id))
    } 
      ,[])
      

  useEffect(()=>{
      if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))}
    },[user])

  if(userLocal){
    if(user) {
      if(user.length){
        return(
          <>
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            {
              invoice.length && Object.entries(payments).length && invoice_products && deliveries ? (
                <Detail 
                  invoice={invoice} 
                  invoice_products={invoice_products}
                  payments={payments}
                  user={ user[0]}
                  deliveries={deliveries}
                  />
                ):(
                <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
                  <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
                </Center>
                )
            }
          </>
        )
    } else{
     return (     
        <Center bg={'web.bg'} h={'92'}>
          <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
        </Center>)
        }  
      }
    }else{
      return(
        <>
        <Redirect/>
        </>
      )
    }
    }
 


export default InvoiceDetail