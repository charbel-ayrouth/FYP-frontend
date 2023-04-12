import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
  const { email } = useAuth()

  return (
    <div className='lg:px-10'>
      <h1 className='mb-12 text-3xl font-bold'>Welcome, {email}</h1>
      <div className='flex flex-col flex-wrap gap-y-10 lg:flex-row lg:justify-between'>
        <div className='w-full cursor-pointer rounded-md border bg-gray-50 p-4 shadow-lg transition-all duration-200 hover:scale-105 lg:w-2/5'>
          <h2 className='mb-2 text-xl font-bold'>Users</h2>
          <p className='mb-4 text-gray-700'>
            Manage student and supervisor accounts.
          </p>
          <Link to='/admin/users' className='text-blue-500 hover:underline'>
            View All Users
          </Link>
        </div>
        <div className='w-full cursor-pointer rounded-md border bg-gray-50 p-4 shadow-lg transition-all duration-200 hover:scale-105 lg:w-2/5'>
          <h2 className='mb-2 text-xl font-bold'>Topics</h2>
          <p className='mb-4 text-gray-700'>
            Manage topics for students to choose from.
          </p>
          <Link to='/admin/topics' className='text-blue-500 hover:underline'>
            View All Topics
          </Link>
        </div>
        <div className='w-full cursor-pointer rounded-md border bg-gray-50 p-4 shadow-lg transition-all duration-200 hover:scale-105 lg:w-2/5'>
          <h2 className='mb-2 text-xl font-bold'>Domains</h2>
          <p className='mb-4 text-gray-700'>
            Manage domains for supervisors to choose from.
          </p>
          <Link to='/admin/domains' className='text-blue-500 hover:underline'>
            View All Domains
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome
