import { memo, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useSendConnectionRequestMutation } from '../supervisorsApiSlice'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { getInitials } from '../../../config/functions'
import Modal from '../../../components/Modal'
import { FiX } from 'react-icons/fi'

const SupervisorCard = ({ supervisor, w }) => {
  const { id } = useAuth()
  const [showMore, setShowMore] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const MAX_CONNECTIONS = 1
  const MAX_TOPICS = 4
  const MAX_DOMAINS = 4

  const [sendConnection, { isLoading, error, isError, isSuccess }] =
    useSendConnectionRequestMutation()

  const handleClick = () => {
    let supervisorId = supervisor._id
    sendConnection({ supervisorId, studentId: id, message })
  }

  if (supervisor) {
    const { username, connections, connectionRequest, topics, domains } =
      supervisor

    return (
      <>
        <Modal open={isOpen}>
          <div className='mb-4 flex justify-between sm:mb-5 sm:w-96 md:w-[450px]'>
            <h3 className='text-lg font-semibold text-gray-900 md:text-xl'>
              Confirm
            </h3>
            <button
              type='button'
              className='inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
              onClick={() => setIsOpen(false)}
            >
              <FiX />
            </button>
          </div>

          <label
            for='message'
            class='mb-2 block text-sm font-medium text-gray-900'
          >
            Your message
          </label>
          <textarea
            id='message'
            rows='4'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none'
            placeholder='Leave a comment...'
          ></textarea>
          <div className='mt-4 flex'>
            <button
              type='button'
              className='ml-auto rounded-lg bg-blue-600 px-5 py-2.5 text-center font-medium text-white hover:bg-blue-700 focus:border-2 focus:border-primaryLight focus:outline-none focus:ring-4 focus:ring-blue-300'
              onClick={() => {
                handleClick()
                setIsOpen(false)
              }}
            >
              Send
            </button>
          </div>
        </Modal>
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
            {connectionRequest.some((request) => request.user === id) ? (
              <button
                type='button'
                className='focus:shadow-outline-blue rounded-full bg-gray-400 py-2 px-4 font-bold text-white transition duration-300 ease-in-out focus:outline-none'
              >
                Request Sent
              </button>
            ) : connections.some((request) => request.user === id) ? (
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
                  connections.some((request) => request.user === id)
                }
                onClick={() => setIsOpen(true)}
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
      </>
    )
  } else return null
}

const memoizedSupervisor = memo(SupervisorCard)

export default memoizedSupervisor
