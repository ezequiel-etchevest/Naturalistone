import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Center, Spinner} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {getEmployeeById } from "../redux/actions-employees";
import { useParams } from "react-router-dom";
import FreightDetails from "../components/freights/freightDetail";
import { getFreightOrders, getFreightId } from "../redux/actions-freights";


const FreightDetailView = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const freight = useSelector(state => state.freight)
  const freights_factory = useSelector(state => state.freights_factory)
  const userLocal = JSON.parse(localStorage.getItem('user'))

  const { freightRef } = useParams()

  useEffect(()=>{
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))
    }
  },[user])

  useEffect(() => {
    if(!Object.entries(freight).length || !freights_factory.length){
      dispatch(getFreightId(freightRef))
      dispatch(getFreightOrders(freightRef))
    } 
  }, [])
  
  if(userLocal) {
    if(user.length){
      return(
        <>
          <SideBar user={user} focus={focus} setFocus={setFocus}/>
          {
            Object.entries(freight).length ? (
              <FreightDetails user={userLocal} freight={freight} freights_factory={freights_factory} />
              ) : (
              <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
               <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>)
            }
          </>
        )
      }else return (
        <Center  bg={'web.bg'} h={'92vh'}>
          <Spinner thickness={'4px'} ml={'0.5vw'} size={'xl'} color={'logo.orange'}/>
        </Center>
      )
  }}
 


export default FreightDetailView