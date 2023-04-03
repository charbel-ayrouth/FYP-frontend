import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <div className='flex h-screen flex-col'>
      <DashHeader />
      <div className='container mx-auto flex-grow'>
        <Outlet />
      </div>
      <DashFooter />
    </div>
  )
}

export default DashLayout
