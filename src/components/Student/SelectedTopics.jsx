import React from 'react'
import { useGetTopicsOfUserQuery } from '../../features/topics/topicsApiSlice'
import { Link } from 'react-router-dom'

const SelectedTopics = ({ id }) => {
  const MAX_TOPICS = 4
  let content = null

  const { data, isSuccess } = useGetTopicsOfUserQuery(id)

  if (isSuccess) {
    content = (
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <Link
          to={'/student/topics'}
          className='text-xl font-bold hover:underline'
        >
          Your Topics
        </Link>
        <ul className='mt-4 flex flex-wrap gap-2'>
          {data.slice(0, MAX_TOPICS).map((topic) => (
            <li
              key={topic._id}
              className='rounded-full border border-primary bg-gray-50 py-1.5 px-3 text-base text-gray-600'
            >
              {topic.title}
            </li>
          ))}
        </ul>
        {data.length > MAX_TOPICS && (
          <p className='mt-1 text-gray-500'>
            + {data.length - MAX_TOPICS} more topics
          </p>
        )}
        <Link
          to='/student/topics'
          className='mt-4 text-primary hover:underline'
          // className='mt-4 inline-block rounded-full bg-primary px-4 py-2 font-medium text-white'
        >
          Edit Topics
        </Link>
      </div>
    )
  }

  return content
}

export default SelectedTopics
