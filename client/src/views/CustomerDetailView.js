import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Text, Center, Spinner} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {getEmployeeById } from "../redux/actions-employees";
import { getCustomerById } from '../redux/actions-customers';
import { useParams } from "react-router-dom";
import CustomerDetail from "../components/customers/customerDetail";


const CustomerDetailView = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const customer = useSelector(state => state.customer_by_id)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()

  useEffect(()=>{
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))
    }
    if(!Object.entries(customer).length) dispatch(getCustomerById(id))},
    [user])


  
    if(userLocal) {
      if(user.length){
        return(
          <>
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            {
              Object.entries(customer).length ? (

              <CustomerDetail user={userLocal} customer={customer}/>
              ) : (
              <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
               <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>)
            }
          </>
        )
      }else return (
        <Center  bg={'web.bg'} h={'92vh'}>
          <Spinner thickness={'4px'} ml={'0.5vw'} size={'xl'} color={'logo.orange'}/>
        </Center>
      )
  }}
 


export default CustomerDetailView