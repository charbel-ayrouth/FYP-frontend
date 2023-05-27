import React from 'react'

const ProfileFilterBar = ({ handleButtonClick, activeButton }) => {
  return (
    <div>
      <div className='flex'>
        <button
          className={`rounded-t-lg border-b-primary py-2 px-4 transition-colors duration-200 hover:bg-primaryLight hover:text-white ${
            activeButton === 'projectUnderMe' ? 'border-b-2' : ''
          }`}
          onClick={() => handleButtonClick('projectUnderMe')}
        >
          Project Under me
        </button>
        <button
          className={`rounded-t-lg border-b-primary py-2 px-4 transition-colors duration-200 hover:bg-primaryLight hover:text-white ${
            activeButton === 'projectIdeas' ? 'border-b-2' : ''
          }`}
          onClick={() => handleButtonClick('projectIdeas')}
        >
          Project Ideas
        </button>
        <button
          className={`rounded-t-lg border-b-primary py-2 px-4 transition-colors duration-200 hover:bg-primaryLight hover:text-white ${
            activeButton === 'studentsRequest' ? 'border-b-2' : ''
          }`}
          onClick={() => handleButtonClick('studentsRequest')}
        >
          Students Request
        </button>
        <button
          className={`rounded-t-lg border-b-primary py-2 px-4 transition-colors duration-200 hover:bg-primaryLight ${
            activeButton === 'settings' ? 'border-b-2  hover:text-white' : ''
          }`}
          onClick={() => handleButtonClick('settings')}
        >
          Settings
        </button>
      </div>
    </div>
  )
}

export default ProfileFilterBar
