import { memo, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useSendConnectionRequestMutation } from '../supervisorsApiSlice'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { getInitials } from '../../../config/functions'

const SupervisorCard = ({ supervisor, w }) => {
  const { id } = useAuth()
  const [showMore, setShowMore] = useState(false)

  const MAX_CONNECTIONS = 1
  const MAX_TOPICS = 4
  const MAX_DOMAINS = 4

  const [sendConnection, { isLoading, error, isError, isSuccess }] =
    useSendConnectionRequestMutation()

  const handleClick = () => {
    let supervisorId = supervisor._id
    sendConnection({ supervisorId, studentId: id })
  }

  if (supervisor) {
    const { username, connections, connectionRequest, topics, domains } =
      supervisor

    return (
      <div
        className={`${
          w ? 'p-2 shadow md:w-[360px]' : 'p-4 shadow-md'
        } mb-4 flex flex-col justify-between rounded-lg border bg-white transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
      >
        <div>
          <div className='mb-4 flex items-center'>
            <div
              className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                connections.length >= MAX_CONNECTIONS
                  ? 'bg-gray-300'
                  : 'bg-primary'
              }  `}
            >
              <span
                className={`text-lg font-bold ${
                  connections.length >= MAX_CONNECTIONS
                    ? 'text-gray-600'
                    : 'text-white'
                }`}
              >
                {getInitials(username)}
              </span>
            </div>
            <div>
              <h2 className='text-lg font-bold text-gray-800'>{username}</h2>
              <p className='text-gray-600'>
                {domains
                  .slice(0, showMore ? undefined : MAX_DOMAINS)
                  .map((domain) => domain.title)
                  .join(' , ')}
              </p>
            </div>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-sm font-bold text-gray-700'>Topics:</h3>
            <ul className='flex flex-wrap gap-2'>
              {topics
                .slice(0, showMore ? undefined : MAX_TOPICS)
                .map((topic) => (
                  <li
                    key={topic._id}
                    className='rounded-full bg-gray-100 py-1 px-2 text-xs text-gray-600'
                  >
                    {topic.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          {connectionRequest.indexOf(id) !== -1 ? (
            <button
              type='button'
              className='focus:shadow-outline-blue rounded-full bg-gray-400 py-2 px-4 font-bold text-white transition duration-300 ease-in-out focus:outline-none'
            >
              Request Sent
            </button>
          ) : connections.indexOf(id) !== -1 ? (
            <button
              className={`focus:shadow-outline-blue cursor-pointer rounded-full border border-primary bg-white py-2 px-4 font-bold text-primary focus:outline-none`}
              disabled={true}
            >
              Connected
            </button>
          ) : (
            <button
              className={`focus:shadow-outline-blue rounded-full py-2 px-4 font-bold text-white transition duration-300 ease-in-out focus:outline-none ${
                connections.length >= MAX_CONNECTIONS
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'cursor-pointer bg-primary hover:bg-primaryDark'
              }`}
              disabled={
                connections.length >= MAX_CONNECTIONS ||
                connections.indexOf(id) !== -1
              }
              onClick={handleClick}
            >
              {isLoading ? <LoadingSpinner white={true} /> : 'Connect'}
            </button>
          )}
          <div className='flex items-center'>
            <span
              className={`mr-1 inline-block h-2 w-2 rounded-full ${
                connections.length >= MAX_CONNECTIONS
                  ? 'bg-red-500'
                  : 'bg-green-500'
              }`}
            ></span>
            <p className='text-gray-600'>
              {MAX_CONNECTIONS - connections.length} seats
            </p>
          </div>
        </div>
        {isError && <p className='text-red-600'>{error?.message}</p>}
      </div>
    )
  } else return null
}

const memoizedSupervisor = memo(SupervisorCard)

export default memoizedSupervisor
