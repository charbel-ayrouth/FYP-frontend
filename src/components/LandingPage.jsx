import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className='bg-lightGray flex h-screen items-center justify-center'>
        <div>
          <h1 className='font-bold'>Landing Page</h1>
          <h2 className='font-semibold'>Subtitle</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus,
            rerum?
          </p>
          <button
            onClick={() => navigate('/login')}
            className='mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            login
          </button>

          <div className='h-10 w-10 bg-primary'></div>
          <div className='h-10 w-10 bg-accent'></div>
          <div className='h-10 w-10 bg-darkGrey'></div>
          <div className='h-10 w-10 bg-darkerGrey'></div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
