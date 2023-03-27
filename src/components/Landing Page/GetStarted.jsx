import React from 'react'
import { useNavigate } from 'react-router-dom'

const GetStarted = () => {
  const navigate = useNavigate()

  return (
    <section className='mt-20 bg-primaryLight lg:mt-32'>
      {/* Flex Container  */}
      <div className='container mx-auto flex flex-col items-center justify-between space-y-12 px-4 py-24 md:flex-row md:space-y-0 md:py-12 xl:px-16'>
        {/* Heading */}
        <h2 className='text-center text-4xl font-bold text-white md:max-w-xl md:text-left md:text-3xl'>
          Login and start working today
        </h2>
        {/* Button */}
        <button
          onClick={() => navigate('/login')}
          className='baseline w-32 rounded-full bg-white py-2 font-medium text-primary shadow-2xl focus:outline-none'
        >
          Get Started
        </button>
      </div>
    </section>
  )
}

export default GetStarted
