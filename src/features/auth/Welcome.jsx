import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <section>
      <p>
        <Link to={'/dash/users'}>view users settings</Link>
      </p>
      <p>
        <Link to={'/dash/users/new'}>add new user</Link>
      </p>
    </section>
  )
}

export default Welcome
