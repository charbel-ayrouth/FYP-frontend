import { createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const supervisorsAdapter = createEntityAdapter({})

const initalState = supervisorsAdapter.getInitialState()

export const supervisorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all supervisors
    getSupervisors: builder.query({
      query: (options) => {
        const { topicIds, domainIds } = options.meta.arg || {}
        return {
          url: `/users/supervisors`,
          method: 'GET',
          params: {
            topics: topicIds,
            domains: domainIds,
          },
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
          },
        }
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id
          return user
        })
        return supervisorsAdapter.setAll(initalState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Supervisor', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Supervisor', id })),
          ]
        } else return [{ type: 'Supervisor', id: 'LIST' }]
      },
    }),

    // send request
    sendConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/users/${supervisorId}/connect`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Supervisor', id: arg.id },
      ],
    }),

    // accept request
    acceptConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/users/${supervisorId}/accept`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Supervisor', id: arg.id },
      ],
    }),

    // decline request
    declineConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/users/${supervisorId}/decline`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Supervisor', id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetSupervisorsQuery,
  useSendConnectionRequestMutation,
  useAcceptConnectionRequestMutation,
  useDeclineConnectionRequestMutation,
} = supervisorsApiSlice
