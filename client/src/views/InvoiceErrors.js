import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/sideBar";
import InvoiceErrorsContainer from '../components/invoiceErrors/invoiceErrorsContainer'
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getInvoiceErrors } from "../redux/actions-invoiceErrors";
import { getSellers } from "../redux/actions-sellers";
import { getEmployeeById } from '../redux/actions-employees';

const InvoiceErrors = ({focus, setFocus}) => {

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
      dispatch(getInvoiceErrors(user[0].SellerID))
  }}, [dispatch, user])

  useEffect(() => {
    if(!sellers.length){
      dispatch(getSellers())
  }}, [])



  if(user.length){
    return(
    <>
      <SideBar user={user} focus={focus} setFocus={setFocus}/>
      <InvoiceErrorsContainer invoice_errors={invoice_errors} user={user} sellers={sellers} invoice_errors_by_filter={invoice_errors_by_filter} />
    </>
    )
  }else return (
    <>
    Go to log in
      <Link to={'/login'}>
        <Button>Log in</Button>
      </Link>
    </>
  )
}
 

export default InvoiceErrors