import React, { useState } from 'react'
import { format, parseISO, addMinutes } from 'date-fns'
import { FiX } from 'react-icons/fi'
import { getInitials } from '../../config/functions'
import Modal from '../Modal'
import { useAddAppointmentsMutation } from '../../features/appointments/appointmentsApiSlice'
import LoadingSpinner from '../LoadingSpinner'

const TimeSlot = ({ timeslot, id, meeting, appointments = [] }) => {
  let startDateTime = parseISO(timeslot.startTime)
  let endDateTime = parseISO(timeslot.endTime)
  const intervalInMinutes = 30

  const [selectedTime, setSelectedTime] = useState('')

  const totalIntervals = Math.ceil(
    (endDateTime - startDateTime) / (intervalInMinutes * 60 * 1000)
  )

  const timestamps = []
  for (let i = 0; i <= totalIntervals; i++) {
    const timestamp = new Date(
      startDateTime.getTime() + i * intervalInMinutes * 60 * 1000
    )
    timestamps.push(timestamp)
  }

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value)
  }

  const [isOpen, setIsOpen] = useState(false)

  const [addAppointment, { isLoading, isSuccess, isError, error }] =
    useAddAppointmentsMutation()

  const submitHandler = async () => {
    let start = parseISO(selectedTime, new Date())
    let end = addMinutes(parseISO(selectedTime, new Date()), 30)
    await addAppointment({
      startTime: start,
      endTime: end,
      supervisorId: timeslot.supervisor._id,
      userId: id,
    })
    setIsOpen(false)
    setSelectedTime('')
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const availbleStartTime = new Date(timeslot.startTime)
    const availbleEndTime = new Date(timeslot.endTime)
    const meetingStartTime = new Date(appointment.startTime)
    const meetingEndTime = new Date(appointment.startTime)

    return (
      meetingStartTime >= availbleStartTime &&
      meetingEndTime <= availbleEndTime &&
      appointment.student._id === id &&
      appointment.supervisor._id === timeslot.supervisor._id
    )
  })

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
            onClick={() => {
              setIsOpen(false)
              setSelectedTime('')
            }}
          >
            <FiX />
          </button>
        </div>

        <label className='mb-2 block text-sm font-medium text-gray-900'>
          Please choose your time
        </label>
        <select
          value={selectedTime}
          onChange={handleTimeChange}
          className='rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none'
        >
          <option value=''>Select a time</option>
          {timestamps.map((timestamp) => (
            <option
              key={timestamp.toISOString()}
              value={timestamp.toISOString()}
            >
              {timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </option>
          ))}
        </select>

        <div className='mt-2 flex flex-row-reverse gap-3'>
          <button
            onClick={submitHandler}
            disabled={isLoading}
            className='rounded-lg bg-blue-600 px-5 py-2.5 text-center font-medium text-white hover:bg-blue-700 focus:border-2 focus:border-primaryLight focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            {isLoading ? <LoadingSpinner white={true} /> : 'Submit'}
          </button>
          <button
            className='rounded-lg bg-red-600 px-5 py-2.5 text-center font-medium text-white hover:bg-red-700 focus:border-2 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-300'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <li className='flex flex-wrap items-center justify-between rounded-xl bg-gray-100 focus-within:bg-gray-200 hover:bg-gray-200 md:px-2 md:py-1 lg:px-4 lg:py-2'>
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
              <p key={appointment._id}>
                You have a meeting with{' '}
                <span className='font-bold text-black'>
                  {timeslot.supervisor.username}
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

        {!meeting && (
          <button
            onClick={() => {
              setIsOpen(true)
            }}
            className='rounded-full bg-primary px-4 py-2 text-white md:mt-2 md:text-sm lg:mt-0'
          >
            Request meeting
          </button>
        )}
      </li>
    </>
  )
}

export default TimeSlot
