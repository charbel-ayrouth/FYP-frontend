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
      navigate('/dash/users')
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
        className='bg-blue-50 px-6 py-8 rounded-lg  shadow-lg w-5/6 sm:w-96'
      >
        <h2 className=' text-xl font-bold md:text-2xl mb-6'>Create account</h2>

        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block mb-2 font-medium text-gray-900'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            {...formik.getFieldProps('email')}
            autoComplete='off'
            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full'
          />
          {formik.touched.email && formik.errors.email ? (
            <p className='text-red-600'>{formik.errors.email}</p>
          ) : null}
        </div>

        <div className='mb-6'>
          <label
            htmlFor='roles'
            className='block mb-2 font-medium text-gray-900'
          >
            ASSIGNED ROLES:
          </label>
          <select
            id='role'
            {...formik.getFieldProps('role')}
            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full'
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

export default NewUserForm
