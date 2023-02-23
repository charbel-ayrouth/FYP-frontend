import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdCloseCircleOutline } from 'react-icons/io'

const Header = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const toggleMenu = (e) => {
      if (e.target.innerWidth >= 640) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', toggleMenu)
    return () => {
      window.removeEventListener('resize', toggleMenu)
    }
  }, [])

  return (
    <div className='container p-6 mx-auto bg-blue-600'>
      {/* Desktop */}
      <div className='hidden sm:block'>
        <div className='flex justify-between items-center'>
          <div className='text-lg'>Text</div>
          <div className='text-lg'>Text</div>
        </div>
      </div>
      {/* Mobile Menu Button */}
      <div className='flex justify-end sm:hidden'>
        <button
          className='px-5 py-2 text-lg bg-white rounded-full shadow-lg'
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div className='fixed inset-0 w-full h-screen bg-gray-500 bg-opacity-60 backdrop-blur-sm'>
          <div className='fixed inset-0 p-5'>
            <div className='p-5 w-full bg-white rounded-xl'>
              <div className='flex justify-between items-center'>
                <h1>Navigation</h1>
                <IoMdCloseCircleOutline
                  className='w-7 h-7 transition-all cursor-pointer hover:scale-110'
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className='mt-5 divide-y'>
                <Link className='block py-2 text-xl'>Home</Link>
                <Link className='block py-2 text-xl'>Home</Link>
                <Link className='block py-2 text-xl'>Home</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
