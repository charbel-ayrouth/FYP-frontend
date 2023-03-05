import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className='flex justify-center items-center h-screen bg-lightGray'>
        <div>
          <h1 className='font-bold'>Landing Page</h1>
          <h2 className='font-semibold'>Subtitle</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus,
            rerum?
          </p>
          <button
            onClick={() => navigate('/login')}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 mr-2 mb-2 focus:outline-none font-medium'
          >
            login
          </button>
          <div className='w-10 h-10 bg-deepBlue'></div>
          <div className='w-10 h-10 bg-lightBlue'></div>
          <div className='w-10 h-10 bg-brightYellow'></div>
          <div className='w-10 h-10 bg-lightGray'></div>
          <div className='w-10 h-10 bg-darkGray'></div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
