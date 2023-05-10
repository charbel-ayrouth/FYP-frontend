import React from 'react'
import {
  useGetConnectionsRequestQuery,
  useAcceptConnectionRequestMutation,
  useDeclineConnectionRequestMutation,
} from '../../features/supervisors/supervisorsApiSlice'
import LoadingSpinner from '../LoadingSpinner'
import { getInitials } from '../../config/functions'

const ConnectionsRequest = ({ id }) => {
  const MAX_REQUEST = 3

  const { data, isLoading, isSuccess, isError, error } =
    useGetConnectionsRequestQuery(
      { id },
      {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
      }
    )

  const [
    acceptConnection,
    { isLoading: isLoadingAccept, isError: isErrorAccept, error: errorAccept },
  ] = useAcceptConnectionRequestMutation()

  const [declineConnection, { isLoading: isLoadingDecline }] =
    useDeclineConnectionRequestMutation()

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    content = (
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='text-xl font-bold'>Connections Requests</h2>
        <ul className='mt-4 flex flex-col gap-2'>
          {data.length === 0 ? (
            <p className='text-gray-500'>
              You currently have no connection request.
            </p>
          ) : (
            data.slice(0, MAX_REQUEST).map((user) => (
              <li
                key={user._id}
                className='mb-4 flex flex-col justify-between rounded-lg border bg-white p-4 shadow-md'
              >
                <div>
                  <div className='mb-4 flex items-center'>
                    <div
                      className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full

                  bg-primary
                `}
                    >
                      <span
                        className={`text-lg font-bold
                    text-white
                `}
                      >
                        {getInitials(user.username)}
                      </span>
                    </div>
                    <div>
                      <h2 className='text-lg font-bold text-gray-800'>
                        {user.username}
                      </h2>
                      <p className='text-gray-600'>
                        {user.domains.map((domain) => domain.title).join(' , ')}
                      </p>
                    </div>
                  </div>

                  <div className='mb-6'>
                    <h3 className='mb-2 text-sm font-bold text-gray-700'>
                      Topics:
                    </h3>
                    <ul className='flex flex-wrap gap-2'>
                      {user.topics.map((topic) => (
                        <li
                          key={topic._id}
                          className='rounded-full bg-gray-100 py-1 px-2 text-xs text-gray-600'
                        >
                          {topic.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='flex gap-4'>
                    <button
                      type='button'
                      className='focus:shadow-outline-blue rounded-full bg-blue-500 py-2 px-4 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none'
                      onClick={() =>
                        acceptConnection({
                          supervisorId: id,
                          studentId: user._id,
                        })
                      }
                    >
                      {isLoadingAccept ? (
                        <LoadingSpinner white={true} />
                      ) : (
                        'Accept'
                      )}
                    </button>
                    <button
                      type='button'
                      className='focus:shadow-outline-blue rounded-full bg-red-500 py-2 px-4 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700 focus:outline-none'
                      onClick={() =>
                        declineConnection({
                          supervisorId: id,
                          studentId: user._id,
                        })
                      }
                    >
                      {isLoadingDecline ? (
                        <LoadingSpinner white={true} />
                      ) : (
                        'Decline'
                      )}
                    </button>
                  </div>
                  {isErrorAccept && (
                    <p className='text-red-600'>{errorAccept?.data.message}</p>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    )
  }

  return content
}

export default ConnectionsRequest
