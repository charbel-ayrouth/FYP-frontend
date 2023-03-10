import React from 'react'
import { useGetTopicsQuery } from './topicsApiSlice'
import Topic from './Topic'

const TopicsList = () => {
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

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>{error?.data.message}</p>

  if (isSuccess) {
    const { ids } = topics

    const tableContent =
      ids?.length !== 0 &&
      ids.map((topicId) => <Topic key={topicId} topicId={topicId} />)

    content = (
      <div className='overflow-x-auto shadow-md rounded-lg mx-auto w-11/12 lg:w-2/3'>
        <table className='text-gray-500 w-full'>
          <thead className='text-gray-700 uppercase bg-blue-200 '>
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
    )
  }

  return content
}

export default TopicsList
