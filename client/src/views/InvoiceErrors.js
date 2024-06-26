import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/sideBar";
import InvoiceErrorContainer from '../components/invoiceError/invoiceErrorContainer'
import { getInvoiceErrorsFiltered } from "../redux/actions-invoiceErrors";
import { getSellers } from "../redux/actions-sellers";
import { getEmployeeById } from '../redux/actions-employees';
import { useLocation } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

const InvoiceError = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const invoice_errors = useSelector(state => state.invoice_errors)
  const user = useSelector(state => state.user)
  const sellers = useSelector(state => state.sellers)
  const location = useLocation();
  const queryString = location.search
  const url = new URLSearchParams(queryString);
  const getParamsSellerId = url.get('seller')
  const getParamsType = url.get('type')
  const getParamsNumber = url.get('number')
  const [filter, setFilter] = useState({
    user: user,
    sellerID: getParamsSellerId ? getParamsSellerId : '',
    type: getParamsType ? getParamsType : '',
    number: getParamsNumber ? getParamsNumber : ''
  })

  const userLocal = JSON.parse(localStorage.getItem('user'))
  
  useEffect(()=>{
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal?.SellerID))
    }})

  useEffect(() => {
    if(user.length && !invoice_errors.length){
      dispatch(getInvoiceErrorsFiltered(filter))
      // dispatch(getInvoiceErrors(user))
  }}, [dispatch, filter])

  useEffect(() => {
    if(!sellers.length){
      dispatch(getSellers())
  }}, [])

  if(user.length){
    return(
    <>
      <SideBar user={user} focus={focus} setFocus={setFocus}/>
      <InvoiceErrorContainer invoice_errors={invoice_errors} user={user} sellers={sellers} />
    </>
    )
  }else return(
    <Center  bg={'web.bg'} h={'92vh'}>
      <Spinner thickness={'4px'} ml={'0.5vw'} size={'xl'} color={'logo.orange'}/>
    </Center>
  )
}
 

export default InvoiceError