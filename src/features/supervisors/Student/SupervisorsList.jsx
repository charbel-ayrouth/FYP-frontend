import React from 'react'
import SupervisorCard from './SupervisorCard'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { useGetSupervisorsQuery } from '../supervisorsApiSlice'
import { useLocation } from 'react-router-dom'

const SupervisorsList = () => {
  const location = useLocation()
  const state = location.state

  const { data, isLoading, isSuccess, isError, error } = useGetSupervisorsQuery(
    { id: state.data },
    {
      tag: 'supervisorsList',
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  )

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) {
    content = <p className='text-red-600'>{error?.data.message}</p>
  }

  if (isSuccess) {
    content = (
      <div className='flex flex-col items-center gap-8'>
        <h1 className='text-3xl font-bold'>Supervisors</h1>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
          {data.map((supervisor) => (
            <SupervisorCard key={supervisor.id} supervisor={supervisor} />
          ))}
        </div>
      </div>
    )
  }

  return content
}

export default SupervisorsList
