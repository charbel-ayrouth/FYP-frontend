import React from 'react'
import { format, parseISO } from 'date-fns'
import { getInitials } from '../../config/functions'

const TimeSlot = ({ timeslot }) => {
  let startDateTime = parseISO(timeslot.startTime)
  let endDateTime = parseISO(timeslot.endTime)

  return (
    <>
      <li className='flex flex-wrap items-center justify-between rounded-xl focus-within:bg-gray-100 hover:bg-gray-100 md:px-2 md:py-1 lg:px-4 lg:py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary`}
          >
            <span className={`text-lg font-bold ${'text-white'}`}>
              {getInitials(timeslot.supervisor.username)}
            </span>
          </div>

          <div className='flex-auto'>
            <p className='text-gray-900'>{timeslot.supervisor.username}</p>
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
        </div>
      </li>
    </>
  )
}

export default TimeSlot
