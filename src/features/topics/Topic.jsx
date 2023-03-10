import React from 'react'
import { useDeleteTopicMutation, useGetTopicsQuery } from './topicsApiSlice'
import { useNavigate } from 'react-router-dom'

const Topic = ({ topicId }) => {
  const navigate = useNavigate()

  const { topic } = useGetTopicsQuery('topicsList', {
    selectFromResult: ({ data }) => ({
      topic: data?.entities[topicId],
    }),
  })

  const [deleteTopic, { isSuccess, isError, error }] = useDeleteTopicMutation()

  if (topic) {
    const handleEdit = () => navigate(`/admin/topics/${topicId}`)

    const handleDelete = async (id) => {
      await deleteTopic({ id })
    }

    return (
      <tr className='border-b bg-blue-50'>
        <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
          {topic.title}
        </td>
        <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
          <button
            onClick={handleEdit}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(topic.id)}
            className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none ml-2'
          >
            Delete
          </button>
        </td>
      </tr>
    )
  } else return null
}

export default Topic
