import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUsersbyId } from './usersApiSlice'
import React from 'react'

const User = ({ userId }) => {
  const user = useSelector((state) => selectUsersbyId(state, userId))
  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)
    const cellStatus = user.active ? '' : 'inactive class name'

    return (
      <tr>
        <td>{user.username}</td>
        <td>{user.role}</td>
        <td>
          <button onClick={handleEdit}>Edit</button>
        </td>
      </tr>
    )
  } else return null
}

export default User
