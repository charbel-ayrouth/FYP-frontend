import React from 'react'
import Image from '../../assets/svg/hero.svg'
const About = () => {
  return (
    <section>
      {/* Flex container */}
      <div className='container mx-auto flex flex-col items-center px-4 md:flex-row md:justify-between xl:px-16'>
        {/* Left Item */}
        <div className='md:w-5/12'>
          <img src={Image} alt='details' />
        </div>
        {/* Right Item */}
        <div className='mt-14 flex flex-col items-center space-y-12 md:mt-0 md:w-5/12 md:items-start'>
          <h1 className='max-w-md text-center text-4xl font-bold md:text-left md:text-5xl'>
            Details about the project
          </h1>
          <p className='text-center text-gray-500 md:text-left'>
            The Final Year Project (FYP) Management System aims to solve the
            problem of a lack of information and communication regarding the FYP
            proposal process for fifth-year engineering students at Antonine
            University. The system provides a platform for students to easily
            find and contact the right advisor, see real-time availability
            updates, communicate through one platform, get matched with the best
            advisor, schedule appointments, and access helpful resources. The
            system streamlines and simplifies the FYP proposal process, making
            it easier for students to choose and develop an idea that they are
            contented and satisfied with under the right advisor
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
