import React from 'react'
import { useGetTopicsQuery } from './topicsApiSlice'
import Topic from './Topic'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'

const TopicsList = () => {
  const navigate = useNavigate()

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

    const tableContent =
      ids?.length !== 0 &&
      ids.map((topicId) => <Topic key={topicId} topicId={topicId} />)

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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-2 -ml-1 h-3.5 w-3.5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
                </svg>
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
        </div>
      </div>
    )
  }

  return content
}

export default TopicsList
