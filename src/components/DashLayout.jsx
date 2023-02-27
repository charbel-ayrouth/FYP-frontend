import React from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import DashHeader from './DashHeader'
import Header from './Header'
import useAuth from '../hooks/useAuth'

const DashLayout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { email, role } = useAuth()

  const goHomeHandler = () => navigate('/dash')

  let goHomeButton = null
  if (pathname !== 'dash') {
    goHomeButton = (
      <button title='Home' onClick={goHomeHandler}>
        Home
      </button>
    )
  }

  return (
    <>
      <DashHeader />
      <Header />
      <div className='container mx-auto'>
        <nav className='mb-12 mt-6'>
          <Link to={'/dash'}>Dashboard</Link>
        </nav>

        <Outlet />
        <footer className='mt-12'>
          {goHomeButton}
          <p>Current User: {email}</p>
          <p>Status: {role}</p>
        </footer>
      </div>
    </>
  )
}

export default DashLayout
