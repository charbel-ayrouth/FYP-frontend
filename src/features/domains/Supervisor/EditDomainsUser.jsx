import LoadingSpinner from '../../../components/LoadingSpinner'
import { useGetDomainsQuery } from '../domainsApiSlice'
import EditDomainsFormUser from './EditDomainsFormUser'

const EditDomainsUser = () => {
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

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    const { ids, entities } = domains

    content = <EditDomainsFormUser ids={ids} entities={entities} />
  }
  return content
}

export default EditDomainsUser
