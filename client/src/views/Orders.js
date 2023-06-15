import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/sideBar";
import OrdersContainer from "../components/orders/OrdersContainer";
import { getOrders } from "../redux/actions-orders";
import { getEmployeeById } from '../redux/actions-employees';

const Orders = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders)
  const user = useSelector(state => state.user)
 
  const userLocal = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
      if(userLocal && !user.length){
        dispatch(getEmployeeById(userLocal.SellerID))
      }})

  useEffect(() => {
    dispatch(getOrders())
  }, [])

      if(user.length){
        return(
          <>
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            <OrdersContainer orders={orders}/>
          </>
        )
    }
  }
 

export default Orders