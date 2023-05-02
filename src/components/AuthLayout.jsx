import React from 'react'
import BackgroundSVG from '../assets/svg/blob-scene-haikei.svg'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <section
      className='aspect-auto w-full bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${BackgroundSVG})` }}
    >
      <div className='mx-auto flex h-screen flex-col items-center justify-center px-6 py-8'>
        <Outlet />
      </div>
    </section>
  )
}

export default AuthLayout
