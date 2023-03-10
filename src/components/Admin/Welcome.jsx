import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
  const { email, role } = useAuth()

  return (
    <section className='mx-auto w-96 space-y-3'>
      <p>Welcome {email}</p>
      <p>
        <Link to={'/admin/users'}>view users settings</Link>
      </p>

      <p>
        <Link to={'/admin/users/new'}>add new user</Link>
      </p>

      <p>
        <Link to={'/admin/topics'}>view topics</Link>
      </p>

      <p>
        <Link to={'/admin/topics/new'}>add new topic</Link>
      </p>

      <p>
        <Link to={'/admin/domains'}>view domains</Link>
      </p>

      <p>
        <Link to={'/admin/domains/new'}>add new domain</Link>
      </p>
    </section>
  )
}

export default Welcome
