import React from 'react'
import SupervisorCard from './SupervisorCard'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { useGetAllSupervisorsQuery } from '../usersApiSlice'

const SupervisorsList = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllSupervisorsQuery(undefined, {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })

  const supervisors = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      availableSeats: 5,
      domains: [
        'Data Science',
        'Artificial Intelligence',
        'Web Development',
        'Mobile Development',
      ],
      topics: ['Machine Learning', 'Deep Learning', 'React', 'Flutter'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      availableSeats: 2,
      domains: ['Web Development', 'Mobile Development'],
      topics: ['React', 'Flutter'],
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      availableSeats: 0,
      domains: ['Cybersecurity'],
      topics: ['Network Security', 'Web Security'],
    },
    {
      id: 4,
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      availableSeats: 0,
      domains: ['Cybersecurity'],
      topics: ['Network Security', 'Web Security'],
    },
    {
      id: 5,
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      availableSeats: 0,
      domains: ['Cybersecurity'],
      topics: ['Network Security', 'Web Security'],
    },
  ]

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) content = <p className='text-red-600'>{error?.data.message}</p>

  if (isSuccess) {
    console.log(data)
    content = (
      <div className='flex flex-col items-center gap-8'>
        <h1 className='text-3xl font-bold'>Supervisors</h1>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
          {supervisors.map((supervisor) => (
            <SupervisorCard key={supervisor.id} supervisor={supervisor} />
          ))}
        </div>
      </div>
    )
  }

  return content
}

export default SupervisorsList
