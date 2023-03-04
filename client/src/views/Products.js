import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Center, Spinner, Text, Box } from "@chakra-ui/react";
import ProductsContainer from "../components/products/productsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getFiltered } from '../redux/actions-products';
import { getEmployeeById } from "../redux/actions-employees";


const Products = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const allProducts = useSelector(state => state.all_products)
  const values = useSelector(state => state.product_values)
  const userLocal = JSON.parse(localStorage.getItem('user'))


  useEffect(()=>{
      if(userLocal && !user.length){
        dispatch(getEmployeeById(userLocal.SellerID))
      }},[dispatch, userLocal, user])

    useEffect(()=>{
        if(!allProducts?.length ) dispatch(getFiltered('','','','','',''))
        },[allProducts])
         
      if(user.length && values && allProducts){
        return(
          <>
            <SideBar user={user}/>
            <ProductsContainer allProducts={allProducts} user={user} values={values}/>
          </>
        )
    }else return (
      <Center  bg={'web.bg'} h={'92vh'}>
        <Spinner thickness={'4px'} ml={'0.5vw'} size={'xl'} color={'logo.orange'}/>
      </Center>
    )
  }
 

export default Products