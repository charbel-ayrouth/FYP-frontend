import React from 'react'

const SupervisorCard = ({ supervisor }) => {
  function getInitials(name) {
    let initials = name.match(/\b\w/g) || []
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    return initials
  }

  const { name, domains, topics, availableSeats } = supervisor
  const initials = getInitials(name)

  return (
    <div className='mb-4 flex cursor-pointer flex-col justify-between rounded-lg border bg-white p-4 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl'>
      <div>
        <div className='mb-4 flex items-center'>
          <div
            className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
              availableSeats === 0 ? 'bg-gray-300' : 'bg-primary'
            }  `}
          >
            <span
              className={`text-lg font-bold ${
                availableSeats === 0 ? 'text-gray-600' : 'text-white'
              }`}
            >
              {initials}
            </span>
          </div>
          <div>
            <h2 className='text-lg font-bold text-gray-800'>{name}</h2>
            <p className='text-gray-600'>{domains.join(', ')}</p>
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='mb-2 text-sm font-bold text-gray-700'>Topics:</h3>
          <ul className='flex flex-wrap gap-2'>
            {topics.map((topic, index) => (
              <li
                key={index}
                className='rounded-full bg-gray-100 py-1 px-2 text-xs text-gray-600'
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <button
          className={`focus:shadow-outline-blue rounded-full py-2 px-4  font-bold text-white transition duration-300 ease-in-out focus:outline-none ${
            availableSeats === 0
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-primary hover:bg-primaryDark'
          }`}
          disabled={availableSeats === 0}
        >
          Connect
        </button>
        <div className='flex items-center'>
          <span
            className={`mr-1 inline-block h-2 w-2 rounded-full ${
              availableSeats === 0 ? 'bg-red-500' : 'bg-green-500'
            }`}
          ></span>
          <p className='text-gray-600'>{availableSeats} seats</p>
        </div>
      </div>
    </div>
  )
}

export default SupervisorCard
