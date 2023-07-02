import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { useGetAppointmentsQuery } from '../../features/appointments/appointmentsApiSlice'
import LoadingSpinner from '../LoadingSpinner'
import { parseISO, format } from 'date-fns'

const Appointments = ({ id, advisor }) => {
  function scrollToTop() {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
      offset: 300,
    })
  }

  const { data, isLoading, isSuccess, error, isError } =
    useGetAppointmentsQuery({
      userId: id,
    })

  return (
    <div className='rounded-lg bg-white shadow'>
      <div className='px-4 py-3'>
        <h2 className='text-lg font-bold'>Upcoming Meetings</h2>
      </div>
      <div className='divide-y divide-gray-200 px-4 py-3'>
        {isLoading ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          data.length === 0 ? (
            <>
              <p className='text-gray-500'>
                You currently have no meetings scheduled.
              </p>
              <button
                onClick={scrollToTop}
                className='mt-4 rounded-full bg-primary py-2 px-4 text-white'
              >
                Schedule a meeting
              </button>
            </>
          ) : (
            data.map((appointment) => (
              <div key={appointment.id} className='px-4 py-3'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-base font-medium'>
                    {advisor
                      ? appointment.student.username
                      : appointment.supervisor.username}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    {format(parseISO(appointment.startTime), 'EEEE, MMMM d')} at{' '}
                    {format(parseISO(appointment.startTime), 'h:mm a')}
                  </p>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <p className='text-sm text-gray-500'>30 min</p>
                  <p className='text-sm text-gray-500'>Microsoft Teams</p>
                </div>
              </div>
            ))
          )
        ) : null}
      </div>
    </div>
  )
}

export default Appointments
