import React, { useState } from 'react'
import SupervisorCard from './SupervisorCard'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { useGetSupervisorsQuery } from '../supervisorsApiSlice'

const SupervisorsList = () => {
  const [topicIds, setTopicIds] = useState([])
  const [domainIds, setDomainIds] = useState([])

  const { data, isLoading, isSuccess, isError, error } = useGetSupervisorsQuery(
    {
      tag: 'supervisorsList',
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
    {
      selectFromResult: ({ data }) => ({
        ids: data?.result || [],
        supervisors: data?.entities || {},
      }),
      transformQueryParams: (params) => {
        return {
          topicIds: topicIds,
          domainIds: domainIds,
        }
      },
    }
  )

  const handleTopicFilter = (topicId) => {
    setTopicIds((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    )
  }

  const handleDomainFilter = (domainId) => {
    setDomainIds((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId]
    )
  }

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.message}</p>

  if (isSuccess) {
    const { ids } = data

    content = (
      <div className='flex flex-col items-center gap-8'>
        <h1 className='text-3xl font-bold'>Supervisors</h1>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
          {ids.map((id) => (
            <SupervisorCard key={id} supervisorId={id} />
          ))}
        </div>
      </div>
    )
  }

  return content
}

export default SupervisorsList
