import { apiSlice } from '../../app/api/apiSlice'

export const supervisorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get recomended supervisors
    getRecommendedSupervisors: builder.query({
      query: ({ id }) => {
        return {
          url: `/supervisors/recommended/${id}`,
        }
      },
      providesTags: ['Supervisor'],
    }),

    // get other supervisors
    getOtherSupervisors: builder.query({
      query: ({ id }) => ({
        url: `/supervisors/other/${id}`,
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
      invalidatesTags: ['Supervisor', 'ConnectionsRequest'],
    }),

    // accept request
    acceptConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/supervisors/${supervisorId}/accept`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Supervisor', 'ConnectionsRequest', 'Overview'],
    }),

    // decline request
    declineConnectionRequest: builder.mutation({
      query: ({ supervisorId, studentId }) => ({
        url: `/supervisors/${supervisorId}/decline`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Supervisor', 'ConnectionsRequest'],
    }),

    // get connections request
    getConnectionsRequest: builder.query({
      query: ({ id }) => ({
        url: `/supervisors/${id}/connections-request`,
      }),
      providesTags: ['ConnectionsRequest'],
    }),
  }),
})

export const {
  useGetRecommendedSupervisorsQuery,
  useSendConnectionRequestMutation,
  useAcceptConnectionRequestMutation,
  useDeclineConnectionRequestMutation,
  useGetOtherSupervisorsQuery,
  useGetConnectionsRequestQuery,
} = supervisorsApiSlice
