import React from 'react'
import { format, parseISO } from 'date-fns'
import { getInitials } from '../../config/functions'

const TimeSlot = ({ timeslot, id, meeting, appointments = [] }) => {
  let startDateTime = parseISO(timeslot.startTime)
  let endDateTime = parseISO(timeslot.endTime)

  const filteredAppointments = appointments.filter((appointment) => {
    const availbleStartTime = new Date(timeslot.startTime)
    const availbleEndTime = new Date(timeslot.endTime)
    const meetingStartTime = new Date(appointment.startTime)
    const meetingEndTime = new Date(appointment.startTime)

    return (
      meetingStartTime >= availbleStartTime &&
      meetingEndTime <= availbleEndTime &&
      appointment.supervisor._id === timeslot.supervisor._id
    )
  })

  return (
    <>
      <li className='flex flex-wrap items-center justify-between rounded-xl  bg-gray-100 focus-within:bg-gray-200 hover:bg-gray-200 md:px-2 md:py-1 lg:px-4 lg:py-2'>
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

        {meeting && (
          <div className='mt-2'>
            {filteredAppointments.map((appointment) => (
              <p>
                You have a meeting with{' '}
                <span className='font-bold text-black'>
                  {appointment.student.username}
                </span>{' '}
                from{' '}
                <span className='font-bold text-black'>
                  {format(parseISO(appointment.startTime), 'h:mm a')}
                </span>{' '}
                to{' '}
                <span className='font-bold text-black'>
                  {format(parseISO(appointment.endTime), 'h:mm a')}
                </span>
              </p>
            ))}
          </div>
        )}
      </li>
    </>
  )
}

export default TimeSlot
