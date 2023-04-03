import React, { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import {
  useGetTopicsOfUserQuery,
  useAddTopicsToUserMutation,
} from '../topicsApiSlice'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AddTopicsForm = ({ ids, entities }) => {
  const { id } = useAuth()
  const navigate = useNavigate()

  const [selectedTopics, setSelectedTopics] = useState([])

  const handleSelect = (id) => {
    if (selectedTopics.includes(id)) {
      setSelectedTopics((prevState) => prevState.filter((item) => item !== id))
    } else {
      setSelectedTopics((prevState) => [...prevState, id])
    }
  }

  const { data, isError, isLoading, error, isSuccess } =
    useGetTopicsOfUserQuery(id)

  const [
    addNewTopicToUser,
    { isSuccess: isSuccessSubmiting, isLoading: isLoadingSubmiting },
  ] = useAddTopicsToUserMutation()

  useEffect(() => {
    if (isSuccess) {
      setSelectedTopics(data)
    }
    if (isSuccessSubmiting) {
      navigate('/supervisor')
    }
  }, [isSuccess, data, isSuccessSubmiting, navigate])

  let content

  if (isLoading) return <LoadingSpinner />

  if (isError) return <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    content = (
      <div className='min-h-screen bg-gray-100'>
        <div className='container mx-auto px-4 py-12 sm:px-6 lg:py-24 lg:px-8'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Choose Your Topics
          </h2>
          <p className='mt-4 max-w-2xl text-xl text-gray-500'>
            Select the topics that you're most interested in supervising.
          </p>
          <div className='mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3'>
            {ids.map((id) => (
              <div
                key={id}
                onClick={() => handleSelect(id)}
                className={`${
                  selectedTopics.includes(id) ? 'bg-indigo-50 ' : 'bg-white '
                } cursor-pointer rounded-lg shadow-sm`}
              >
                <div className='flex items-center justify-between px-4 py-4'>
                  <div className='text-lg font-medium text-gray-900'>
                    {entities[id].title}
                  </div>
                  {selectedTopics.includes(id) && (
                    <div className='flex-shrink-0'>
                      <FaCheck className='text-green-400' />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='mt-10'>
            <button
              onClick={() => addNewTopicToUser({ id, selectedTopics })}
              className='rounded-lg bg-primary py-2 px-4 font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
              disabled={isLoadingSubmiting}
            >
              Save Selection
            </button>
          </div>
        </div>
      </div>
    )
    return content
  }
}

export default AddTopicsForm
