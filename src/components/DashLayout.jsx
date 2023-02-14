import React from 'react'
import { Outlet } from 'react-router-dom'

const DashLayout = () => {
  return (
    <>
    <div>header</div>
    <Outlet />
    <div>footer</div>
    </>
  )
}

export default DashLayout