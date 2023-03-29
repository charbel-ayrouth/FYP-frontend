import React from 'react'

const SupervisorLanding = () => {
  return (
    <div className='container mx-auto mb-32 px-4 xl:px-40'>
      <div className='grid grid-flow-row-dense gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className='rounded-lg bg-sky-500 p-16 sm:row-span-2'>1</div>
        <div className='rounded-lg bg-sky-500 p-16 sm:col-span-2'>2</div>
        <div className='rounded-lg bg-sky-500 p-16'>3</div>
        <div className='rounded-lg bg-sky-500 p-16 sm:col-span-2'>4</div>
        <div className='rounded-lg bg-sky-500 p-16'>5</div>
        <div className='rounded-lg bg-sky-500 p-16'>6</div>
      </div>
    </div>
  )
}

export default SupervisorLanding
