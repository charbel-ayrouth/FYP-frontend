import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetDomainsQuery, useDeleteDomainMutation } from './domainsApiSlice'

const Domain = ({ domainId }) => {
  const navigate = useNavigate()

  const { domain } = useGetDomainsQuery('domainList', {
    selectFromResult: ({ data }) => ({
      domain: data?.entities[domainId],
    }),
  })

  const [deleteDomain, { isSuccess, isError, error }] =
    useDeleteDomainMutation()

  if (domain) {
    const handleEdit = () => navigate(`/admin/domains/${domainId}`)

    const handleDelete = async (id) => {
      await deleteDomain({ id })
    }

    return (
      <tr className='border-b bg-blue-50'>
        <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
          {domain.title}
        </td>
        <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
          {domain.example}
        </td>
        <td className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
          <button
            onClick={handleEdit}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(domain.id)}
            className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none ml-2'
          >
            Delete
          </button>
        </td>
      </tr>
    )
  } else return null
}

export default Domain
