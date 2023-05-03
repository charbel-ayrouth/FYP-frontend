import { apiSlice } from '../../app/api/apiSlice'

export const supervisorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all supervisors
    getSupervisors: builder.query({
      query: ({ id }) => ({
        url: `/supervisors/recommended/${id}`,
      }),
      providesTags: ['Supervisor'],
    }),

    // send request
    sendConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/supervisors/${supervisorId}/connect`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Supervisor'],
    }),

    // accept request
    acceptConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/supervisors/${supervisorId}/accept`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Supervisor'],
    }),

    // decline request
    declineConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/supervisors/${supervisorId}/decline`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Supervisor'],
    }),
  }),
})

export const {
  useGetSupervisorsQuery,
  useSendConnectionRequestMutation,
  useAcceptConnectionRequestMutation,
  useDeclineConnectionRequestMutation,
} = supervisorsApiSlice
