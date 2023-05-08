import React from 'react'
import { useGetNewNotificationsQuery } from '../../features/notifications/notificationsApiSlice'
import { formatDistanceToNow } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'

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

  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
  }

  const MAX_NOTIFICATIONS = 3

  const { data, isSuccess } = useGetNewNotificationsQuery(id)

  if (isSuccess) {
    content = (
      <div className='rounded-lg bg-white p-4 shadow-md'>
        <Link
          to='/student/notifications'
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
                className={`rounded-md bg-gray-100 p-2 font-semibold`}
                onClick={() => navigate('/student/notifications')}
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
