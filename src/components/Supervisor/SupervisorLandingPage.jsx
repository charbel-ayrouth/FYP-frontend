import React from 'react'
import useAuth from '../../hooks/useAuth'

const SupervisorLandingPage = () => {
  const { username } = useAuth()

  return (
    <div className='px-4 xl:px-40'>
      <h1 className='mb-12 text-3xl font-bold'>Welcome back, {username}</h1>
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
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>
            Topics
          </h4>
        </div>
        <div
          id='four'
          className='relative rounded-lg bg-sky-500 p-16 sm:col-span-2'
        >
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>
            Notifications
          </h4>
        </div>
        <div id='five' className='relative rounded-lg bg-sky-500 p-16'>
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>
            Domains
          </h4>
        </div>
        <div id='six' className='relative rounded-lg bg-sky-500 p-16'>
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>Help</h4>
        </div>
      </div>
    </div>
  )
}

export default SupervisorLandingPage
