import React from 'react'
import { forgetPasswordSchema } from '../../config/validationSchemas'
import { useFormik } from 'formik'
import { useForgetPasswordMutation } from './authApiSlice'
import LoadingSpinner from '../../components/LoadingSpinner'

const ForgetPassword = () => {
  const [forgetPassword, { isLoading, isError, isSuccess }] =
    useForgetPasswordMutation()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      await forgetPassword(values.email)
    },
  })

  return (
    <div className='w-full rounded-lg border bg-white shadow-2xl sm:max-w-md'>
      <div className='p-6 sm:p-8'>
        <h2 className='mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:mb-6 md:text-2xl'>
          Forget Password
        </h2>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className='space-y-4 md:space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
            >
              Email address
            </label>
            <input
              id='email'
              type='email'
              {...formik.getFieldProps('email')}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none sm:text-sm'
              placeholder='name@email.com'
            />
            {formik.touched.email && formik.errors.email ? (
              <p className='text-red-600'>{formik.errors.email}</p>
            ) : null}
          </div>
          <button
            type='submit'
            className='w-full rounded-lg bg-primary px-4 py-2 text-center text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
            disabled={formik.isSubmitting || isLoading}
          >
            {isLoading ? <LoadingSpinner white={true} /> : 'Submit'}
          </button>
        </form>
        {/* isSuccess */}
        {isSuccess && (
          <div className='mt-4 w-full rounded-lg bg-green-500 p-2.5 text-center text-sm text-white md:text-base'>
            Password reset link sent to your email account
          </div>
        )}
        {/* isError */}
        {isError && (
          <div className='mt-4 w-full rounded-lg bg-red-500 p-2.5 text-center text-sm text-white md:text-base'>
            User with given email does not exist!
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgetPassword
