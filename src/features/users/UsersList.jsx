import React, { useState } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'

const UsersList = () => {
  const navigate = useNavigate()

  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const goToPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1))
  }

  const goToNext = () => {
    setPageNumber(Math.min(totalPages - 1, pageNumber + 1))
  }

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(pageNumber, 'usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null

    content = (
      <div className='mx-auto w-11/12 overflow-x-auto rounded-lg bg-gray-50 shadow-lg lg:w-2/3'>
        <div>
          {/* Table Header */}
          <div className='overflow-hidden rounded-t-lg'>
            <div className='flex-row items-center justify-between space-y-3 bg-gray-100 p-4 sm:flex sm:space-y-0 sm:space-x-4'>
              <div>
                <h5 className='font-bold'>Users</h5>
                <p className='font-light'>
                  Manage all your existing users or add a new one
                </p>
              </div>
              <button
                type='button'
                className='flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primaryDark focus:border-2 focus:outline-none focus:ring-primaryLight'
                onClick={() => navigate('/admin/users/new')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-2 -ml-1 h-3.5 w-3.5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
                </svg>
                Add new user
              </button>
            </div>
          </div>
          {/* End Table Header */}
          <table className='w-full text-darkGrey shadow-lg'>
            <thead className='border-b bg-gray-50 uppercase text-black'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3 text-left'>
                  Roles
                </th>
                <th scope='col' className='px-6 py-3 text-left'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    )
  }

  return content
}

export default UsersList
