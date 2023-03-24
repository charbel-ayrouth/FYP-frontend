import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='container mx-auto mt-16 rounded-lg bg-white px-4 shadow xl:px-16'>
      <div className='container mx-auto w-full p-4 md:flex md:items-center md:justify-between md:p-6'>
        <span className='text-sm text-gray-500 sm:text-center'>
          © 2023 Charbel Ayrouth
        </span>
        <ul className='mt-3 flex flex-wrap items-center text-sm text-gray-500 sm:mt-0'>
          <li>
            <Link className='mr-4 hover:underline md:mr-6'>About</Link>
          </li>
          <li>
            <Link className='mr-4 hover:underline md:mr-6'>Privacy Policy</Link>
          </li>
          <li>
            <Link className='mr-4 hover:underline md:mr-6'>Licensing</Link>
          </li>
          <li>
            <Link className='hover:underline'>Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
