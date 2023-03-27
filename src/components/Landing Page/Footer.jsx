import React from 'react'
import { Link } from 'react-scroll'

const Footer = () => {
  return (
    <footer className='container mx-auto'>
      <div className='container mx-auto flex w-full flex-col items-center p-4 sm:flex-row sm:items-center sm:justify-between md:p-6 xl:px-16'>
        <span className='text-sm text-gray-500'>© 2023 Charbel Ayrouth</span>
        <ul className='mt-3 flex flex-wrap items-center space-x-4 text-sm text-gray-500 sm:mt-0 md:space-x-6'>
          <li>
            <Link
              to='hero'
              smooth={true}
              duration={500}
              className='hover:cursor-pointer hover:underline'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='features'
              smooth={true}
              duration={500}
              className='hover:cursor-pointer hover:underline'
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to='about'
              smooth={true}
              duration={500}
              className='hover:cursor-pointer hover:underline'
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
