import React, { memo } from 'react'
import { useDeleteTopicMutation, useGetTopicsQuery } from './topicsApiSlice'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

const Topic = ({ topicId }) => {
  const navigate = useNavigate()

  const { topic } = useGetTopicsQuery('topicsList', {
    selectFromResult: ({ data }) => ({
      topic: data?.entities[topicId],
    }),
  })

  const [deleteTopic, { isLoading }] = useDeleteTopicMutation()

  if (topic) {
    const handleEdit = () => navigate(`/admin/topics/${topicId}`)

    const handleDelete = async (id) => {
      await deleteTopic({ id })
    }

    return (
      <tr className='border-b bg-gray-50'>
        <td className='px-6 py-3 font-medium text-black'>{topic.title}</td>
        <td className='whitespace-nowrap px-6 py-3 font-medium'>
          <button
            onClick={handleEdit}
            className='flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            <AiOutlineEdit className='mr-1' />
            Edit
          </button>
          <button
            onClick={() => handleDelete(topic.id)}
            className='ml-2 flex items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300'
            disabled={isLoading}
          >
            <AiOutlineDelete className='mr-1' />
            Delete
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedTopic = memo(Topic)

export default memoizedTopic
