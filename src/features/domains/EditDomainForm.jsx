import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateDomainMutation } from './domainsApiSlice'
import { useFormik } from 'formik'
import { domainSchema } from '../../config/validationSchemas'

const EditDomainForm = ({ domain }) => {
  const navigate = useNavigate()

  const [updateDomain, { isError, error, isLoading, isSuccess }] =
    useUpdateDomainMutation()

  const [title, setTitle] = useState(domain.title)
  const [example, setExample] = useState(domain.example)

  useEffect(() => {
    if (isSuccess) {
      navigate('/dash/domains')
    }
  }, [navigate, isSuccess])

  const formik = useFormik({
    initialValues: {
      title,
      example,
    },
    validationSchema: domainSchema,
    onSubmit: async (values) => {
      await updateDomain({ id: domain.id, ...values })
    },
  })

  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='bg-blue-50 px-6 py-8 rounded-lg  shadow-lg w-5/6 sm:w-96'
      >
        <h2 className=' text-xl font-bold md:text-2xl mb-6'>Create topic</h2>

        <div className='mb-6'>
          <label
            htmlFor='title'
            className='block mb-2 font-medium text-gray-900'
          >
            Title
          </label>
          <input
            id='title'
            type='title'
            {...formik.getFieldProps('title')}
            autoComplete='off'
            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full'
          />
          {formik.touched.title && formik.errors.title ? (
            <p className='text-red-600'>{formik.errors.title}</p>
          ) : null}
        </div>

        <div className='mb-6'>
          <label
            htmlFor='example'
            className='block mb-2 font-medium text-gray-900'
          >
            Example
          </label>
          <input
            id='example'
            type='example'
            {...formik.getFieldProps('example')}
            autoComplete='off'
            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full'
          />
          {formik.touched.example && formik.errors.example ? (
            <p className='text-red-600'>{formik.errors.example}</p>
          ) : null}
        </div>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center  w-full'
          disabled={formik.isSubmitting || isLoading}
        >
          Submit
        </button>
      </form>
      {isError && <p className='text-red-600 mt-6'>{error?.data?.message}</p>}
    </div>
  )
}

export default EditDomainForm
