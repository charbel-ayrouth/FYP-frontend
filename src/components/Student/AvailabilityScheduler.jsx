import React, { useState } from 'react'
import { format, parseISO, startOfToday } from 'date-fns'
import Calendar from './Calendar'
import { useGetConnectedSupervisorsAvailabilityQuery } from '../../features/availability/availabilityApiSlice'
import LoadingSpinner from '../LoadingSpinner'

const AvailabilityScheduler = ({ id }) => {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  const { data, isLoading, isSuccess, error, isError } =
    useGetConnectedSupervisorsAvailabilityQuery({
      studentId: id,
    })

  let content

  if (isError) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <LoadingSpinner />
  }

  if (isSuccess) {
    content = (
      <div className='mb-6 rounded-lg bg-white shadow-lg sm:px-2 sm:py-4 md:p-6'>
        <Calendar
          timeslots={data}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          id={id}
        />
      </div>
    )
  }
  return content
}

export default AvailabilityScheduler
