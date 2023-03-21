import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {

  const userLocal = JSON.parse(localStorage.getItem('user'))
  const user = useSelector(state => state.user)
  
 
  let isAuthenticated = (user) => {
    let val = (user) => {
      if ((user)) return true
      else return false
    }
    return val(user)
    }

    useEffect(()=>{},[user])
    if(userLocal){
      console.log('userLocal')
      if(user.length){
      console.log('user.length')
        if(isAuthenticated(user)) return (children)
        else {
          console.log('isAuthenticated')
          return navigate('/redirect')}
      }
      return(
        <Center  bg={'web.bg'} h={'full'} w={'full'}>
          <Spinner thickness={'4px'} ml={'0.5vw'} size={'xl'} color={'logo.orange'}/>
        </Center>
      )}else return <Navigate to='/redirect'/>
          
      }


