import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetDomainsQuery, useDeleteDomainMutation } from './domainsApiSlice'

const Domain = ({ domainId }) => {
  const navigate = useNavigate()

  const { domain } = useGetDomainsQuery('domainList', {
    selectFromResult: ({ data }) => ({
      domain: data?.entities[domainId],
    }),
  })

  const [deleteDomain, { isLoading }] = useDeleteDomainMutation()

  if (domain) {
    const handleEdit = () => navigate(`/admin/domains/${domainId}`)

    const handleDelete = async (id) => {
      await deleteDomain({ id })
    }

    return (
      <tr className='border-b bg-gray-50'>
        <td className='px-6 py-3 font-medium text-black'>{domain.title}</td>
        <td className='px-6 py-3 font-medium text-black'>{domain.example}</td>
        <td className='whitespace-nowrap px-6 py-3 font-medium'>
          <button
            onClick={handleEdit}
            className='rounded-lg bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(domain.id)}
            className='ml-2 rounded-lg bg-red-700 px-5 py-2.5 text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300'
            disabled={isLoading}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedDomain = memo(Domain)

export default memoizedDomain
