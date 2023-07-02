import React, { useState } from 'react'
import { times } from '../../config/time'
import { format, parseISO, startOfToday } from 'date-fns'
import Calendar from './Calendar'
import {
  useGetAvailabilityQuery,
  useAddAvailabilityMutation,
} from '../../features/availability/availabilityApiSlice'
import LoadingSpinner from '../LoadingSpinner'

const SupervisorAvailability = ({ id }) => {
  const [startTime, setStartTime] = useState('08:30:00.000')
  const [endTime, setEndTime] = useState('20:30:00.000')

  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)

  const {
    data,
    isLoading: isLoadingGet,
    isSuccess: isSuccessGet,
  } = useGetAvailabilityQuery({
    supervisorId: id,
  })

  const [addAvailability, { isLoading, isSuccess, isError, error }] =
    useAddAvailabilityMutation()

  const submitHandler = async () => {
    let startDate = `${format(selectedDay, 'yyyy-MM-dd')}T${startTime}`
    let startDateISO = parseISO(startDate, new Date())
    let endDate = `${format(selectedDay, 'yyyy-MM-dd')}T${endTime}`
    let endDateISO = parseISO(endDate, new Date())

    await addAvailability({
      supervisorId: id,
      startTime: startDateISO,
      endTime: endDateISO,
    })
  }

  return (
    <>
      <div className='mb-6 rounded-lg bg-white shadow-lg sm:px-2 sm:py-4 md:p-6'>
        {isLoadingGet ? (
          <LoadingSpinner />
        ) : (
          isSuccessGet && (
            <Calendar
              timeslots={data}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              id={id}
            />
          )
        )}

        <div className='mt-3 flex items-center px-4 sm:px-7'>
          <div className='mr-6 space-x-2'>
            <label htmlFor='start'>Start Time</label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              name='start time'
              id='start'
              className='rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none'
            >
              {times.map((time, index) => (
                <option key={index} value={time.time}>
                  {time.displayTime}
                </option>
              ))}
            </select>
          </div>

          <div className='mr-8 space-x-2'>
            <label htmlFor='end'>End Time</label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              name='end time'
              id='end'
              className='rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none'
            >
              {times
                .filter((time) => time.time > startTime)
                .map((time, index) => (
                  <option key={index} value={time.time}>
                    {time.displayTime}
                  </option>
                ))}
            </select>
          </div>

          <button
            className='rounded-lg bg-blue-600 px-5 py-2.5 text-center font-medium text-white hover:bg-blue-700 focus:border-2 focus:border-primaryLight focus:outline-none focus:ring-4 focus:ring-blue-300'
            onClick={submitHandler}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner white={true} /> : 'Add'}
          </button>
        </div>
      </div>
    </>
  )
}

export default SupervisorAvailability
