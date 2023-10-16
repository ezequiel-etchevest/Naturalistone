import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Center, Spinner} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {getEmployeeById } from "../redux/actions-employees";
import { cleanCustomerDetail, cleanCustomerRelationship, getCustomerById, getCustomerRelationship } from '../redux/actions-customers';
import { useParams } from "react-router-dom";
import CustomerDetail from "../components/customers/customerDetail/customerDetail";
import { getCustomerProjects } from "../redux/actions-projects";
import { getCustomerInvoices } from "../redux/actions-customers";


const CustomerDetailView = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const customer = useSelector(state => state.customer_by_id)
  const projects_by_customer_id = useSelector(state => state.projects_by_customer_id)
  const project_invoices = useSelector(state => state.project_invoices)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()
  const customer_relationship = useSelector(state => state.customer_relationship)

  
  useEffect(() => {
    if (typeof customer_relationship === 'string') dispatch(getCustomerRelationship(id))
  },[customer_relationship])

  useEffect(()=>{
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))
    }
    if(!Object.entries(customer).length) dispatch(getCustomerById(id))
    if(!Object.entries(projects_by_customer_id).length) dispatch(getCustomerProjects(id))
    if(!project_invoices) dispatch(getCustomerInvoices(id))},
    [ user, projects_by_customer_id, customer])

  useEffect(()=> {
    return()=>{
    dispatch(cleanCustomerDetail())
    dispatch(cleanCustomerRelationship()); 
  };
  },[])
  
  useEffect(() => {
  },[customer])

  if(userLocal) {
    if(user.length){
      return(
        <>
          <SideBar user={user} focus={focus} setFocus={setFocus}/>
          {
            Object.entries(customer).length && Object.entries(projects_by_customer_id).length && typeof customer_relationship !== 'string' ? (
              <CustomerDetail user={userLocal} customer={customer} customer_relationship={customer_relationship} projects_by_customer_id={projects_by_customer_id} />
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