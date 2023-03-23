import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
  const { email } = useAuth()

  return (
    <section className='mx-auto space-y-3'>
      <p>Welcome {email}</p>
    </section>
  )
}

export default Welcome
