import React from 'react'

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      advisorName: 'John Doe',
      date: '2023-05-10',
      time: '10:00 AM',
      duration: '30 minutes',
      location: 'Virtual',
    },
    {
      id: 2,
      advisorName: 'Jane Smith',
      date: '2023-05-12',
      time: '2:00 PM',
      duration: '1 hour',
      location: 'In-person',
    },
    {
      id: 3,
      advisorName: 'Bob Johnson',
      date: '2023-05-14',
      time: '11:30 AM',
      duration: '45 minutes',
      location: 'Virtual',
    },
  ]

  return (
    <div className='rounded-lg bg-white shadow'>
      <div className='px-4 py-3'>
        <h2 className='text-lg font-bold'>Upcoming Appointments</h2>
      </div>
      <div className='divide-y divide-gray-200 px-4 py-3'>
        {appointments.length === 0 ? (
          <>
            <p className='text-gray-500'>
              You currently have no appointments scheduled.
            </p>
            <button className='mt-4 rounded-full bg-primary py-2 px-4 text-white'>
              Schedule an appointment
            </button>
          </>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className='px-4 py-3'>
              <div className='flex items-center justify-between'>
                <h3 className='text-base font-medium'>
                  {appointment.advisorName}
                </h3>
                <p className='text-sm text-gray-500'>
                  {appointment.date} at {appointment.time}
                </p>
              </div>
              <div className='mt-2 flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{appointment.duration}</p>
                <p className='text-sm text-gray-500'>{appointment.location}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Appointments
