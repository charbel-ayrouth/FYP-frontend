import { memo } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useSendConnectionRequestMutation } from '../supervisorsApiSlice'

const SupervisorCard = ({ supervisor }) => {
  const { id } = useAuth()

  function getInitials(name) {
    let initials = name.match(/\b\w/g) || []
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    return initials
  }

  const [sendConnection, { isLoading, error, isError, isSuccess }] =
    useSendConnectionRequestMutation()

  const handleClick = () => {
    let supervisorId = supervisor._id
    console.log('before')
    sendConnection({ supervisorId, studentId: id })
    console.log('after')
  }

  if (supervisor) {
    const { username, connections, connectionRequest, topics, domains } =
      supervisor

    const initials = getInitials(username)
    return (
      <div className='mb-4 flex flex-col justify-between rounded-lg border bg-white p-4 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl'>
        <div>
          <div className='mb-4 flex items-center'>
            <div
              className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                connections.length >= 5 ? 'bg-gray-300' : 'bg-primary'
              }  `}
            >
              <span
                className={`text-lg font-bold ${
                  connections.length >= 5 ? 'text-gray-600' : 'text-white'
                }`}
              >
                {initials}
              </span>
            </div>
            <div>
              <h2 className='text-lg font-bold text-gray-800'>{username}</h2>
              <p className='text-gray-600'>
                {domains.map((domain) => domain.title).join(' , ')}
              </p>
            </div>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-sm font-bold text-gray-700'>Topics:</h3>
            <ul className='flex flex-wrap gap-2'>
              {topics.map((topic) => (
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
          ) : (
            <button
              className={`focus:shadow-outline-blue rounded-full py-2 px-4 font-bold text-white transition duration-300 ease-in-out focus:outline-none ${
                connections.length >= 5
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'cursor-pointer bg-primary hover:bg-primaryDark'
              }`}
              disabled={
                connections.length >= 5 || connections.indexOf(id) !== -1
              }
              onClick={handleClick}
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </button>
          )}
          <div className='flex items-center'>
            <span
              className={`mr-1 inline-block h-2 w-2 rounded-full ${
                connections.length >= 5 ? 'bg-red-500' : 'bg-green-500'
              }`}
            ></span>
            <p className='text-gray-600'>{5 - connections.length} seats</p>
          </div>
        </div>
        {isError && <p className='text-red-600'>{error?.message}</p>}
      </div>
    )
  } else return null
}

const memoizedSupervisor = memo(SupervisorCard)

export default memoizedSupervisor
