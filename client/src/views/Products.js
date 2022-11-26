import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Button } from "@chakra-ui/react";
import ProductsContainer from "../components/products/productsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../redux/actions-products';
import { getEmployeeById } from "../redux/actions-employees";


const Products = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const allProducts = useSelector(state => state.all_products)
  const userLocal = JSON.parse(localStorage.getItem('user'))


  useEffect(()=>{
      if(userLocal && !user.length){
        dispatch(getEmployeeById(userLocal.SellerID))
      }},[dispatch, userLocal, user])

    useEffect(()=>{
        if(!allProducts.length){
          dispatch(getAllProducts())
        }},[allProducts])
         
      if(user.length){
        return(
          <>
            <SideBar user={user}/>
            <ProductsContainer allProducts={allProducts}/>
          </>
        )
    }else return (
      <>
      Go to log in
      <Button>Log in</Button>
      </>
    )
  }
 

export default Products