import React from 'react'

const Help = () => {
  return (
    <div className='rounded-lg bg-white p-6 shadow'>
      <h2 className='mb-4 text-lg font-bold'>Help Center</h2>
      <ul className='list-disc pl-8'>
        <li className='mb-2'>
          <a href='#'>Getting started with the FYP Proposal system</a>
        </li>
        <li className='mb-2'>
          <a href='#'>How to choose the right advisor</a>
        </li>
        <li className='mb-2'>
          <a href='#'>Submitting a proposal and timeline</a>
        </li>
        <li className='mb-2'>
          <a href='#'>Using the appointment scheduling system</a>
        </li>
        <li className='mb-2'>
          <a href='#'>How to update your topics and domain preferences</a>
        </li>
        <li className='mb-2'>
          <a href='#'>Troubleshooting common issues</a>
        </li>
      </ul>
    </div>
  )
}

export default Help
