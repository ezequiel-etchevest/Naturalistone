import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import CustomersContainer from '../components/customers/customersContainer';
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getCustomers, getCustomersByFilter } from '../redux/actions-customers';
import Redirect from "./RedirectPage";
import { Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Customers = ({focus, setFocus}) => {
  
  const dispatch = useDispatch()
  const customers = useSelector(state => state.customers)
  const customer_filters = useSelector(state => state.customer_filters)
  const user = useSelector(state => state.user)
  const [focusFilter, setFocusFilter] = useState('All')
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const location = useLocation();
  const queryString = location.search
  const url = new URLSearchParams(queryString);
  const getParamsCustomer = url.get('customer')

  useEffect(()=>{
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))
    }})

  useEffect(() => {
    if(user.length && customers.length === 0 && customer_filters.length === 0){
      dispatch(getCustomers(''))
      dispatch(getCustomersByFilter(customers, ''))
    }}, [dispatch, user, customer_filters, customers])

  useEffect(() => {
    return () => {
      dispatch(getCustomers(''))
      dispatch(getCustomersByFilter(customers, getParamsCustomer ? getParamsCustomer : ''))
      }
    },[])
  

  if(userLocal){
    if(user.length){
      return(
        <>
          <SideBar user={user} focus={focus} setFocus={setFocus}/>
          <CustomersContainer
            customers={customers} 
            user={user} 
            focusFilter={focusFilter} 
            setFocusFilter={setFocusFilter}
            customer_filters={customer_filters}
            />
        </>)
        }
      }else return (
        <>
          <Redirect/>
        </>
    )
  }
 

export default Customers