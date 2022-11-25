import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Box, Button } from "@chakra-ui/react";
import HomeContainer from "../components/homeContainer";
import InfoContainer from "../components/invoices/infoContainer";
import ProductsContainer from "../components/products/productsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../redux/actions-products';
import { getEmployeeById } from '../redux/actions-employees';
import { getInvoicesBySeller } from '../redux/actions-invoices';
import { getCurrentMonth } from "../redux/actions-stats";
import { useNavigate } from "react-router-dom";



const Home = ({site, setSite}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const seller_invoices = useSelector(state => state.seller_invoices)
  const user = useSelector(state => state.user)
  const allProducts = useSelector(state => state.all_products)
  const currentMonth = useSelector(state => state.current_month)
  const [focus, setFocus] = useState('AllInvoices')

  const userLocal = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(userLocal && !user.length){
          dispatch(getEmployeeById(userLocal.SellerID))
        }
        if(!allProducts.length){
          dispatch(getAllProducts())
        }},[allProducts, dispatch, userLocal, user])

      useEffect(() => {
        if(user.length && Object.entries(currentMonth) === 0){
          dispatch(getCurrentMonth(user[0].SellerID))
        }
        if(user.length && !seller_invoices.length){
          dispatch(getInvoicesBySeller(user[0].SellerID))
      }}, [dispatch, user, seller_invoices, currentMonth])

    function handleSite(site){
      if(site === 'Home') return(<HomeContainer currentMonth={currentMonth}/>)
      if(site === 'Products') return(<ProductsContainer allProducts={allProducts}/>)
      if(site === 'Quotes') return(<InfoContainer site={site} setSite={setSite} seller_invoices={seller_invoices} userId={user[0].SellerID} focus={focus} setFocus={setFocus}/>)
    }

      if(user.length){
        return(
          <>
            <SideBar user={user} site={site} setSite={setSite}/>
            <Box>{handleSite(site)}</Box>
          </>
        )
    }else return (
      <>
      Go to log in
      <Button onClick={()=>navigate('/login')}>Log in</Button>
      </>
    )
  }
 

export default Home