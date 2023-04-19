import { apiSlice } from '../../app/api/apiSlice'

export const connectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // send request
    sendConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/users/${supervisorId}/connect`,
        method: 'POST',
        body: { studentId },
      }),
    }),
    // accept request
    acceptConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/users/${supervisorId}/accept`,
        method: 'POST',
        body: { studentId },
      }),
    }),
    // decline request
    declineConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/users/${supervisorId}/decline`,
        method: 'POST',
        body: { studentId },
      }),
    }),
  }),
})

export const {
  useSendConnectionRequestMutation,
  useAcceptConnectionRequestMutation,
  useDeclineConnectionRequestMutation,
} = connectionsApiSlice
