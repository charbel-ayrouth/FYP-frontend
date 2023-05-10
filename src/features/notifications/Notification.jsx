import React, { memo } from 'react'
import { FaBell } from 'react-icons/fa'
import { useMarkNotificationAsReadMutation } from './notificationsApiSlice'
import { timeAgo } from '../../config/functions'

const Notification = ({ notification, userId }) => {
  const [markNotificationAsRead, {}] = useMarkNotificationAsReadMutation()

  const clickHandler = async () => {
    await markNotificationAsRead({
      id: userId,
      notificationId: notification.id,
    })
  }

  return (
    <div className='flex items-center gap-6 border-t border-b p-4'>
      <FaBell
        className={`h-6 w-6 ${
          notification.read ? 'text-gray-400' : 'text-primary'
        }`}
      />
      <div>
        <h2 className='text-lg font-bold'>{notification.message}</h2>
        <p className='text-sm text-gray-400'>
          {timeAgo(notification.updatedAt)}
        </p>
        <button
          className={`text-sm ${
            notification.read ? 'text-gray-400' : 'text-primaryLight'
          }`}
          onClick={clickHandler}
          disabled={notification.read}
        >
          Mark as read
        </button>
      </div>
    </div>
  )
}

const memoizedNotification = memo(Notification)

export default memoizedNotification
