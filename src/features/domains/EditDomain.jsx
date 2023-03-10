import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetDomainsQuery } from './domainsApiSlice'
import EditDomainForm from './EditDomainForm'

const EditDomain = () => {
  const { id } = useParams()

  const { domain } = useGetDomainsQuery('domainsList', {
    selectFromResult: ({ data }) => ({
      domain: data?.entities[id],
    }),
  })

  const content = domain ? (
    <EditDomainForm domain={domain} />
  ) : (
    <p>Loading...</p>
  )

  return content
}

export default EditDomain
