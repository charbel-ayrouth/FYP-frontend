import React, { useState } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { AiOutlineUserAdd } from 'react-icons/ai'
import TableFooter from '../../components/Admin/TableFooter'

const UsersList = () => {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    const { ids } = users

    const currentItems = ids.slice(firstItemIndex, lastItemIndex)

    content = (
      <div className='mx-auto w-11/12 overflow-x-auto rounded-lg bg-gray-50 shadow-lg lg:w-2/3'>
        <div>
          {/* Table Header */}
          <div className='overflow-hidden rounded-t-lg'>
            <div className='flex-row items-center justify-between space-y-3 border-b bg-gray-50 p-4 sm:flex sm:space-y-0 sm:space-x-4'>
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
                <AiOutlineUserAdd className='mr-1' />
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
            <tbody>
              {ids?.length
                ? currentItems.map((userId) => (
                    <User key={userId} userId={userId} />
                  ))
                : null}
            </tbody>
          </table>
          {/* Pagination */}
          <TableFooter
            totalItems={ids.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            lastItemIndex={lastItemIndex}
            firstItemIndex={firstItemIndex}
          />
        </div>
      </div>
    )
  }

  return content
}

export default UsersList
