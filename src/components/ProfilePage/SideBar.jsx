import React from 'react'
import { getInitials } from '../../config/functions'

const SideBar = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='mb-4 flex h-36 w-36 items-center justify-center rounded-full bg-primary'>
        <span className='font-body text-7xl text-white'>
          {getInitials('Charbel ayrouth')}
        </span>
      </div>
      <div className='flex gap-8'>
        <p className='text-center font-semibold text-gray-700'>
          <span className='block text-xl font-bold uppercase tracking-wide text-gray-600'>
            22
          </span>
          <span className='text-sm text-gray-400'>Student</span>
        </p>
        <p className='text-center font-semibold text-gray-700'>
          <span className='block text-xl font-bold uppercase tracking-wide text-gray-600'>
            22
          </span>{' '}
          <span className='text-sm text-gray-400'>Project</span>
        </p>
        <p className='text-center font-semibold text-gray-700'>
          <span className='block text-xl font-bold uppercase tracking-wide text-gray-600'>
            22
          </span>{' '}
          <span className='text-sm text-gray-400'>Follower</span>
        </p>
      </div>
      <h2 className='my-4 text-lg font-bold text-gray-800'>Charbel Ayrouth</h2>
      <p className='text-gray-700'>ayrouthcharbel@gmail.com</p>
    </div>
  )
}

export default SideBar
