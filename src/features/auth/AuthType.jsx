import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useLocation, Navigate } from 'react-router-dom'
import { ROLES } from '../../config/roles.js'

const AuthType = () => {
  const location = useLocation()
  const { role } = useAuth()
  let content

  if (role) {
    if (role === ROLES.Admin) {
      content = <Navigate to={'/admin'} state={{ from: location }} replace />
    } else if (role === ROLES.Supervisor) {
      content = (
        <Navigate to={'/supervisor'} state={{ from: location }} replace />
      )
    } else if (role === ROLES.Student) {
      content = <Navigate to={'/student'} state={{ from: location }} replace />
    }
  } else content = <Navigate to={'/login'} state={{ from: location }} replace />
  return content
}

export default AuthType
