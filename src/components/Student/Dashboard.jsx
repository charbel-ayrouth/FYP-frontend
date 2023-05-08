import React from 'react'
import Overview from './Overview'
import Appointments from './Appointments'
import AdvisorDirectory from './AdvisorDirectory'
import Notifications from './Notifications'
import Settings from './Settings'
import Help from './Help'
import SelectedTopics from './SelectedTopics'
import SelectedDomains from './SelectedDomains'
import useAuth from '../../hooks/useAuth'

const Dashboard = () => {
  const { username, id } = useAuth()

  return (
    <div className='px-4 xl:px-28'>
      <h1 className='mb-12 text-3xl font-bold'>Welcome back, {username}</h1>
      <div className='flex flex-col gap-4 lg:flex-row lg:gap-8'>
        <div className='flex flex-col gap-4'>
          <Overview id={id} />

          <AdvisorDirectory id={id} />

          <SelectedTopics id={id} />

          <Settings />
        </div>
        <div className='flex flex-col gap-4'>
          <Appointments />

          <Notifications id={id} />

          <SelectedDomains id={id} />

          <Help />
        </div>
      </div>
      {/* <div className='grid grid-flow-row-dense gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className='col-span-2 row-span-2'>
          <Overview />
        </div>
        <div className='col-span-2 row-span-2 md:col-span-1'>
          <Appointments />
        </div>
        <div className='col-span-2 row-span-2'>
          <AdvisorDirectory />
        </div>
        <div className='col-span-2 row-span-2 md:col-span-1'>
          <Notifications />
        </div>
        <div className='col-span-2 row-span-2'>
          <Settings />
        </div>
        <div className='col-span-2 row-span-2 md:col-span-1'>
          <Help />
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard
