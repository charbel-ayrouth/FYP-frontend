import React, { useEffect } from 'react'
import { useAddNewTopicMutation } from './topicsApiSlice'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { topicSchema } from '../../config/validationSchemas'

const NewTopicForm = () => {
  const navigate = useNavigate()

  const [addNewTopic, { isLoading, isError, error, isSuccess }] =
    useAddNewTopicMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin/topics')
    }
  }, [navigate, isSuccess])

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: topicSchema,
    onSubmit: async (values) => {
      await addNewTopic(values)
    },
  })

  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-5/6 rounded-lg border bg-white px-6 py-8 shadow-2xl sm:w-96'
      >
        <h2 className=' mb-6 text-xl font-bold md:text-2xl'>Create topic</h2>

        <div className='mb-6'>
          <label
            htmlFor='title'
            className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
          >
            Title
          </label>
          <input
            id='title'
            type='title'
            {...formik.getFieldProps('title')}
            autoComplete='off'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          />
          {formik.touched.title && formik.errors.title ? (
            <p className='text-red-600'>{formik.errors.title}</p>
          ) : null}
        </div>

        <button
          type='submit'
          className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center font-medium text-white  hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300'
          disabled={formik.isSubmitting || isLoading}
        >
          Submit
        </button>
        <button
          type='button'
          className='mt-2 w-full rounded-lg border border-blue-700 bg-white px-5 py-2.5 text-center font-medium text-blue-700 focus:outline-none focus:ring-4  focus:ring-blue-300'
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
      {isError && <p className='mt-6 text-red-600'>{error?.data?.message}</p>}
    </div>
  )
}

export default NewTopicForm
