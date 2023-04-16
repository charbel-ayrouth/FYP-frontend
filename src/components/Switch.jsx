import React from 'react'

function Switch({ isOn, handleClick }) {
  const switchClass = `
    ${!isOn ? 'bg-primary' : 'bg-gray-300'}
    relative inline-flex items-center h-6 rounded-full w-11
    transition-colors ease-in-out duration-300
    focus:outline-none
  `

  const knobClass = `
    ${!isOn ? 'translate-x-6' : 'translate-x-1'}
    inline-block w-5 h-5 transform bg-white rounded-full
    transition-transform ease-in-out duration-300
  `

  return (
    <button type='button' className={switchClass} onClick={handleClick}>
      <span className={knobClass} />
    </button>
  )
}

export default Switch
