import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import BackgroundSVG from '../../assets/svg/dash-bg.svg'

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div
        className='h-screen bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${BackgroundSVG})` }}
      >
        <div className='container mx-auto flex-grow p-4 xl:px-16'>
          <div className='mt-16'>
            <Outlet />
          </div>
        </div>
      </div>
      <DashFooter />
    </>
  )
}

export default DashLayout
