import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const domainsAdapter = createEntityAdapter({})

const initalState = domainsAdapter.getInitialState()

export const domainsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all domains
    getDomains: builder.query({
      query: () => ({
        url: '/domains',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: (responseData) => {
        const loadedDomains = responseData.map((domain) => {
          domain.id = domain._id
          return domain
        })
        return domainsAdapter.setAll(initalState, loadedDomains)
      },
      providesTags: (result, error, arg) => {
        // checking to see if there is an ids property . if yes map over them so anyone id could invalidate it
        if (result?.ids) {
          return [
            { type: 'Domain', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Domain', id })),
          ]
        } else return [{ type: 'Domain', id: 'LIST' }]
      },
    }),

    // add new domain
    addNewDomain: builder.mutation({
      query: (initialDomainData) => ({
        url: '/domains',
        method: 'POST',
        body: { ...initialDomainData },
      }),
      invalidatesTags: [{ type: 'Domain', id: 'LIST' }],
    }),

    // update domain
    updateDomain: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/domains/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Domain', id: arg.id }],
    }),

    // delete domain
    deleteDomain: builder.mutation({
      query: ({ id }) => ({
        url: `/domains/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Domain', id: arg.id }],
    }),

    // add domains to user
    addDomainsToUser: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/domains/user/${id}`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Domain', id: 'LIST' }],
    }),

    // update domains for user
    updateDomainsForUser: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/domains/user/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: [{ type: 'Domain', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetDomainsQuery,
  useAddNewDomainMutation,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
  useAddDomainsToUserMutation,
  useUpdateDomainsForUserMutation,
} = domainsApiSlice

// export const selectDomainsResult = domainsApiSlice.endpoints.getDomains.select()

// const selectDomainsData = createSelector(
//   selectDomainsResult,
//   (domainsResult) => domainsResult.data
// )

// export const {
//   selectAll: selectAllDomains,
//   selectById: selectDomainbyId,
//   selectIds: selectDomainIds,
// } = domainsAdapter.getSelectors(
//   (state) => selectDomainsData(state) ?? initalState
// )
