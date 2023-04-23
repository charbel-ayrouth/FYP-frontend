import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from './notificationsApiSlice'
import LoadingSpinner from '../../components/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import Notification from './Notification'
import { useState } from 'react'
import Switch from '../../components/Switch'

const NotificationsList = () => {
  const [showAll, setShowAll] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage

  const { id } = useAuth()

  const {
    data: notifications,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetNotificationsQuery(id, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const [
    readMutation,
    {
      isLoading: isLoadingRead,
      isError: isErrorRead,
      isSuccess: isSuccessRead,
      error: errorRead,
    },
  ] = useReadNotificationsMutation()

  let content

  if (isLoading || isLoadingRead) return <LoadingSpinner />

  if (isError || isErrorRead) {
    return (
      <p className='text-red-600'>
        {error?.message ? error?.message : errorRead?.message}
      </p>
    )
  }
  if (isSuccess || isSuccessRead) {
    const { ids, entities } = notifications

    const TWO_DAYS = 48 * 60 * 60 * 1000

    const filteredIds = showAll
      ? ids
      : ids.filter(
          (id) =>
            new Date(entities[id].updatedAt).toISOString() >=
            new Date(Date.now() - TWO_DAYS).toISOString()
        )

    const currentItems = filteredIds.slice(firstItemIndex, lastItemIndex)

    let pages = []

    for (let i = 1; i <= Math.ceil(filteredIds.length / itemsPerPage); i++) {
      pages.push(i)
    }

    content = (
      <div className='rounded-lg bg-gray-50 px-4 py-8 shadow-2xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-800'>Notifications</h1>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-bold text-gray-800'>
            Recent Notifications
          </h2>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-600'>Show All</p>
            <Switch
              isOn={showAll}
              handleClick={() => {
                setShowAll((prevState) => !prevState)
              }}
            />
            <p className='text-sm text-gray-600'>Last 48 hours</p>
          </div>
        </div>
        <div className='flex flex-col'>
          {currentItems.length > 0 ? (
            currentItems.map((id, index) => {
              return (
                <Notification
                  key={id}
                  notification={entities[id]}
                  userId={id}
                />
              )
            })
          ) : (
            <p className='text-lg text-gray-600'>No notifications found.</p>
          )}
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <ul className='inline-flex items-stretch space-x-px'>
            <li>
              <button
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
                className='flex items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              >
                &lt;
              </button>
            </li>
            {pages.map((page, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                    page === currentPage ? 'bg-blue-100 text-blue-500' : ''
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  currentPage < Math.ceil(filteredIds.length / itemsPerPage) &&
                  setCurrentPage(currentPage + 1)
                }
                className='flex items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              >
                &gt;
              </button>
            </li>
          </ul>
          <button
            className={`ml-auto mt-4 flex items-center rounded-full bg-primary py-2 px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primaryDark focus:outline-none ${
              currentItems.length === 0 ? 'cursor-not-allowed' : ''
            }`}
            onClick={() => readMutation(id)}
            disabled={currentItems.length === 0}
          >
            Mark all as read
          </button>
        </div>
      </div>
    )
  }

  return content
}

export default NotificationsList
