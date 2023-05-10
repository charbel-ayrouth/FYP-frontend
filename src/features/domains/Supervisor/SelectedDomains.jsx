import React from 'react'
import { useGetDomainsOfUserQuery } from '../domainsApiSlice'
import { Link, useLocation } from 'react-router-dom'

const SelectedDomains = ({ id }) => {
  const MAX_DOMAINS = 4
  let content = null
  const { pathname } = useLocation()

  const { data, isSuccess } = useGetDomainsOfUserQuery(id)

  if (isSuccess) {
    content = (
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <Link
          to={`/${pathname.split('/')[1]}/domains`}
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
        <div className='mt-4'>
          <Link
            to={`/${pathname.split('/')[1]}/domains`}
            className='text-primary hover:underline'
          >
            Edit Domains
          </Link>
        </div>
      </div>
    )
  }

  return content
}

export default SelectedDomains
