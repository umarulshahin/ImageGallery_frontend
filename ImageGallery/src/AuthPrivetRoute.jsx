import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const AuthPrivetRoute = ({children}) => {
  const token = Cookies.get('UserCookie')
  return token ? <Navigate to="/home" /> : children;
}

export default AuthPrivetRoute