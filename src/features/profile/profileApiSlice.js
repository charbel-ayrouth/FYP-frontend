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
  }),
})

export const { useUpdateProfileMutation } = profileApiSlice
