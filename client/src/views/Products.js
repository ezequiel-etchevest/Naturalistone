import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Center, Spinner } from "@chakra-ui/react";
import ProductsContainer from "../components/products/productsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getFiltered, getProductImage } from '../redux/actions-products';
import { getEmployeeById } from "../redux/actions-employees";
import Redirect from "./RedirectPage";
import { useLocation } from "react-router-dom";


const Products = ({focus, setFocus}) => {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const allProducts = useSelector(state => state.all_products)
  const values = useSelector(state => state.product_values)
  const product_image = useSelector(state => state.product_image)
  const userLocal = JSON.parse(localStorage.getItem('user'))

  const location = useLocation();
  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const getParamsFinish = searchParams.get('finish')
  const getParamsSize = searchParams.get('size')
  const getParamsThickness = searchParams.get('thickness')
  const getParamsMaterial = searchParams.get('material')
  const getParamsSearch = searchParams.get('search')

  const [filters, setFilters] = useState({
    finish: getParamsFinish ? getParamsFinish : '',
    size: getParamsSize ? getParamsSize : '',
    thickness: getParamsThickness ? getParamsThickness : '',
    material: getParamsMaterial ? getParamsMaterial: '',
    search: getParamsSearch ? getParamsSearch : '',
    price: [values?.priceMaxmin?.min === null ? 0 : values?.priceMaxmin?.min, values?.priceMaxmin?.max]
  })
  console.log({product_image})
  useEffect(()=>{
      if(userLocal && !user.length){
        dispatch(getEmployeeById(userLocal.SellerID))
        dispatch(getProductImage())
      }},[dispatch, userLocal, user])

    useEffect(()=>{
        if(!allProducts?.length ) dispatch(
          getFiltered(
            filters.finish,
            filters.size,
            filters.thickness,
            filters.material,
            filters.search,
            filters.price,
            filters.price
            ))
        },[allProducts, values, filters])

    if(user){
      if(user.length && values && allProducts){
        return(
          <>
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            <ProductsContainer allProducts={allProducts} user={user} values={values}/>
          </>
        )
    }else return (
      <Center  bg={'web.bg'} h={'92vh'}>
        <Spinner thickness={'4px'} ml={'0.5vw'} size={'xl'} color={'logo.orange'}/>
      </Center>
    )
    }else{
      return(
        <Redirect/>
      )
    }
      
  }
 

export default Products