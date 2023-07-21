import React from 'react'
import Overview from '../Student/Overview'
import Appointments from '../Student/Appointments'
import Notifications from '../../features/notifications/Supervisor/Notifications'
import Settings from '../Student/Settings'
import Help from '../Student/Help'
import SelectedTopics from '../../features/topics/Supervisor/SelectedTopics'
import SelectedDomains from '../../features/domains/Supervisor/SelectedDomains'
import useAuth from '../../hooks/useAuth'
import ConnectionsRequest from './ConnectionsRequest'
import SupervisorAvailability from './SupervisorAvailability'

const Dashboard = () => {
  const { username, id, role } = useAuth()

  return (
    <div className='px-4 xl:px-28'>
      <h1 className='text-3xl font-bold'>Welcome back, {username}</h1>
      <p className='mt-4 mb-12 text-lg'>
        Thank you for being an advisor for the Final Year Projects. Please
        choose your availability to schedule meetings and assist the students.
      </p>
      <SupervisorAvailability id={id} />
      <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
        <div className='flex flex-col gap-4 lg:w-[66%]'>
          <Overview id={id} />

          <ConnectionsRequest id={id} />

          <SelectedTopics id={id} />

          <Settings />
        </div>
        <div className='flex flex-col gap-4 lg:w-[30%]'>
          <Appointments id={id} advisor={true} role={role} />

          <Notifications id={id} />

          <SelectedDomains id={id} />

          <Help />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
