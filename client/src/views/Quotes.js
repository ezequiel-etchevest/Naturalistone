import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import InfoContainer from "../components/invoices/infoContainer";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getCustomers, getCustomersByFilter } from '../redux/actions-customers';
import { getInvoicesBySeller, getSellerValues } from '../redux/actions-invoices';
import Redirect from "./RedirectPage";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getSellers } from "../redux/actions-sellers";



const Quotes = ({focus, setFocus}) => {
  
  const dispatch = useDispatch()
  const seller_invoices = useSelector(state => state.seller_invoices)
  const user = useSelector(state => state.user)
  const sellers = useSelector(state => state.sellers)
  const seller_values = useSelector(state => state.seller_values)
  const customers = useSelector(state => state.customers)
  const location = useLocation()
  const queryString = location.search;
  const url = new URLSearchParams(queryString)
  const getParamsTimeFilter = url.get('timeFilter')
  const getParamsSeller = url.get('seller')
  const getParamsName = url.get('name')
  const getParamsNumber = url.get('number')
  const [customersFilter, setCustomersFilter] = useState(customers);

  const [focusFilter, setFocusFilter] = useState('All')
  const userLocal = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(seller_values === undefined || seller_values.length === 0) dispatch(getSellerValues())
        if(userLocal && !user.length){
          dispatch(getEmployeeById(userLocal.SellerID))
        }
        if(!sellers.length){
          dispatch(getSellers())
        }})

      useEffect(() => {
        if(user.length && !seller_invoices.length){
          dispatch(getInvoicesBySeller(user[0].SellerID, {
            inputName: getParamsName ? getParamsName : '',
            inputNumber: getParamsNumber ? getParamsNumber : '',
            selectSeller: getParamsSeller ? getParamsSeller : '',
            timeFilter: getParamsTimeFilter ? getParamsTimeFilter : 'All'
          }))
        }
        if(user.length && !customers.length){
          dispatch(getCustomers('',''))
          dispatch(getCustomersByFilter(customers, ''))
        }
    }, [dispatch, user])

    useEffect(() => {
      setCustomersFilter(customers)
    },[customers])

  useEffect(() => {
    return () => {
      dispatch(getCustomers(''))
      dispatch(getCustomersByFilter(customers, getParamsName ? getParamsName : ''))
      }
    },[])
  
      if(userLocal){
        if(user.length){
          return(
            <>
              <SideBar user={user} focus={focus} setFocus={setFocus}/>
              <InfoContainer
                seller_values={seller_values}
                seller_invoices={seller_invoices} 
                user={user} 
                sellers={sellers} 
                focusFilter={focusFilter} 
                setFocusFilter={setFocusFilter}
                customers={customers}
                setCustomersFilter={setCustomersFilter}
                customersFilter={customersFilter}
                />
                
            </>)
        } else return (
          <>
            <Center bg={'web.bg'} h={'80vh'}>
              <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
            </Center>
          </>
        )
    } else return (
      <>
        <Redirect/>
      </>
    )
  }
 

export default Quotes