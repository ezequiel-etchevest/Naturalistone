import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import CustomersContainer from '../components/customers/customersContainer';
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getCustomers } from '../redux/actions-customers';
import Redirect from "./RedirectPage";
import { Text } from "@chakra-ui/react";



const Customers = ({focus, setFocus}) => {
  
  const dispatch = useDispatch()
  const customers = useSelector(state => state.customers)
  const user = useSelector(state => state.user)
  const [focusFilter, setFocusFilter] = useState('All')
  const userLocal = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))
    }})

  useEffect(() => {
    if(user.length && !customers.length){
      dispatch(getCustomers())
    }}, [dispatch, user])

  if(userLocal){
    if(user.length){
      return(
        <>
          <SideBar user={user} focus={focus} setFocus={setFocus}/>
          <CustomersContainer
            customers={customers} 
            user={user} 
            focusFilter={focusFilter} 
            setFocusFilter={setFocusFilter}/>
        </>)
        }else{
          <Text>HOla</Text>
        }      
  }else return (
    <>
      <Redirect/>
    </>
    )
  }
 

export default Customers