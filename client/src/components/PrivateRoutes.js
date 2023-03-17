import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {

  const userLocal = JSON.parse(localStorage.getItem('user'))
  const user = useSelector(state => state.user)
  
  let isAuthenticated = (userLocal) => {
    let val = () => {
      if ((userLocal)) return true
      else return false
    }
    return val()
    }
  if (isAuthenticated(user)) {
    return children
  }
  return (<Navigate to="/redirect" />)
}