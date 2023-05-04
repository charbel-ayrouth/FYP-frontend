import React from 'react'
import SupervisorCard from './SupervisorCard'
import LoadingSpinner from '../../../components/LoadingSpinner'
import {
  useGetRecommendedSupervisorsQuery,
  useGetOtherSupervisorsQuery,
} from '../supervisorsApiSlice'
import useAuth from '../../../hooks/useAuth'

const SupervisorsList = () => {
  const { id } = useAuth()

  const { data, isLoading, isSuccess, isError, error } =
    useGetRecommendedSupervisorsQuery(
      { id },
      {
        // tag: 'supervisorsList',
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
      }
    )

  const {
    data: dataOther,
    isLoading: isLoadingOther,
    isSuccess: isSuccessOther,
    isError: isErrorOther,
    error: errorOther,
  } = useGetOtherSupervisorsQuery(
    { id },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  )

  let content

  if (isLoading || isLoadingOther) content = <LoadingSpinner />

  if (isError || isErrorOther) {
    content = (
      <>
        {isError && <p className='text-red-600'>{error?.data.message}</p>}
        {isErrorOther && <p className='text-red-600'>{error?.data.message}</p>}
      </>
    )
  }

  if (isSuccess && isSuccessOther) {
    content = (
      <>
        {data.length !== 0 && (
          <div className='mb-8 flex flex-col items-center gap-8'>
            <h1 className='text-3xl font-bold'>Recomended Supervisors</h1>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
              {data.map((supervisor) => (
                <SupervisorCard key={supervisor._id} supervisor={supervisor} />
              ))}
            </div>
          </div>
        )}
        {dataOther.length !== 0 && (
          <div className='flex flex-col items-center gap-8'>
            <h1 className='text-3xl font-bold'>Other Supervisors</h1>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
              {dataOther.map((supervisor) => (
                <SupervisorCard key={supervisor._id} supervisor={supervisor} />
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  return content
}

export default SupervisorsList
