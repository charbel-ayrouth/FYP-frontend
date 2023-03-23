import React from 'react'
import Image from '../../assets/svg/hero.svg'

const Hero = () => {
  return (
    <section>
      {/* Flex container */}
      <div className='container mx-auto flex flex-col-reverse items-center px-4 md:flex-row'>
        {/* Left Item */}
        <div className='mt-14 flex flex-col items-center space-y-12 md:mt-0 md:w-1/2 md:items-start'>
          <h1 className='max-w-md text-center text-4xl font-bold md:text-left md:text-5xl'>
            Final Year Project (FYP) Proposal Management System
          </h1>
          <p className='max-w-sm text-center text-darkGrey md:text-left'>
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
        <div className='md:w1/2'>
          <img src={Image} alt='hero' />
        </div>
      </div>
    </section>
  )
}

export default Hero
