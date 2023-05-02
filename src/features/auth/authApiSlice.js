import { apiSlice } from '../../app/api/apiSlice'
import { logOut, setCredentials } from './authSlice'

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
          // bug: even after logging out we still requesting notes avery 15s
          // fix: wrap resetApiState in set Timeout for one second
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState()) // clear cache and query subscription
          }, 1000)
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    // check if user completed account setup
    accountSetup: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: 'POST',
        }
      },
    }),
    // send email
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: `/auth/forget-password`,
        method: 'POST',
        body: { email },
      }),
    }),
    // check token and change password
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { newPassword },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useAccountSetupMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice
