import React, { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import {
  useGetTopicsOfUserQuery,
  useAddTopicsToUserMutation,
} from '../topicsApiSlice'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../../config/roles'

const AddTopicsForm = ({ ids, entities, handleNext, step }) => {
  const { id, role } = useAuth()
  const navigate = useNavigate()

  const minimized = role.charAt(0).toLowerCase() + role.slice(1)
  const [isStep, setIsStep] = useState(step || false)

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
    if (isSuccessSubmiting && isStep === false) {
      navigate(`/${minimized}`)
    }
    if (isSuccessSubmiting && isStep === true) {
      handleNext()
    }
  }, [
    isSuccess,
    data,
    isSuccessSubmiting,
    navigate,
    isStep,
    handleNext,
    minimized,
  ])

  let content

  if (isLoading) return <LoadingSpinner />

  if (isError) return <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    content = (
      <div>
        <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Choose Your Topics
        </h2>
        {role === ROLES.Supervisor && (
          <p className='mt-4 max-w-2xl text-xl text-gray-500'>
            Select the topics that you're most interested in supervising.
          </p>
        )}
        {role === ROLES.Student && (
          <p className='mt-4 max-w-2xl text-xl text-gray-500'>
            Select the topics that you're most interested in learning about.
          </p>
        )}
        <div className='mx-auto mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {ids.map((id) => (
            <div
              key={id}
              onClick={() => handleSelect(id)}
              className={`${
                selectedTopics.includes(id) ? 'bg-indigo-50 ' : 'bg-white '
              } cursor-pointer rounded-lg border shadow-2xl`}
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
        {isStep ? (
          <div className='flex flex-row-reverse'>
            <button
              onClick={() => addNewTopicToUser({ id, selectedTopics })}
              className='mt-10 rounded-lg bg-primary py-2 px-4 text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
              disabled={isLoadingSubmiting}
            >
              {isLoadingSubmiting ? <LoadingSpinner white={true} /> : 'Submit'}
            </button>
          </div>
        ) : (
          <div className='mt-10 flex flex-row-reverse gap-5'>
            <button
              onClick={() => addNewTopicToUser({ id, selectedTopics })}
              className='rounded-lg bg-primary py-2 px-4 text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
              disabled={isLoadingSubmiting}
            >
              {isLoadingSubmiting ? (
                <LoadingSpinner white={true} />
              ) : (
                'Save Selection'
              )}
            </button>
            <button
              onClick={() => navigate(-1)}
              className='rounded-lg border border-primary bg-white py-2 px-8 text-lg font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white focus:outline-none focus:ring-4'
              disabled={isLoadingSubmiting}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    )
    return content
  }
}

export default AddTopicsForm
