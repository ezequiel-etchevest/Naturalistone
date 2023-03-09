import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Button } from "@chakra-ui/react";
import InfoContainer from "../components/invoices/infoContainer";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getInvoicesBySeller, getSellerValues } from '../redux/actions-invoices';
import { Link} from "react-router-dom";


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

 //saque dependencia del useEffect seller_invoices para solucionar problema si no hay invoices.

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
 

export default Quotes