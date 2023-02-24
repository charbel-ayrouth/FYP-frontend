import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DashHeader = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [open, setOpen] = useState(false)

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const logoutHandler = () => sendLogout()

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  return (
    <nav className='container relative p-6 mx-auto font-mono'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div className='text-2xl font-bold'>FYP</div>
        {/* Menu Items */}
        <div className='hidden space-x-6 md:flex'>
          <Link to={'/dash'}>Dashboard</Link>
          <Link onClick={logoutHandler}>Logout</Link>
        </div>
        {/* Hamburger Icon */}
        <button
          className='md:hidden'
          onClick={() => setOpen((prevState) => !prevState)}
        >
          Menu
        </button>
      </div>
      {/* Mobile Menu */}
      <div className='md:hidden'>
        <div
          className={`${
            open ? 'flex' : 'hidden'
          } absolute flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md`}
        >
          <Link to={'/dash'}>Dashboard</Link>
          <Link to={'/dash'}>Dashboard</Link>
          <Link to={'/dash'}>Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}

export default DashHeader
