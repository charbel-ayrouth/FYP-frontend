import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <section className='flex h-screen items-center justify-center bg-white'>
      <div className='mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl font-extrabold tracking-tight text-primary lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-gray-800 md:text-4xl '>
            Something's missing.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 '>
            Sorry, we can't find that page.
          </p>
          <button
            onClick={() => navigate(-1)}
            className='my-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-center font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className='my-4 ml-2  rounded-lg border border-primary bg-white px-5 py-2.5 text-center font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-primaryLight'
          >
            Home
          </button>
        </div>
      </div>
    </section>
  )
}

export default NotFound
