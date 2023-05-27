import React from 'react'

const ProjectUnderMeCard = () => {
  return (
    <div className='rounded-lg border bg-white p-6 shadow-md'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
        Noteworthy technology acquisitions 2021
      </h5>

      <p className='mb-3 font-normal text-gray-700'>
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <button className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'>
        Read more
      </button>
    </div>
  )
}

export default ProjectUnderMeCard
