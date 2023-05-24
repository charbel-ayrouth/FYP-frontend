import React from 'react'
import { useGetNewNotificationsQuery } from '../notificationsApiSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { timeAgo } from '../../../config/functions'

// const data = [
//   {
//     id: 1,
//     message: 'Your proposal has been approved by your supervisor!',
//     date: '2023-04-28 09:30',
//     status: 'unread',
//   },
//   {
//     id: 2,
//     message: 'New advisor added to the directory: Dr. Jane Smith',
//     date: '2023-04-26 16:45',
//     status: 'unread',
//   },
//   {
//     id: 3,
//     message: 'Reminder: proposal deadline is approaching',
//     date: '2023-04-23 11:20',
//     status: 'read',
//   },
//   {
//     id: 4,
//     message: 'Reminder: proposal deadline is approaching',
//     date: '2023-04-23 11:20',
//     status: 'read',
//   },
//   {
//     id: 5,
//     message: 'Reminder: proposal deadline is approaching',
//     date: '2023-04-23 11:20',
//     status: 'read',
//   },
// ]

const Notifications = ({ id }) => {
  let content = null
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const MAX_NOTIFICATIONS = 3

  const { data, isSuccess } = useGetNewNotificationsQuery(id)

  if (isSuccess) {
    content = (
      <div className='rounded-lg bg-white p-4 shadow-md'>
        <Link
          to={`/${pathname.split('/')[1]}/notifications`}
          className='cursor-pointer text-xl font-bold hover:underline'
        >
          Notifications
        </Link>
        <div className='mt-4 space-y-2'>
          {data.length === 0 ? (
            <>
              <p className='text-gray-500'>
                You currently have no new notification.
              </p>
            </>
          ) : (
            data.slice(0, MAX_NOTIFICATIONS).map((notification) => (
              <div
                key={notification._id}
                className={`cursor-pointer rounded-md bg-gray-100 p-2 font-semibold`}
                onClick={() =>
                  navigate(`/${pathname.split('/')[1]}/notifications`)
                }
              >
                <p className='text-sm'>{notification.message}</p>
                <p className='text-xs text-gray-500'>
                  {timeAgo(notification.updatedAt)}
                </p>
              </div>
            ))
          )}
          {data.length > MAX_NOTIFICATIONS && (
            <p className='text-gray-500'>
              + {data.length - MAX_NOTIFICATIONS} more notifications
            </p>
          )}
        </div>
      </div>
    )
  }

  return content
}

export default Notifications
