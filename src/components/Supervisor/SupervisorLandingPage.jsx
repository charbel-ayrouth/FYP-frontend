import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import ConnectionsRequest from './ConnectionsRequest'

const SupervisorLandingPage = () => {
  const { username, id } = useAuth()

  return (
    <div className='px-4 xl:px-40'>
      <h1 className='mb-12 text-3xl font-bold'>Welcome back, {username}</h1>
      <ConnectionsRequest id={id} />
      <div className='grid grid-flow-row-dense gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div
          id='one'
          className='relative rounded-lg bg-sky-500 p-16 sm:row-span-2'
        >
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>
            Profile
          </h4>
        </div>
        <div
          id='two'
          className='relative rounded-lg bg-sky-500 p-16 sm:col-span-2'
        >
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>
            Recommended
          </h4>
        </div>
        <div id='three' className='relative rounded-lg bg-sky-500 p-16'>
          <Link
            to={'/supervisor/topics'}
            className='absolute top-2 left-2 text-xl font-semibold'
          >
            Topics
          </Link>
        </div>
        <div
          id='four'
          className='relative rounded-lg bg-sky-500 p-16 sm:col-span-2'
        >
          <Link
            to={'/supervisor/notifications'}
            className='absolute top-2 left-2 text-xl font-semibold'
          >
            Notifications
          </Link>
        </div>
        <div id='five' className='relative rounded-lg bg-sky-500 p-16'>
          <Link
            to={'/supervisor/domains'}
            className='absolute top-2 left-2 text-xl font-semibold'
          >
            Domains
          </Link>
        </div>
        <div id='six' className='relative rounded-lg bg-sky-500 p-16'>
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>Help</h4>
        </div>
      </div>
    </div>
  )
}

export default SupervisorLandingPage
