import React, { useState } from 'react'
import './Stepper.css'
import ProfileForm from '../../features/profile/ProfileForm'
import AddTopics from '../../features/topics/Supervisor/AddTopics'
import AddDomains from '../../features/domains/Supervisor/AddDomains'

const Stepper = () => {
  const [currentActive, setCurrentActive] = useState(1)

  const circles = [1, 2, 3]

  const handleNext = () => {
    const nextActive = currentActive + 1
    setCurrentActive(nextActive > circles.length ? circles.length : nextActive)
  }

  const handlePrev = () => {
    const prevActive = currentActive - 1
    setCurrentActive(prevActive < 1 ? 1 : prevActive)
  }

  const progressWidth = `${((currentActive - 1) / (circles.length - 1)) * 100}%`

  const renderStep = () => {
    switch (currentActive) {
      case 1:
        return <ProfileForm handleNext={handleNext} />
        break
      case 2:
        return <AddTopics handleNext={handleNext} step={true} />
        break
      case 3:
        return <AddDomains step={true} />
        break

      default:
        return null
    }
  }

  return (
    <>
      <div className='progress-container mx-auto mb-8 flex w-full max-w-md justify-between'>
        <div className='progress' style={{ width: progressWidth }} />
        {circles.map((circle) => (
          <div
            key={circle}
            className={`circle ${currentActive >= circle ? 'active' : ''}`}
          >
            {circle}
          </div>
        ))}
      </div>
      {renderStep()}
    </>
  )
}

export default Stepper
