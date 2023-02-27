import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'
import React from 'react'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)

  if (token) {
    const decoded = jwtDecode(token)
    const { email, role } = decoded.UserInfo

    return { email, role }
  }

  return { email: '', role: '' }
}

export default useAuth
