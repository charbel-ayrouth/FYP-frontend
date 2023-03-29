import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { FiMoreVertical } from 'react-icons/fi'

const DashHeader = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropDownOpen(false)
    }
  }

  const toggleDropdown = () => {
    setIsDropDownOpen((prevState) => !prevState)
  }

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  const logoutHandler = () => sendLogout()

  useEffect(() => {
    if (isSuccess) navigate('/')
    if (screenWidth > 767) setOpen(false)

    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', changeWidth)
    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('resize', changeWidth)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [navigate, screenWidth, isSuccess])

  return (
    <>
      <nav className='sticky top-0 z-10 mb-16 bg-white shadow-md'>
        <div className='container mx-auto p-4 xl:px-16'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='text-2xl font-bold text-primary'>FYP</div>
            {/* Menu Items */}
            <div className='hidden space-x-6 font-heading font-semibold md:flex md:items-center'>
              <Link className='transform transition-colors duration-300 hover:cursor-pointer hover:text-primary'>
                Home
              </Link>
              <Link className='transform transition-colors duration-300 hover:cursor-pointer hover:text-primary'>
                Features
              </Link>
              <Link className='transform transition-colors duration-300 hover:cursor-pointer hover:text-primary'>
                About
              </Link>
              <div className='relative' ref={dropdownRef}>
                <FiMoreVertical
                  className='cursor-pointer'
                  onClick={toggleDropdown}
                />
                <div
                  className={`absolute top-10 right-0 w-48 rounded-md bg-white py-2 shadow-lg transition duration-300 ease-in-out ${
                    isDropDownOpen
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-5 opacity-0'
                  }`}
                >
                  <Link
                    onClick={logoutHandler}
                    className='block transform px-4 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 hover:text-primary'
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
            {/* Hamburger Icon */}
            <button
              className={`hamburger focus:outline-none md:hidden ${
                open ? 'open' : ''
              }`}
              id='menu-btn'
              onClick={() => setOpen((prevState) => !prevState)}
            >
              <span className='hamburger-top'></span>
              <span className='hamburger-middle'></span>
              <span className='hamburger-bottom'></span>
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
            } absolute top-16 flex w-full flex-col items-center self-end bg-white font-heading font-semibold shadow-lg transition-all duration-300 ease-in-out sm:self-center`}
          >
            <Link
              className='w-full border-b-2 border-primaryDark py-5 text-center'
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              className='w-full border-b-2 border-primaryDark py-5 text-center'
              onClick={() => setOpen(false)}
            >
              Features
            </Link>
            <Link
              className='w-full border-b-2 border-primaryDark py-5 text-center'
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              className='w-full border-b-2 border-primaryDark py-5 text-center'
              onClick={() => {
                logoutHandler()
                setOpen(false)
              }}
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
