import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const topicsAdapter = createEntityAdapter({})

const initalState = topicsAdapter.getInitialState()

export const topicsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all topics
    getTopics: builder.query({
      query: () => ({
        url: '/topics',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: (responseData) => {
        const loadedTopics = responseData.map((topic) => {
          topic.id = topic._id
          return topic
        })
        return topicsAdapter.setAll(initalState, loadedTopics)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Topic', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Topic', id })),
          ]
        } else return [{ type: 'Topic', id: 'LIST' }]
      },
    }),

    // add new topic
    addNewTopic: builder.mutation({
      query: (initialTopicData) => ({
        url: '/topics',
        method: 'POST',
        body: { ...initialTopicData },
      }),
      invalidatesTags: [{ type: 'Topic', id: 'LIST' }],
    }),

    // update topic
    updateTopic: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/topics/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Topic', id: arg.id }],
    }),

    // delete topic
    deleteTopic: builder.mutation({
      query: ({ id }) => ({
        url: `/topics/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Topic', id: arg.id }],
    }),

    // add topics to user
    addTopicsToUser: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/topics/user/${id}`,
          method: 'POST',
          body,
        }
      },
      // invalidatesTags: [{ type: 'Topic', id: 'LIST' }],
    }),

    //get topics of user
    getTopicsOfUser: builder.query({
      query: (userId) => `/topics/user/${userId}`,
    }),
  }),
})

export const {
  useGetTopicsQuery,
  useAddNewTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
  useAddTopicsToUserMutation,
  useUpdateTopicsForUserMutation,
  useGetTopicsOfUserQuery,
} = topicsApiSlice

// const selectTopicsResult = topicsApiSlice.endpoints.getTopics.select()

// const selectTopicsData = createSelector(
//   selectTopicsResult,
//   (topicsResult) => topicsResult.data
// )

// export const {
//   selectAll: selectAllTopics,
//   selectById: selectTopicById,
//   selectIds: selectTopicIds,
// } = topicsAdapter.getSelectors(
//   (state) => selectTopicsData(state) ?? initalState
// )
