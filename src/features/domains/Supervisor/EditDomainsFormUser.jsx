import React, { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {
  useGetDomainsOfUserQuery,
  useAddDomainsToUserMutation,
} from '../domainsApiSlice'
import { ROLES } from '../../../config/roles'

const EditDomainsFormUser = ({ ids, entities }) => {
  const { id, role } = useAuth()
  const navigate = useNavigate()

  const minimized = role.charAt(0).toLowerCase() + role.slice(1)

  const [selectedDomains, setSelectedDomains] = useState([])

  const handleSelect = (selectedId) => {
    if (selectedDomains.includes(selectedId)) {
      setSelectedDomains((prevState) =>
        prevState.filter((item) => item !== selectedId)
      )
    } else {
      setSelectedDomains((prevState) => [...prevState, selectedId])
    }
  }

  const { data, isError, isLoading, error, isSuccess } =
    useGetDomainsOfUserQuery(id)

  const [
    addNewDomainToUser,
    { isSuccess: isSuccessSubmiting, isLoading: isLoadingSubmiting },
  ] = useAddDomainsToUserMutation()

  // useEffect(() => {
  //   if (isSuccess) {
  //     setSelectedDomains(data)
  //   }
  //   if (isSuccessSubmiting) {
  //     navigate(`/${minimized}`)
  //   }
  // }, [
  //   isSuccess,
  //   data,
  //   isSuccessSubmiting,
  //   navigate,
  //   minimized,
  //   setSelectedDomains,
  // ])

  useEffect(() => {
    if (isSuccess) {
      setSelectedDomains(data)
    }
    if (isSuccessSubmiting) {
      navigate('/student')
    }
  }, [isSuccess, data, isSuccessSubmiting, navigate])

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    content = (
      <div>
        <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Choose Your Domains
        </h2>
        {role === ROLES.Supervisor && (
          <p className='mt-4 max-w-2xl text-xl text-gray-500'>
            Select the domains that you're most interested in supervising.
          </p>
        )}
        {role === ROLES.Student && (
          <p className='mt-4 max-w-2xl text-xl text-gray-500'>
            Select the domains that you're interested in learning more about.
          </p>
        )}
        <div className='mx-auto mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {ids.map((id) => (
            <div
              key={id}
              onClick={() => handleSelect(id)}
              className={`${
                selectedDomains.includes(id) ? 'bg-indigo-50 ' : 'bg-white '
              } cursor-pointer rounded-lg border px-4 py-4 shadow-2xl`}
            >
              <div className='flex items-center justify-between'>
                <div className='text-lg font-medium text-gray-900'>
                  {entities[id].title}
                </div>
                {selectedDomains.includes(id) && (
                  <div className='flex-shrink-0'>
                    <FaCheck className='text-green-400' />
                  </div>
                )}
              </div>
              {entities[id].example && (
                <p className='font-light text-gray-500'>
                  {entities[id].example}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className='mt-10 flex gap-5'>
          <button
            onClick={() => addNewDomainToUser({ id, selectedDomains })}
            className='rounded-lg bg-primary py-2 px-4 text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
            disabled={isLoadingSubmiting}
          >
            Save Selection
          </button>
          <button
            onClick={() => navigate(-1)}
            className='rounded-lg border border-primary bg-white py-2 px-8 text-lg font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white focus:outline-none focus:ring-4'
            disabled={isLoadingSubmiting}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
  return content
}

export default EditDomainsFormUser
