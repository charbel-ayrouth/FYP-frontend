import React from 'react'

const Overview = ({ data, isSuccess }) => {
  let content = null

  if (isSuccess) {
    content = (
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-xl font-bold'>Overview</h2>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-sm text-gray-600'>Selected Domains</div>
          <div className='text-3xl font-bold text-green-500'>
            {data.selectedDomain}
          </div>
        </div>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-sm text-gray-600'>Selected Topics</div>
          <div className='text-3xl font-bold text-blue-500'>
            {data.selectedTopic}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-sm text-gray-600'>Connections</div>
          <div className='text-3xl font-bold text-yellow-500'>
            {data.connections}
          </div>
        </div>
      </div>
    )
  }
  return content
}

export default Overview
