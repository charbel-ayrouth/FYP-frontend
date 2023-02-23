import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserbyId } from './usersApiSlice'
import EditUserForm from './EditUserForm'

const EditUser = () => {
  const { id } = useParams()

  const user = useSelector((state) => selectUserbyId(state, id))

  // to ensure we have the user data before we need it inside the form
  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

  return content
}

export default EditUser
