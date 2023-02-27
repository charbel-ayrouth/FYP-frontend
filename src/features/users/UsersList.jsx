import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

const UsersList = () => {
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

  if (isLoading) content = <p>Loading...</p>

  if (isError) content = <p>{error?.data.message}</p>

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null

    content = (
      <div className='overflow-x-auto shadow-md rounded-lg mx-auto w-11/12 lg:w-2/3'>
        <table className='text-gray-500 w-full'>
          <thead className='text-gray-700 uppercase bg-blue-200 '>
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
    )
  }

  return content
}

export default UsersList
