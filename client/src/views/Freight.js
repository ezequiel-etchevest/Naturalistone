import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/sideBar";
import FreightsContainer from '../components/freights/freightsContainer';
import { getFreight } from '../redux/actions-freights';

const Freights = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const freights = useSelector(state => state.freights)
 
  const userLocal = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
      if(userLocal && !user.length){
        // dispatch(getEmployeeById(userLocal.SellerID))
      }})

  useEffect(() => {
    dispatch(getFreight())
  }, [])

      if(user.length){
        return(
          <>
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            <FreightsContainer freights={freights}/>
          </>
        )
    }
  }
 

export default Freights