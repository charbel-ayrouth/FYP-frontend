import { apiSlice } from '../../app/api/apiSlice'
import { createEntityAdapter } from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter({})

const initalState = notificationsAdapter.getInitialState()

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //get all notifications
    getNotifications: builder.query({
      query: (id) => ({
        url: `/notifications/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: (responseData) => {
        const loadedNotifications = responseData.map((notification) => {
          notification.id = notification._id
          return notification
        })
        return notificationsAdapter.setAll(initalState, loadedNotifications)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Notification', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Notification', id })),
          ]
        } else return [{ type: 'Notification', id: 'LIST' }]
      },
    }),

    // mark notifications as read
    readNotifications: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'Notification', id: 'LIST' },
        'NewNotification',
      ],
    }),

    // mark one notification as read
    markNotificationAsRead: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/notifications/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Notification', id: arg.id },
        'NewNotification',
      ],
    }),

    getNewNotifications: builder.query({
      query: (id) => ({
        url: `/notifications/${id}/new`,
      }),
      providesTags: ['NewNotification'],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
  useMarkNotificationAsReadMutation,
  useGetNewNotificationsQuery,
} = notificationsApiSlice
