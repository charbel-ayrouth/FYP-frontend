import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

const DashHeader = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
    if (screenWidth > 767) setOpen(false)

    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [isSuccess, navigate, screenWidth])

  const logoutHandler = () => sendLogout()

  return (
    <>
      {isError && <p>{error?.data?.message}</p>}
      {isLoading && <p>loading...</p>}
      <nav className='relative mb-16 border border-gray-200 bg-white shadow-md'>
        <div className='container mx-auto py-4 lg:px-6'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='text-2xl font-bold text-primary'>FYP</div>
            {/* Menu Items */}
            <div className='hidden space-x-6 font-heading font-semibold md:flex'>
              <Link
                to={'/admin'}
                className='transform transition-colors duration-300 hover:text-primary'
              >
                Dashboard
              </Link>
              <Link
                to={'/admin/users'}
                className='transform transition-colors duration-300 hover:text-primary'
              >
                Users
              </Link>
              <Link
                to={'/admin/topics'}
                className='transform transition-colors duration-300 hover:text-primary'
              >
                Topics
              </Link>
              <Link
                to={'/admin/domains'}
                className='transform transition-colors duration-300 hover:text-primary'
              >
                Domains
              </Link>
              <Link
                onClick={logoutHandler}
                className='transform transition-colors duration-300 hover:text-primary'
              >
                Logout
              </Link>
            </div>

            {/* Hamburger Icon */}
            <button
              className='focus:outline-none md:hidden'
              onClick={() => setOpen((prevState) => !prevState)}
            >
              {!open && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 8h16M4 16h16'
                  />
                </svg>
              )}

              {open && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className='md:hidden'>
          <div
            className={`${
              open
                ? ' translate-x-0 opacity-100'
                : '-translate-x-full opacity-0'
            } absolute top-12 flex w-full flex-col items-center space-y-6 self-end bg-white py-8 font-heading font-semibold transition-all duration-300 ease-in-out sm:self-center`}
          >
            <Link
              className='w-full border border-b-primaryLight py-4 text-center'
              to={'/admin/dashboard'}
            >
              Dashboard
            </Link>
            <Link
              className='w-full border border-b-primaryLight py-4 text-center'
              to={'/admin/users'}
            >
              Users
            </Link>
            <Link
              className='w-full border border-b-primaryLight py-4 text-center'
              to={'/admin/topics'}
            >
              Topics
            </Link>
            <Link
              className='w-full border border-b-primaryLight py-4 text-center'
              to={'/admin/domains'}
            >
              Domains
            </Link>
            <Link
              className='w-full border border-b-primaryLight py-4 text-center'
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashHeader
