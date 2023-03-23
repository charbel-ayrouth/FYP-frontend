import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    if (screenWidth > 767) setOpen(false)

    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [navigate, screenWidth])

  return (
    <>
      <nav className='relative mb-16 bg-white'>
        <div className='container mx-auto p-4'>
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
            </div>

            <button className='hidden rounded-full bg-primary px-4 py-2 font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight md:block'>
              Get Started
            </button>
            {/* Hamburger Icon */}
            <button
              className={`hamburger focus:outline-none md:hidden ${
                open ? 'open' : ''
              }`}
              id='menu-btn'
              onClick={() => setOpen((prevState) => !prevState)}
            >
              <span class='hamburger-top'></span>
              <span class='hamburger-middle'></span>
              <span class='hamburger-bottom'></span>
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
            } absolute top-16 flex w-full flex-col items-center space-y-6 self-end bg-white py-8 font-heading font-semibold transition-all duration-300 ease-in-out sm:self-center`}
          >
            <Link
              className='w-full border-b-2 border-primaryLight py-4 text-center'
              to={'/admin/dashboard'}
            >
              Dashboard
            </Link>
            <Link
              className='w-full border-b-2 border-primaryLight py-4 text-center'
              to={'/admin/users'}
            >
              Users
            </Link>
            <Link
              className='w-full border-b-2 border-primaryLight py-4 text-center'
              to={'/admin/topics'}
            >
              Topics
            </Link>
            <Link
              className='w-full border-b-2 border-primaryLight py-4 text-center'
              to={'/admin/domains'}
            >
              Domains
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
