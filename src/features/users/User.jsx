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
      <tr
        className={`border-b ${!user.active ? 'bg-lightGrey' : 'bg-gray-50'}`}
      >
        <td className='whitespace-nowrap px-6 py-3 font-medium text-black'>
          {user.email}
        </td>
        <td className='whitespace-nowrap px-6 py-3 font-medium text-black'>
          {user.role}
        </td>
        <td className='whitespace-nowrap px-6 py-3 font-medium text-black'>
          <button
            onClick={handleEdit}
            className='rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className='ml-2 rounded-lg bg-red-700 px-5 py-2.5 font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300'
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
