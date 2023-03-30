import React from 'react'
import { useFormik } from 'formik'
import { useUpdateProfileMutation } from './profileApiSlice'
import { updateProfileSchema } from '../../config/validationSchemas'
import { useRefreshMutation } from '../auth/authApiSlice'

const ProfileForm = ({ closeHandler, id }) => {
  const [updateProfile, { isLoading, isSuccess, isError, error }] =
    useUpdateProfileMutation()

  const [refresh, { isUninitialized }] = useRefreshMutation()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateProfile({ id, ...values })
        await refresh()
      } catch (e) {
        console.log(e)
      } finally {
        setSubmitting(false)
        closeHandler()
      }
    },
  })

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='w-5/6 space-y-4 bg-white sm:w-96 md:space-y-6'
      >
        <h2 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
          Please complete your account setup
        </h2>

        <div>
          <label
            htmlFor='username'
            className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
          >
            Username
          </label>
          <input
            id='username'
            type='username'
            {...formik.getFieldProps('username')}
            autoComplete='off'
            className='block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none'
          />
          {formik.touched.username && formik.errors.username ? (
            <p className='text-red-600'>{formik.errors.username}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor='password'
            className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            {...formik.getFieldProps('password')}
            className='block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none sm:text-sm'
            placeholder='******'
          />
          {formik.touched.password && formik.errors.password ? (
            <p className='text-red-600'>{formik.errors.password}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor='confirmPassword'
            className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
          >
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            type='Password'
            {...formik.getFieldProps('confirmPassword')}
            className='block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none sm:text-sm'
            placeholder='******'
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className='text-red-600'>{formik.errors.confirmPassword}</p>
          ) : null}
        </div>

        <div>
          <button
            type='submit'
            className='mt-4 w-full rounded-lg bg-primary px-4 py-2 text-center text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4  focus:ring-primaryLight'
            disabled={formik.isSubmitting || isLoading}
          >
            Submit
          </button>
          {isError && (
            <p className='mt-2 text-center text-red-600'>
              {error?.data?.message}
            </p>
          )}
        </div>
      </form>
    </>
  )
}

export default ProfileForm
