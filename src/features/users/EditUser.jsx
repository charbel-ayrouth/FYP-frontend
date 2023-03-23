import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import LoadingSpinner from '../../components/LoadingSpinner'

const EditUser = () => {
  const { id } = useParams()

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })

  // to ensure we have the user data before we need it inside the form
  const content = user ? <EditUserForm user={user} /> : <LoadingSpinner />

  return content
}

export default EditUser
