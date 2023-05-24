import React, { useState } from 'react'
import { times } from '../../config/time'
import { format, parseISO, startOfToday } from 'date-fns'
import Calendar from './Calendar'

const SupervisorAvailability = () => {
  const [startTime, setStartTime] = useState('08:30:00.000')
  const [endTime, setEndTime] = useState('20:30:00.000')

  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)

  const [meetings, setMeetings] = useState([
    {
      startDatetime: '2023-05-11T13:00', // standard iso formated string
      endDatetime: '2023-05-11T14:30',
    },
    {
      startDatetime: '2023-05-20T09:00',
      endDatetime: '2023-05-20T11:30',
    },
    {
      startDatetime: '2023-05-20T17:00',
      endDatetime: '2023-05-20T18:30',
    },
    {
      startDatetime: '2023-06-09T13:00',
      endDatetime: '2023-06-09T14:30',
    },
    {
      startDatetime: '2023-05-13T14:00',
      endDatetime: '2023-05-13T14:30',
    },
  ])

  const submitHandler = () => {
    let startDate = `${format(selectedDay, 'yyyy-MM-dd')}T${startTime}`
    let startDateISO = parseISO(startDate, new Date())
    let endDate = `${format(selectedDay, 'yyyy-MM-dd')}T${endTime}`
    let endDateISO = parseISO(endDate, new Date())

    setMeetings((prevState) => [
      ...prevState,
      {
        startDatetime: startDate,
        endDatetime: endDate,
      },
    ])
  }

  return (
    <div className='mb-6 rounded-lg bg-white p-6 shadow-lg'>
      <Calendar
        meetings={meetings}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />

      <div>
        <label htmlFor='start'>Start Time</label>
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          name='start time'
          id='start'
          className='border-b py-3 font-light'
        >
          {times.map((time, index) => (
            <option key={index} value={time.time}>
              {time.displayTime}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='end'>End Time</label>
        <select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          name='end time'
          id='end'
          className='border-b py-3 font-light'
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

      <button onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default SupervisorAvailability
