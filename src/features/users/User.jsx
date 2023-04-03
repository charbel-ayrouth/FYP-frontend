import { useNavigate } from 'react-router-dom'
import { useDeleteUserMutation } from './usersApiSlice'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'
import Modal from '../../components/Modal'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

const User = ({ userId }) => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  })

  const [deleteUser, { isLoading }] = useDeleteUserMutation()

  if (user) {
    const handleEdit = () => navigate(`/admin/users/${userId}`)

    const handleDelete = async (id) => {
      await deleteUser({ id: id })
    }

    return (
      <>
        <Modal open={isOpen}>
          <div className='mb-4 flex justify-between sm:mb-5'>
            <h3 className='text-lg font-semibold text-gray-900 md:text-xl'>
              Warning
            </h3>
            <button
              type='button'
              className='inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineClose />
            </button>
          </div>
          <p>
            Are you sure you want to delete {user.email} ? <br /> This action
            cannot be undone.
          </p>
          <div className='flex'>
            <button
              type='button'
              className='ml-auto rounded-lg bg-red-600 px-5 py-2.5 text-center font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300'
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </Modal>
        <tr
          className={`border-b ${!user.active ? 'bg-lightGrey' : 'bg-gray-50'}`}
        >
          <td className='px-6 py-3 font-medium text-black'>{user.email}</td>
          <td className='px-6 py-3 font-medium text-black'>{user.role}</td>
          <td className='flex whitespace-nowrap px-6 py-3 font-medium'>
            <button
              onClick={handleEdit}
              className='flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
            >
              <AiOutlineEdit className='mr-1' />
              Edit
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className='ml-2 flex items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300'
              disabled={isLoading}
            >
              <AiOutlineDelete className='mr-1' />
              Delete
            </button>
          </td>
        </tr>
      </>
    )
  } else return null
}

// it change only if props have changed
const memoizedUser = memo(User)

export default memoizedUser
