import React, { useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { userAdminSchema } from '../../config/validationSchemas'
import { ROLES } from '../../config/roles'

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin/users')
    }
  }, [isSuccess, navigate])

  const formik = useFormik({
    initialValues: {
      email: '',
      role: '',
    },
    validationSchema: userAdminSchema,
    onSubmit: async (values, actions) => {
      await addNewUser(values)
    },
  })

  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-5/6 space-y-4 rounded-lg border bg-white px-6 py-8 shadow-2xl sm:w-96 md:space-y-6'
      >
        <h2 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
          Create account
        </h2>

        <div>
          <label
            htmlFor='email'
            className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            {...formik.getFieldProps('email')}
            autoComplete='off'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none'
          />
          {formik.touched.email && formik.errors.email ? (
            <p className='text-red-600'>{formik.errors.email}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor='roles'
            className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
          >
            ASSIGNED ROLES:
          </label>
          <select
            id='role'
            {...formik.getFieldProps('role')}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none'
          >
            <option value=''></option>
            {Object.values(ROLES).map((role) => {
              return (
                <option key={role} value={role}>
                  {role}
                </option>
              )
            })}
          </select>
          {formik.touched.role && formik.errors.role ? (
            <p className='text-red-600'>{formik.errors.role}</p>
          ) : null}
        </div>

        <div>
          <button
            type='submit'
            className='w-full rounded-lg bg-primary px-4 py-2 text-center text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4  focus:ring-primaryLight'
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
          {isError && (
            <p className='mt-2 text-center text-red-600'>
              {error?.data?.message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default NewUserForm
