import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { FiMoreVertical, FiChevronLeft, FiHome, FiUser } from 'react-icons/fi'

const DashHeader = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

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

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [navigate, isSuccess])

  function capitalizeFirstLetter(str) {
    return `${str.charAt(0).toUpperCase() + str.slice(1)} Page`
  }

  return (
    <nav className='sticky top-0 z-10 bg-white shadow-md'>
      <div className='container mx-auto p-4 xl:px-16'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='hidden text-2xl font-bold text-primary sm:block'>
            FYP
          </div>

          <FiChevronLeft
            className='cursor-pointer text-2xl sm:hidden'
            onClick={() => navigate(-1)}
          />

          {/* Page Title */}
          <h4 className=' text-xl font-semibold'>
            {pathname.split('/')[2]
              ? capitalizeFirstLetter(pathname.split('/')[2])
              : 'Home Page'}
          </h4>
          <div className='flex items-center space-x-6 font-heading font-semibold'>
            <FiUser
              className='transform cursor-pointer text-2xl transition-colors duration-300 hover:text-primary'
              onClick={() => navigate(`/${pathname.split('/')[1]}/profile`)}
            />
            {/* Home Icon */}
            <FiHome
              className='transform cursor-pointer text-2xl transition-colors duration-300 hover:text-primary'
              onClick={() => navigate(`/${pathname.split('/')[1]}`)}
            />

            {/* More Icon */}
            <div className='relative' ref={dropdownRef}>
              <FiMoreVertical
                className='cursor-pointer text-2xl duration-300 hover:text-primary'
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
            {/* End More */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashHeader
