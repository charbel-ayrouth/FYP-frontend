import { apiSlice } from '../../app/api/apiSlice'
import { logOut } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    // logout
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // wait for logout query to be fullfilled
          // const {data} = bet red mn backend message cookie cleared
          await queryFulfilled
          dispatch(logOut()) // set token = null
          dispatch(apiSlice.util.resetApiState()) // clear cache and query subscription
        } catch (err) {
          console.log(err)
        }
      },
    }),
    // refresh
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
    }),
  }),
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice
