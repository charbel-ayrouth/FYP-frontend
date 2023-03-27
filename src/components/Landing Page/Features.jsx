import React from 'react'
import { FaSearch, FaCalendarAlt, FaBell } from 'react-icons/fa'
import { MdAccessTime } from 'react-icons/md'
import { IoIosChatbubbles } from 'react-icons/io'
import { BiBrain } from 'react-icons/bi'

const Features = () => {
  return (
    <section className='container mx-auto mt-20 py-8 px-4 sm:py-16 lg:mt-32 xl:px-16'>
      <div className='mb-8 max-w-screen-md lg:mb-16'>
        <h2 className='mb-4 text-4xl font-extrabold tracking-tight text-gray-900'>
          Features
        </h2>
        <p className='text-gray-500 sm:text-xl'>
          Elevate your FYP experience with these powerful features
        </p>
      </div>
      <div className='space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3'>
        <div>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:h-12 lg:w-12'>
            <FaSearch className='text-white' size={'1.3rem'} />
          </div>
          <h3 className='mb-2 text-xl font-bold'>Advisor Directory</h3>
          <p className='text-gray-500'>
            Easily find and contact the right advisor for your FYP
          </p>
        </div>
        <div>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:h-12 lg:w-12'>
            <MdAccessTime className='text-white' size={'1.3rem'} />
          </div>
          <h3 className='mb-2 text-xl font-bold'>
            Real-time Availability Updates
          </h3>
          <p className='text-gray-500'>
            Know when an advisor is available to supervise you
          </p>
        </div>
        <div>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:h-12 lg:w-12'>
            <IoIosChatbubbles className='text-white' size={'1.3rem'} />
          </div>
          <h3 className='mb-2 text-xl font-bold'>
            Single Platform Communication
          </h3>
          <p className='text-gray-500'>
            Communicate with your advisor through one platform
          </p>
        </div>
        <div>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:h-12 lg:w-12'>
            <FaBell className='text-white' size={'1.3rem'} />
          </div>
          <h3 className='mb-2 text-xl font-bold'>Notification System</h3>
          <p className='text-gray-500'>
            Stay informed about changes in the advisor directory or availability
          </p>
        </div>
        <div>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:h-12 lg:w-12'>
            <BiBrain className='text-white' size={'1.3rem'} />
          </div>
          <h3 className='mb-2 text-xl font-bold'>Advisor Suggestions</h3>
          <p className='text-gray-500'>
            Get matched with the best advisor based on your criteria
          </p>
        </div>
        <div>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:h-12 lg:w-12'>
            <FaCalendarAlt className='text-white' size={'1.3rem'} />
          </div>
          <h3 className='mb-2 text-xl font-bold'>Appointment Scheduling</h3>
          <p className='text-gray-500'>
            Schedule appointments with advisors directly through the web app
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features
