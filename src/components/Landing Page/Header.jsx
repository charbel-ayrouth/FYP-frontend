import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'

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
      <nav className='sticky top-0 z-10 mb-16 bg-white shadow-md'>
        <div className='container mx-auto p-4 xl:px-16'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='text-2xl font-bold text-primary'>FYP</div>
            {/* Menu Items */}
            <div className='hidden space-x-6 font-heading font-semibold md:flex'>
              <Link
                to='hero'
                smooth={true}
                duration={500}
                offset={-100}
                className='transform transition-colors duration-300 hover:cursor-pointer hover:text-primary'
              >
                Home
              </Link>
              <Link
                to='features'
                smooth={true}
                duration={500}
                className='transform transition-colors duration-300 hover:cursor-pointer hover:text-primary'
              >
                Features
              </Link>
              <Link
                to='about'
                smooth={true}
                duration={500}
                className='transform transition-colors duration-300 hover:cursor-pointer hover:text-primary'
              >
                About
              </Link>
            </div>

            <button
              onClick={() => navigate('/login')}
              className='hidden rounded-full bg-primary px-4 py-2 font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight md:block'
            >
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
            } absolute top-16 flex w-full flex-col items-center self-end bg-white font-heading font-semibold transition-all duration-300 ease-in-out sm:self-center`}
          >
            <Link
              to='hero'
              smooth={true}
              duration={500}
              offset={-100}
              className='w-full border-b-2 border-primaryLight py-5 text-center'
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to='features'
              smooth={true}
              duration={500}
              className='w-full border-b-2 border-primaryLight py-5 text-center'
              onClick={() => setOpen(false)}
            >
              Features
            </Link>
            <Link
              className='w-full border-b-2 border-primaryLight py-5 text-center'
              to='about'
              smooth={true}
              duration={500}
              onClick={() => setOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
