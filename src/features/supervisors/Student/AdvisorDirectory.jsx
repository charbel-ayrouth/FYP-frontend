import React from 'react'
import {
  useGetRecommendedSupervisorsQuery,
  useGetOtherSupervisorsQuery,
} from '../supervisorsApiSlice'
import SupervisorCard from './SupervisorCard'
import { Link, useLocation } from 'react-router-dom'

const AdvisorDirectory = ({ id }) => {
  let content = null
  let cardContent
  const { pathname } = useLocation()

  const { data, isSuccess } = useGetRecommendedSupervisorsQuery({ id })
  const { data: other, isSuccess: isSuccessOther } =
    useGetOtherSupervisorsQuery({ id })

  if (isSuccess && isSuccessOther) {
    if (data.length === 0) {
      cardContent = (
        <>
          <SupervisorCard supervisor={other[0]} w={true} />
          <SupervisorCard supervisor={other[1]} w={true} />
        </>
      )
    } else if (data.length === 1) {
      cardContent = (
        <>
          <SupervisorCard supervisor={data[0]} w={true} />
          <SupervisorCard supervisor={other[0]} w={true} />
        </>
      )
    } else {
      cardContent = (
        <>
          <SupervisorCard supervisor={data[0]} w={true} />
          <SupervisorCard supervisor={data[1]} w={true} />
        </>
      )
    }

    content = (
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-2xl font-bold'>Supervisors</h2>
        <div className='-mx-4 flex flex-col gap-4 md:flex-row'>
          {cardContent}
        </div>
        <Link
          to={`/${pathname.split('/')[1]}/connections`}
          className='text-primary hover:underline'
        >
          See all supervisors
        </Link>
      </div>
    )
  }

  return content
}

export default AdvisorDirectory

// <div key={advisor.id} className='mb-4 w-full px-4 md:w-1/2'>
//   <div className='rounded-lg bg-gray-100 p-4'>
//     <h3 className='mb-2 text-lg font-bold'>{advisor.name}</h3>
//     <p className='mb-4'>
//       Areas of expertise: {advisor.areasOfExpertise.join(', ')}
//     </p>
//     <h4 className='text-md mb-2 font-bold'>Availability:</h4>
//     {advisor.availability.map((slot) => (
//       <p key={slot.day} className='mb-1'>
//         {slot.day}: {slot.slots.join(', ')}
//       </p>
//     ))}
//   </div>
// </div>
