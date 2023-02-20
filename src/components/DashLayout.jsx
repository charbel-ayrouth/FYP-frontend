import React from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import DashHeader from './DashHeader'

const DashLayout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
      <header>
        <nav>
          <Link to={'/dash'}>Dashboard</Link>
        </nav>
      </header>
      <Outlet />
      <footer>
        {goHomeButton}
        <p>Current User:</p>
        <p>Status:</p>
      </footer>
    </>
  )
}

export default DashLayout
