import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import React from 'react'

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { role } = useAuth()
  let content

  if (!role) {
    content = <Navigate to={'/login'} state={{ from: location }} replace />
  } else {
    if (allowedRoles.includes(role)) {
      content = <Outlet />
    } else {
      content = <Navigate to={'/401'} state={{ from: location }} replace />
    }
  }

  return content
}

export default RequireAuth
