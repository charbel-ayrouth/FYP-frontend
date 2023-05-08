import { apiSlice } from '../../app/api/apiSlice'

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/profile/${id}`,
          method: 'PATCH',
          body,
        }
      },
    }),

    overview: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
})

export const { useUpdateProfileMutation, useOverviewQuery } = profileApiSlice
