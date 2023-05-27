import React, { useState } from 'react'
import SideBar from './SideBar'
import ProfileFilterBar from './ProfileFilterBar'
import ProjectUnderMeCard from './ProjectUnderMeCard'

const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState('projectUnderMe')

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
  }

  return (
    <div className='justify-center px-4 lg:flex xl:px-28'>
      <div className='flex flex-col items-center gap-20 lg:flex-row lg:items-start lg:gap-40'>
        <SideBar />

        <section>
          <ProfileFilterBar
            handleButtonClick={handleButtonClick}
            activeButton={activeButton}
          />
          {activeButton === 'projectUnderMe' && (
            <>
              <div className='flex flex-row-reverse'>
                <button className='my-6 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'>
                  Add New Project
                </button>
              </div>
              <div className='flex flex-col gap-4'>
                <ProjectUnderMeCard />
                <ProjectUnderMeCard />
                <ProjectUnderMeCard />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
