import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const usersAdapter = createEntityAdapter({})

const initalState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
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
  }),
})

export const { useGetUsersQuery } = usersApiSlice

// returns the query result object
export const selectUserResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
  selectUserResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
)

//getSelectors create these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUsersbyId,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initalState)