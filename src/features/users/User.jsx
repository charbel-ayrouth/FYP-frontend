import { useNavigate } from 'react-router-dom'
import { useDeleteUserMutation } from './usersApiSlice'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({ userId }) => {
  const navigate = useNavigate()

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  })

  const [deleteUser, { isSuccess, isError, isLoading }] =
    useDeleteUserMutation()

  if (user) {
    const handleEdit = () => navigate(`/admin/users/${userId}`)

    const handleDelete = async (id) => {
      await deleteUser({ id: id })
    }

    return (
      <tr className={`border-b ${!user.active ? 'bg-gray-50' : 'bg-blue-50'}`}>
        <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
          {user.email}
        </td>
        <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
          {user.role}
        </td>
        <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
          <button
            onClick={handleEdit}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none ml-2'
          >
            Delete
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedUser = memo(User)

export default memoizedUser
