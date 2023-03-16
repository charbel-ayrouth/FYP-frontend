import React from 'react'
import {
  useGetTopicsQuery,
  useAddTopicsToUserMutation,
} from '../topicsApiSlice'
import { selectAllTopics } from '../topicsApiSlice'
import { useSelector } from 'react-redux'

const AddTopics = () => {
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

  const [
    addTopicsToUser,
    {
      isLoading: isLoadingAdd,
      isError: isErrorAdd,
      error: errorAdd,
      isSuccess: isSuccessAdd,
    },
  ] = useAddTopicsToUserMutation()

  let content

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>{error?.data.message}</p>

  if (isSuccess) {
    const { ids, entities } = topics

    return (content =
      ids?.length === 0 ? (
        <div>No Topics found</div>
      ) : (
        <>
          <h1>success</h1>
          <div>
            {ids.map((id) => {
              return (
                <h2 key={id} className=' text-red-600'>
                  {entities[id].title}
                </h2>
              )
            })}
          </div>
        </>
      ))
  }
}

export default AddTopics
