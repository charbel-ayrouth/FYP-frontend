import { useGetTopicsQuery } from '../topicsApiSlice'
import LoadingSpinner from '../../../components/LoadingSpinner'
import AddTopicsForm from './AddTopicsForm'

const AddTopics = ({ handleNext }) => {
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

  let content

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return <p className='text-red-600'>{error?.data.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = topics

    content = (
      <AddTopicsForm
        ids={ids}
        entities={entities}
        handleNext={handleNext}
        step={true}
      />
    )

    return content
  }
}

export default AddTopics
