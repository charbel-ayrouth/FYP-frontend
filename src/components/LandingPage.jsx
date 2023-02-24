import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
      <div>
        <h1>Landing Page</h1>
        <h2>Subtitle</h2>
        <h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus,
          rerum?
        </h3>
        <button
          onClick={() => navigate('/login')}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 focus:outline-none '
        >
          login
        </button>
      </div>
    </div>
  )
}

export default LandingPage
