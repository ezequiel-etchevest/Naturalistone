import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Center, Spinner } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderProducts, getOrdersByID, cleanOrderProducts } from "../redux/actions-orders"
import {getEmployeeById } from "../redux/actions-employees";
import ODetail from "../components/orders/orderDetail/ODetail";


const OrderDetail = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const order = useSelector(state=>state.order)
  const order_products = useSelector(state=>state.order_products)
  const userLocal = JSON.parse(localStorage.getItem('user'))

  const { id } = useParams()

  useEffect(()=>{
    if(!Object.entries(order).length || !order_products.length){
      dispatch(getOrdersByID(id))
      dispatch(cleanOrderProducts())
      dispatch(getOrderProducts(id))} 
     } ,[])
//ver dependencias del useEffect parea que se renderise correctamente.

  useEffect(()=>{
      if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))}
    },[user])

    if(user) {
      if(user.length){
        return(
          <>
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            {
              Object.entries(order).length ? (
                <ODetail 
                  order={order}
                  order_products={order_products} 
                  />
                ):(
                <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
                  <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
                </Center>
                )
            }
          </>
        )
    }else return (                
      <Center bg={'web.bg'} h={'92vh'}>
        <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
      </Center>
    )
  }}
 


export default OrderDetail