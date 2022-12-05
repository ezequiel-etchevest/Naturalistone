import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {getEmployeeById } from "../redux/actions-employees";
import { getProductById } from '../redux/actions-products';
import { useParams } from "react-router-dom";



const ProductDetail = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const product = useSelector(state => state.product_by_id)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()

  useEffect(() => {
      dispatch(getProductById(id))
      },[])

  useEffect(() => {
      if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))}
    },[user])

    if(user) {
      if(user.length){
        return(
          <>
            <SideBar user={user}/>
            {
              product.length ? (
               <Text>Product</Text>
                ):(
                <Text> Loading... </Text>
                )
            }
          </>
        )
    }else return (<Text>Loading </Text>)
  }}
 


export default ProductDetail