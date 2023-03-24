import React from 'react'
import Image from '../../assets/svg/collaboration.svg'

const Hero = () => {
  return (
    <section>
      {/* Flex container */}
      <div className='container mx-auto flex flex-col-reverse items-center px-4 md:flex-row xl:px-16'>
        {/* Left Item */}
        <div className='mt-14 flex flex-col items-center md:mt-0 md:w-1/2 md:items-start'>
          <h1 className='mb-4 max-w-md text-center text-4xl font-bold md:text-left md:text-5xl'>
            Final Year Project (FYP) Proposal Management System
          </h1>
          <p className='mb-8 max-w-sm text-center text-gray-500 md:text-left'>
            Revolutionize the way you approach your Final Year Project with our
            comprehensive management system - simplifying the proposal process,
            connecting you with the right advisor, and providing all the
            resources you need to succeed
          </p>
          <button className='w-36 rounded-full bg-primary px-4 py-2 font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'>
            Get Started
          </button>
        </div>
        {/* Right Item */}
        <div className='md:w-1/2'>
          <img src={Image} alt='hero' />
        </div>
      </div>
    </section>
  )
}

export default Hero
