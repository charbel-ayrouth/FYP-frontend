import React, { useState } from 'react'
import { useGetDomainsQuery } from './domainsApiSlice'
import { useNavigate } from 'react-router-dom'
import Domain from './Domain'
import LoadingSpinner from '../../components/LoadingSpinner'
import { AiOutlineUserAdd } from 'react-icons/ai'
import TableFooter from '../../components/Admin/TableFooter'

const DomainsList = () => {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage

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

  if (isLoading) return <LoadingSpinner />

  if (isError) return <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    const { ids } = domains

    const currentItems = ids.slice(firstItemIndex, lastItemIndex)

    const tableContent =
      ids?.length !== 0 &&
      currentItems.map((domainId) => (
        <Domain key={domainId} domainId={domainId} />
      ))

    content = (
      <div className='mx-auto mt-12 w-11/12 overflow-x-auto rounded-lg shadow-lg lg:w-2/3'>
        <div>
          <div className='overflow-hidden rounded-t-lg'>
            <div className='flex-row items-center justify-between space-y-3 bg-gray-100 p-4 sm:flex sm:space-y-0 sm:space-x-4'>
              <div>
                <h5 className='font-bold'>Domains</h5>
                <p className='font-light'>
                  Manage all your existing domains or add a new one
                </p>
              </div>
              <button
                type='button'
                className='flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primaryDark focus:border-2 focus:outline-none focus:ring-primaryLight'
                onClick={() => navigate('/admin/domains/new')}
              >
                <AiOutlineUserAdd className='mr-1' />
                Add new domain
              </button>
            </div>
          </div>
          <table className='w-full text-darkGrey shadow-lg'>
            <thead className='border-b bg-gray-50 uppercase text-black'>
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

export default DomainsList
