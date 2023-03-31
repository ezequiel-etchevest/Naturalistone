import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import InfoContainer from "../components/invoices/infoContainer";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getInvoicesBySeller, getSellerValues } from '../redux/actions-invoices';
import Redirect from "./RedirectPage";
import { Text } from "@chakra-ui/react";



const Quotes = ({focus, setFocus}) => {
  
  const dispatch = useDispatch()
  const seller_invoices = useSelector(state => state.seller_invoices)
  const user = useSelector(state => state.user)
  const [focusFilter, setFocusFilter] = useState('All')
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const seller_values = useSelector(state => state.seller_values)

    useEffect(()=>{
        if(seller_values === undefined) dispatch(getSellerValues())
        if(userLocal && !user.length){
          dispatch(getEmployeeById(userLocal.SellerID))
        }})

      useEffect(() => {
        if(user.length && !seller_invoices.length){
          dispatch(getInvoicesBySeller(user[0].SellerID, {
            inputName: '',
            inputNumber: '',
            selectSeller: '',
            timeFilter: 'All'
          }))
      }}, [dispatch, user])

      useEffect(() => {
          dispatch(getInvoicesBySeller(user[0].SellerID, {
            inputName: '',
            inputNumber: '',
            selectSeller: '',
            timeFilter: 'All'
          }))
      }, [])

      if(userLocal){
        if(user.length){
          return(
            <>
              <SideBar user={user} focus={focus} setFocus={setFocus}/>
              <InfoContainer
                seller_values={seller_values}
                seller_invoices={seller_invoices} 
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
 

export default Quotes