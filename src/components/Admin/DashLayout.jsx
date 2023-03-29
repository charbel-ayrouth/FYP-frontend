import React from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import DashHeader from './DashHeader'
import useAuth from '../../hooks/useAuth'
import DashFooter from './DashFooter'

const DashLayout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { email, role, id } = useAuth()

  const goHomeHandler = () => navigate('/admin')

  let goHomeButton = null
  if (pathname !== 'admin') {
    goHomeButton = (
      <button title='Home' onClick={goHomeHandler}>
        Home
      </button>
    )
  }

  return (
    <div className='flex h-screen flex-col'>
      <DashHeader />
      <div className='container mx-auto flex-grow'>
        <Outlet />
      </div>
      <DashFooter />
    </div>
  )
}

export default DashLayout
