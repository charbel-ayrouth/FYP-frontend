import React, { useState, useEffect } from 'react'
import { useUpdateUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { useFormik } from 'formik'
import { userAdminSchema } from '../../config/validationSchemas'

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const navigate = useNavigate()

  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState(user.role)
  const [active, setActive] = useState(user.active)
  const [id, setId] = useState(user.id)

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin/users')
    }
  }, [isSuccess, navigate])

  const formik = useFormik({
    initialValues: {
      email,
      role,
      active,
    },
    validationSchema: userAdminSchema,
    onSubmit: async (values) => {
      await updateUser({ id, ...values })
    },
  })

  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='bg-blue-50 px-6 py-8 rounded-lg shadow-lg w-5/6 sm:w-96'
      >
        <h2 className=' text-xl font-bold md:text-2xl mb-6'>Edit account</h2>

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
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            name='role'
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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

        <div className='mb-6'>
          <p className='block mb-2 font-medium text-gray-900'>Status</p>
          <div className='flex items-center'>
            <input
              id='status'
              type='checkbox'
              name='active'
              checked={formik.values.active}
              value={formik.values.active}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 '
            />
            <label htmlFor='status' className='ml-2 font-medium text-gray-900 '>
              Active
            </label>
          </div>
        </div>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center  w-full'
          disabled={formik.isSubmitting || isLoading}
        >
          Update
        </button>
      </form>

      {isError && <p className='text-red-600 mt-6'>{error?.data?.message}</p>}
    </div>
  )
}

export default EditUserForm
