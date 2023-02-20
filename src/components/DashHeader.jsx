import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
  const [open, setOpen] = useState(false)
  return (
    <nav className='container relative p-6 mx-auto font-mono'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div className='text-2xl font-bold'>FYP</div>
        {/* Menu Items */}
        <div className='hidden space-x-6 md:flex'>
          <Link to={'/dash'}>Dashboard</Link>
          <Link to={'/dash'}>Dashboard</Link>
          <Link to={'/dash'}>Dashboard</Link>
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
