import React from 'react'
import { useGetConnectionsRequestQuery } from '../../features/supervisors/supervisorsApiSlice'
import LoadingSpinner from '../LoadingSpinner'

const ConnectionsRequest = ({ id }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetConnectionsRequestQuery(
      { id },
      {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
      }
    )

  // Dummy data for connections request
  const connectionsRequest = [
    {
      id: 1,
      studentName: 'John Doe',
      topic: 'Machine Learning',
      domain: 'Computer Science',
      message:
        'Hello! I am interested in working on a project related to Machine Learning. Can we connect and discuss further?',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      topic: 'Web Development',
      domain: 'Computer Science',
      message:
        'Hi, I am interested in your expertise in web development. Can we connect and discuss further about a possible project idea?',
    },
  ]

  const handleAccept = (id) => {
    // handle accept request logic
  }

  const handleDecline = (id) => {
    // handle decline request logic
  }

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    content = (
      <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='px-4 py-5 sm:p-6'>
          <h2 className='text-lg font-medium text-gray-900'>
            Connections Requests
          </h2>
          <div className='mt-5'>
            {connectionsRequest.length > 0 ? (
              <ul className='divide-y divide-gray-200'>
                {connectionsRequest.map((request) => (
                  <li key={request.id} className='py-4'>
                    <div className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                        <svg
                          className='h-8 w-8 rounded-full'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M7 20l4-16m2 16l4-16M6 9h14M4 15h14'
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className='text-sm font-medium text-gray-900'>
                          {request.studentName} - {request.topic} (
                          {request.domain})
                        </h3>
                        <div className='mt-2 text-sm text-gray-500'>
                          {request.message}
                        </div>
                        <div className='mt-4 flex justify-end'>
                          <button
                            onClick={() => handleAccept(request.id)}
                            type='button'
                            className='inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(request.id)}
                            type='button'
                            className='ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='py-4'>
                <p className='text-sm text-gray-500'>No connections request.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return content
}

export default ConnectionsRequest
