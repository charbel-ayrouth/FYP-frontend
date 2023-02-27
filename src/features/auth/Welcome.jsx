import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
  const { email, role } = useAuth()

  return (
    <section>
      <p>Welcome {email}</p>
      {role === 'Admin' && (
        <p>
          <Link to={'/dash/users'}>view users settings</Link>
        </p>
      )}
      {role === 'Admin' && (
        <p>
          <Link to={'/dash/users/new'}>add new user</Link>
        </p>
      )}
      {role === 'Supervisor' && <p>Supervisor condition</p>}
      {role === 'Student' && <p>Student condition</p>}
    </section>
  )
}

export default Welcome
