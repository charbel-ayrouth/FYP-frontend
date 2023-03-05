import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const EditUser = () => {
  const { id } = useParams()

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })

  // to ensure we have the user data before we need it inside the form
  const content = user ? <EditUserForm user={user} /> : <PulseLoader />

  return content
}

export default EditUser
