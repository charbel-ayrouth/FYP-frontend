import React from 'react'
import { useGetDomainsQuery } from './domainsApiSlice'
import { useNavigate } from 'react-router-dom'
import Domain from './Domain'

const DomainsList = () => {
  const navigate = useNavigate()

  const {
    data: domains,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetDomainsQuery('domainsList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>{error?.data.message}</p>

  if (isSuccess) {
    const { ids } = domains

    const tableContent =
      ids?.length !== 0 &&
      ids.map((domainId) => <Domain key={domainId} domainId={domainId} />)

    content = (
      <div className='overflow-x-auto shadow-md rounded-lg mx-auto w-11/12 lg:w-2/3'>
        <table className='text-gray-500 w-full'>
          <thead className='text-gray-700 uppercase bg-blue-200 '>
            <tr>
              <th scope='col' className='px-6 py-3 text-left'>
                Title
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Example
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

export default DomainsList
