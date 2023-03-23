import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Landing Page/Header'
import Hero from './Landing Page/Hero'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Hero />
    </>
  )
}

export default LandingPage
