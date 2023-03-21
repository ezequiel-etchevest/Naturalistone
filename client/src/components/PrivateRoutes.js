import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {

  const userLocal = JSON.parse(localStorage.getItem('user'))
  const user = useSelector(state => state.user)
  
 
  let isAuthenticated = (user) => {
    let val = () => {
      if ((user)) return true
      else return false
    }
    return val()
    }
  if (isAuthenticated(userLocal)) {
    return children
  }
  return (<Navigate to="/redirect" />)
}