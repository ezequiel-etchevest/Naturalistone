import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/sideBar";
import InvoiceErrorContainer from '../components/invoiceError/invoiceErrorContainer'
import Redirect from "./RedirectPage";
import { getInvoiceErrors } from "../redux/actions-invoiceErrors";
import { getSellers } from "../redux/actions-sellers";
import { getEmployeeById } from '../redux/actions-employees';

const InvoiceError = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const invoice_errors = useSelector(state => state.invoice_errors)
  const invoice_errors_by_filter = useSelector(state => state.invoice_errors_by_filter)
  const user = useSelector(state => state.user)
  const sellers = useSelector(state => state.sellers)
  
  const userLocal = JSON.parse(localStorage.getItem('user'))
  

  useEffect(()=>{
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))
    }})

  useEffect(() => {
    if(user.length && !invoice_errors.length){
      dispatch(getInvoiceErrors(user))
  }}, [dispatch, user])

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
  }else return (
    <>
      <Redirect/>
    </>
  )
}
 

export default InvoiceError