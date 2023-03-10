import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const usersAdapter = createEntityAdapter({})

const initalState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(initalState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        // checking to see if there is an ids property . if yes map over them so anyone id could invalidate it
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User', id })),
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      },
    }),
    // add new user
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'POST',
        body: { ...initialUserData },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    // update user
    updateUser: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/users/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    // delete user
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
)

//getSelectors create these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserbyId,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initalState)
