import React from 'react'
import { useFormik } from 'formik'
import { useUpdateProfileMutation } from './profileApiSlice'
import { updateProfileSchema } from '../../config/validationSchemas'
import { useRefreshMutation } from '../auth/authApiSlice'
import useAuth from '../../hooks/useAuth'

const ProfileForm = ({ handleNext }) => {
  const { id } = useAuth()

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
        handleNext()
      }
    },
  })

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='mx-auto w-full max-w-md space-y-4'
      >
        <h2 className='mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Choose your username and password
        </h2>
        <div>
          <label
            htmlFor='username'
            className='mb-1 block text-lg font-medium text-gray-900'
          >
            Username
          </label>
          <input
            id='username'
            type='username'
            {...formik.getFieldProps('username')}
            autoComplete='off'
            placeholder='Enter your username'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-xl focus:border-2 focus:border-primaryLight focus:outline-none'
          />
          {formik.touched.username && formik.errors.username ? (
            <p className='text-red-600'>{formik.errors.username}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor='password'
            className='mb-1 block text-lg font-medium text-gray-900'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            {...formik.getFieldProps('password')}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-xl focus:border-2 focus:border-primaryLight focus:outline-none'
            placeholder='Enter your password'
          />
          {formik.touched.password && formik.errors.password ? (
            <p className='text-red-600'>{formik.errors.password}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor='confirmPassword'
            className='mb-1 block text-lg font-medium text-gray-900'
          >
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            type='Password'
            {...formik.getFieldProps('confirmPassword')}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-xl focus:border-2 focus:border-primaryLight focus:outline-none'
            placeholder='Confirm your password'
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className='text-red-600'>{formik.errors.confirmPassword}</p>
          ) : null}
        </div>

        <div>
          <button
            type='submit'
            className='mt-4 w-full rounded-lg bg-primary px-4 py-2 text-center text-lg font-medium text-white shadow-xl hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
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
