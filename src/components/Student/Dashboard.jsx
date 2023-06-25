import React from 'react'
import Overview from './Overview'
import Appointments from './Appointments'
import AdvisorDirectory from '../../features/supervisors/Student/AdvisorDirectory'
import Notifications from '../../features/notifications/Supervisor/Notifications'
import Settings from './Settings'
import Help from './Help'
import SelectedTopics from '../../features/topics/Supervisor/SelectedTopics'
import SelectedDomains from '../../features/domains/Supervisor/SelectedDomains'
import useAuth from '../../hooks/useAuth'
import AvailabilityScheduler from './AvailabilityScheduler'
import { useOverviewQuery } from '../../features/profile/profileApiSlice'
import LoadingSpinner from '../LoadingSpinner'

const Dashboard = () => {
  const { username, id } = useAuth()
  const { data, isLoading, isError, error, isSuccess } = useOverviewQuery(id)

  return (
    <div className='px-4 xl:px-28'>
      <h1 className='text-3xl font-bold'>Welcome back, {username}</h1>
      <p className='mt-4 mb-12 text-lg'>
        Connect with the appropriate project supervisor to kickstart your Final
        Year Project journey.
      </p>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.connections > 0 && <AvailabilityScheduler id={id} />
      ) : null}

      <div className='flex flex-col gap-4 lg:flex-row lg:gap-8'>
        <div className='flex flex-col gap-4'>
          <Overview data={data} isSuccess={isSuccess} />

          <AdvisorDirectory id={id} />

          <SelectedTopics id={id} />

          <Settings />
        </div>
        <div className='flex flex-col gap-4'>
          {isLoading ? (
            <LoadingSpinner />
          ) : isSuccess ? (
            data.connections > 0 && <Appointments />
          ) : null}

          <Notifications id={id} />

          <SelectedDomains id={id} />

          <Help />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
