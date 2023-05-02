import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const StudentLandingPage = () => {
  const { username, id } = useAuth()

  const [data, setData] = useState(id)

  return (
    <div className='px-4 xl:px-40'>
      <h1 className='mb-12 text-3xl font-bold'>Welcome back, {username}</h1>
      <div className='grid grid-flow-row-dense gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div
          id='one'
          className='relative rounded-lg bg-sky-500 p-16 sm:row-span-2'
        >
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>
            Profile
          </h4>
        </div>
        <div
          id='two'
          className='relative rounded-lg bg-sky-500 p-16 sm:col-span-2'
        >
          <Link
            to={'/student/connections'}
            state={{ data: data }}
            className='absolute top-2 left-2 text-xl font-semibold'
          >
            Recommended Supervisors
          </Link>
        </div>
        <div id='three' className='relative rounded-lg bg-sky-500 p-16'>
          <Link
            to={'/student/topics'}
            className='absolute top-2 left-2 text-xl font-semibold'
          >
            Topics
          </Link>
        </div>
        <div
          id='four'
          className='relative rounded-lg bg-sky-500 p-16 sm:col-span-2'
        >
          <Link
            to={'/student/notifications'}
            className='absolute top-2 left-2 text-xl font-semibold'
          >
            Notifications
          </Link>
        </div>
        <div id='five' className='relative rounded-lg bg-sky-500 p-16'>
          <Link
            to={'/student/domains'}
            className='absolute top-2 left-2 text-xl font-semibold'
          >
            Domains
          </Link>
        </div>
        <div id='six' className='relative rounded-lg bg-sky-500 p-16'>
          <h4 className='absolute top-2 left-2 text-xl font-semibold'>Help</h4>
        </div>
      </div>
    </div>
  )
}

export default StudentLandingPage
