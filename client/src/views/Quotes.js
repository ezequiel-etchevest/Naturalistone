import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Button } from "@chakra-ui/react";
import InfoContainer from "../components/invoices/infoContainer";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from '../redux/actions-employees';
import { getInvoicesBySeller } from '../redux/actions-invoices';
import { Link} from "react-router-dom";



const Quotes = () => {

  const dispatch = useDispatch()
  const seller_invoices = useSelector(state => state.seller_invoices)
  const user = useSelector(state => state.user)
  const [focus, setFocus] = useState('AllInvoices')
  const userLocal = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(userLocal && !user.length){
          dispatch(getEmployeeById(userLocal.SellerID))
        }})

      useEffect(() => {
        if(user.length && !seller_invoices.length){
          dispatch(getInvoicesBySeller(user[0].SellerID))
      }}, [dispatch, user])

 //saque dependencia del useEffect seller_invoices para solucionar problema si no hay invoices.

      if(user.length){
        return(
          <>
            <SideBar user={user}/>
            <InfoContainer 
              seller_invoices={seller_invoices} 
              userId={user[0].SellerID} 
              focus={focus} 
              setFocus={setFocus}/>
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