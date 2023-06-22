import { apiSlice } from '../../app/api/apiSlice'

export const availabilityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get supervisor availability
    getAvailability: builder.query({
      query: ({ supervisorId }) => {
        return {
          url: `/availability/${supervisorId}`,
        }
      },
      providesTags: ['Availability'],
    }),
    //Add supervisor availability
    addAvailability: builder.mutation({
      query: ({ supervisorId, startTime, endTime }) => {
        return {
          url: `/availability/${supervisorId}`,
          method: 'POST',
          body: { startTime, endTime },
        }
      },
      invalidatesTags: ['Availability'],
    }),
    //Edit supervisor availability
    editAvailability: builder.mutation({
      query: ({ supervisorId, availabilityId, body }) => ({
        url: `/availability/${supervisorId}/${availabilityId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Availability'],
    }),
    //Delete supervisor availability
    deleteAvailability: builder.mutation({
      query: ({ supervisorId, availabilityId, body }) => ({
        url: `/availability/${supervisorId}/${availabilityId}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Availability'],
    }),
  }),
})

export const {
  useGetAvailabilityQuery,
  useAddAvailabilityMutation,
  useEditAvailabilityMutation,
  useDeleteAvailabilityMutation,
} = availabilityApiSlice
