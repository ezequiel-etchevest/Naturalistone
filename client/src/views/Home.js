import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Box, Text } from "@chakra-ui/react";
import HomeContainer from "../components/homeContainer";
import InfoContainer from "../components/invoices/infoContainer";
import ProductsContainer from "../components/products/productsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getEmployeeById, getInvoicesBySeller, getCurrentMonth } from "../redux/actions";
import { useNavigate } from "react-router-dom";


const Home = ({site, setSite}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const seller_invoices = useSelector(state => state.seller_invoices)
  const user = useSelector(state => state.user)
  const allProducts = useSelector(state => state.allProducts)
  const currentMonth = useSelector(state => state.current_month)
  const [focus, setFocus] = useState('AllInvoices')

  const userLocal = JSON.parse(localStorage.getItem('user'))
    
    useEffect(()=>{
        if(userLocal && !user.length){
          dispatch(getEmployeeById(userLocal.SellerID))
        }
        if(!allProducts.length){
          dispatch(getAllProducts())
        }},[])

      useEffect(() => {
        if(user.length && Object.entries(currentMonth) == 0){
          dispatch(getCurrentMonth(user[0].SellerID))
        }
        if(user.length && !seller_invoices.length){
          dispatch(getInvoicesBySeller(user[0].SellerID))
      }}, [user])

    function handleSite(site){
      if(site === 'Home') return(<HomeContainer currentMonth={currentMonth}/>)
      if(site === 'Products') return(<ProductsContainer allProducts={allProducts}/>)
      if(site === 'Invoices') return(<InfoContainer site={site} setSite={setSite} seller_invoices={seller_invoices} userId={user[0].SellerID} focus={focus} setFocus={setFocus}/>)
    }

      if(user.length){
        return(
          <>
            <SideBar user={user} site={site} setSite={setSite}/>
            <Box>{handleSite(site)}</Box>
          </>
        )
    }else return (navigate('/login'))
  }
 

export default Home