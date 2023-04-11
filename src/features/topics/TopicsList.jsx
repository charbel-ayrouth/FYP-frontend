import React, { useState } from 'react'
import { useGetTopicsQuery } from './topicsApiSlice'
import Topic from './Topic'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import { AiOutlineUserAdd } from 'react-icons/ai'
import TableFooter from '../../components/Admin/TableFooter'

const TopicsList = () => {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage

  const {
    data: topics,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetTopicsQuery('topicsList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) return <LoadingSpinner />

  if (isError) return <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    const { ids } = topics

    const currentItems = ids.slice(firstItemIndex, lastItemIndex)

    const tableContent =
      ids?.length !== 0 &&
      currentItems.map((topicId) => <Topic key={topicId} topicId={topicId} />)

    content = (
      <div className='mx-auto mt-12 w-11/12 overflow-x-auto rounded-lg shadow-lg lg:w-2/3'>
        <div>
          <div className='overflow-hidden rounded-t-lg'>
            <div className='flex-row items-center justify-between space-y-3 bg-gray-100 p-4 sm:flex sm:space-y-0 sm:space-x-4'>
              <div>
                <h5 className='font-bold'>Topics</h5>
                <p className='font-light'>
                  Manage all your existing topics or add a new one
                </p>
              </div>
              <button
                type='button'
                className='flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primaryDark focus:border-2 focus:outline-none focus:ring-primaryLight'
                onClick={() => navigate('/admin/topics/new')}
              >
                <AiOutlineUserAdd className='mr-1' />
                Add new topic
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

export default TopicsList
