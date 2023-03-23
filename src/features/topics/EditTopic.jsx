import React from 'react'
import { useParams } from 'react-router-dom'
import EditTopicForm from './EditTopicForm'
import { useGetTopicsQuery } from './topicsApiSlice'
import LoadingSpinner from '../../components/LoadingSpinner'

const EditTopic = () => {
  const { id } = useParams()

  const { topic } = useGetTopicsQuery('topicslist', {
    selectFromResult: ({ data }) => ({
      topic: data?.entities[id],
    }),
  })

  const content = topic ? <EditTopicForm topic={topic} /> : <LoadingSpinner />

  return content
}

export default EditTopic
