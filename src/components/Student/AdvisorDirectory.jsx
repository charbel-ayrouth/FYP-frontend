import React from 'react'
import {
  useGetRecommendedSupervisorsQuery,
  useGetOtherSupervisorsQuery,
} from '../../features/supervisors/supervisorsApiSlice'
import SupervisorCard from '../../features/supervisors/Student/SupervisorCard'
import { Link } from 'react-router-dom'

const advisors = [
  {
    id: 1,
    name: 'John Doe',
    areasOfExpertise: ['Machine Learning', 'Data Science'],
    availability: [
      {
        day: 'Monday',
        slots: ['10:00am - 12:00pm', '1:00pm - 3:00pm'],
      },
      {
        day: 'Wednesday',
        slots: ['9:00am - 11:00am', '2:00pm - 4:00pm'],
      },
      {
        day: 'Friday',
        slots: ['11:00am - 1:00pm'],
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    areasOfExpertise: ['Web Development', 'Mobile Development'],
    availability: [
      {
        day: 'Tuesday',
        slots: ['9:00am - 12:00pm', '1:00pm - 4:00pm'],
      },
      {
        day: 'Thursday',
        slots: ['10:00am - 12:00pm', '2:00pm - 5:00pm'],
      },
    ],
  },
]

const AdvisorDirectory = ({ id }) => {
  let content = null
  let cardContent

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
        <h2 className='mb-4 text-2xl font-bold'>Advisor Directory</h2>
        <div className='-mx-4 flex flex-col gap-4 md:flex-row'>
          {cardContent}
        </div>
        <div className='mt-4'>
          <Link to='/advisors' className='text-primary hover:underline'>
            See all advisors
          </Link>
        </div>
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
