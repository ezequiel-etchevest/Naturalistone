import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import CustomersContainer from '../components/customers/customersContainer';
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getCustomers, getCustomersByFilter } from '../redux/actions-customers';
import Redirect from "./RedirectPage";
import { Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { filterCustomer } from "../utils/customerFilters";

const Customers = ({focus, setFocus}) => {
  
  const dispatch = useDispatch()
  const customers = useSelector(state => state.customers)
  // const customer_filters = useSelector(state => state.customer_filters)
  const user = useSelector(state => state.user)
  const [focusFilter, setFocusFilter] = useState('All')
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const location = useLocation();
  const queryString = location.search
  const url = new URLSearchParams(queryString);
  const getParamsCustomer = url.get('customer')
  const [customerFilters, setCustomerFilters] = useState('');

  useEffect(()=>{
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))
    }})

  useEffect(() => {
    if(user.length && customers.length === 0){
      dispatch(getCustomers(''))
    }}, [dispatch, user, customers])

    useEffect(() => {
      setCustomerFilters(getParamsCustomer ? filterCustomer(customers, getParamsCustomer) : customers)
    },[customers])

  useEffect(() => {
    return () => {
      dispatch(getCustomers(''))
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
            customerFilters={customerFilters}
            setCustomerFilters={setCustomerFilters}
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