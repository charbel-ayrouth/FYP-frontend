import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <nav className='fixed top-0 w-full bg-primary'>
      <div className='text-lightGray container mx-auto flex h-24 items-center border-b-2 px-6 py-2'>
        <h1 className='font-bold'>Charbel</h1>

        <div className='grow'>
          <div className='hidden items-center justify-center gap-2 sm:flex md:gap-8'>
            <Link>Home</Link>
            <Link>Blog</Link>
            <Link>Shop</Link>
            <Link>About</Link>
            <Link>Contact</Link>
          </div>
        </div>

        <div className='flex grow items-center justify-end sm:hidden'>
          <button className='inline-flex items-center justify-center rounded-md bg-accent p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
            Open Menu
          </button>
        </div>

        <div className='absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden'>
          <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold'>Charbel</h1>
              <div className=' -mr-2'>
                <button className=' inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  Button
                </button>
              </div>
            </div>

            <div className='mt-6'>
              <nav className='grid gap-y-8'>
                <Link className='px-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
                  Home
                </Link>
                <Link className='px-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
                  Home
                </Link>
                <Link className='px-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
                  Home
                </Link>
                <Link className='px-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
                  Home
                </Link>
              </nav>
            </div>

            <div className='mt-6 flex flex-col items-center gap-2'>
              <Link className=' w-full rounded-md border-2 bg-accent px-4 py-2 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:text-xl'>
                Sign up
              </Link>
              <Link className=' w-full rounded-md border-2 bg-accent px-4 py-2 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:text-xl'>
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className='hidden sm:block'>
          <Link className='mr-2 font-body text-accent'>Sign Up</Link>
          <Link className='mr-2 font-body text-accent'>Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
