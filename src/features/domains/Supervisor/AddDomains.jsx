import AddDomainsForm from './AddDomainsForm'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { useGetDomainsQuery } from '../domainsApiSlice'

const AddDomains = ({ step }) => {
  const {
    data: domains,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetDomainsQuery('domainsList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    console.log(error)
    return <p className='text-red-600'>{error?.data.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = domains

    content = <AddDomainsForm ids={ids} entities={entities} step={step} />

    return content
  }
}

export default AddDomains
