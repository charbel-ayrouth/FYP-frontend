import React from 'react'
import { useGetDomainsOfUserQuery } from '../../features/domains/domainsApiSlice'
import { Link } from 'react-router-dom'

const SelectedDomains = ({ id }) => {
  const MAX_DOMAINS = 4
  let content = null

  const { data, isSuccess } = useGetDomainsOfUserQuery(id)

  if (isSuccess) {
    content = (
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <Link
          to={'/student/domains'}
          className='text-xl font-bold hover:underline'
        >
          Your Domains
        </Link>
        <ul className='mt-4 flex flex-wrap gap-2'>
          {data.slice(0, MAX_DOMAINS).map((domain) => (
            <li
              key={domain._id}
              className='rounded-full border border-primary bg-gray-50 py-1.5 px-3 text-base text-gray-600'
            >
              {domain.title}
            </li>
          ))}
        </ul>
        {data.length > MAX_DOMAINS && (
          <p className='mt-1 text-gray-500'>
            + {data.length - MAX_DOMAINS} more domains
          </p>
        )}
        <Link
          to='/student/domains'
          className='text-primary hover:underline'
          // className='mt-4 inline-block rounded-full bg-primary px-4 py-2 font-medium text-white'
        >
          Edit Domains
        </Link>
      </div>
    )
  }

  return content
}

export default SelectedDomains
