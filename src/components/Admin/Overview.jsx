import React from 'react'
import { useOverviewQuery } from '../../features/profile/profileApiSlice'
import LoadingSpinner from '../LoadingSpinner'

const Overview = ({ id }) => {
  let content = null
  const { data, isLoading, isError, error, isSuccess } = useOverviewQuery(id)

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    content = (
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-xl font-bold'>Overview</h2>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-sm text-gray-600'>Users Count</div>
          <div className='text-3xl font-bold text-green-500'>
            {data.userCount}
          </div>
        </div>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-sm text-gray-600'>Topics Count</div>
          <div className='text-3xl font-bold text-blue-500'>
            {data.topicCount}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-sm text-gray-600'>Domains Count</div>
          <div className='text-3xl font-bold text-yellow-500'>
            {data.domainCount}
          </div>
        </div>
      </div>
    )
  }
  return content
}

export default Overview
