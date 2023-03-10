import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'

const AuthType = () => {
  const location = useLocation()
  const { role } = useAuth()
  let content

  if (role) {
    if (role === 'Admin') {
      content = <Navigate to={'/admin'} state={{ from: location }} replace />
    } else if (role === 'Supervisor') {
      content = (
        <Navigate to={'/supervisor'} state={{ from: location }} replace />
      )
    } else content = console.log('Student')
  } else content = <Navigate to={'/login'} state={{ from: location }} replace />
  return content
}

export default AuthType
