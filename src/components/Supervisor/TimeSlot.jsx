import React, { useState, useRef, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { FiMoreVertical } from 'react-icons/fi'

const TimeSlot = ({ timeslot }) => {
  let startDateTime = parseISO(timeslot.startTime)
  let endDateTime = parseISO(timeslot.endTime)

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropDownOpen(false)
    }
  }

  const toggleDropdown = () => {
    setIsDropDownOpen((prevState) => !prevState)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <li className='group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100'>
      <img
        src={
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
        alt=''
        className='h-10 w-10 flex-none rounded-full'
      />

      <div className='flex-auto'>
        <p className='text-gray-900'>Michael Foster</p>
        <p className='mt-0.5'>
          <time dateTime={timeslot.startTime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={timeslot.endTime}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
      </div>

      <div className='relative' ref={dropdownRef}>
        <FiMoreVertical
          className='cursor-pointer text-xl duration-200'
          onClick={toggleDropdown}
        />
        <div
          className={`absolute top-10 right-0 w-32 rounded-md bg-white py-2 shadow-lg transition duration-300 ease-in-out ${
            isDropDownOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-5 opacity-0'
          }`}
        >
          <p className='block transform px-4 py-2 text-gray-800 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 hover:text-primary'>
            Edit
          </p>
          <p className='block transform px-4 py-2 text-gray-800 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 hover:text-primary'>
            Delete
          </p>
        </div>
      </div>
    </li>
  )
}

export default TimeSlot
