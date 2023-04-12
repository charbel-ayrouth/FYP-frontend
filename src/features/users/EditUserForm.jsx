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
        className='w-5/6 space-y-4 rounded-lg border bg-white px-6 py-8 shadow-2xl sm:w-96 md:space-y-6'
      >
        <h2 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
          Edit account
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
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            name='role'
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          <p className='mb-2 block text-sm font-medium text-black md:text-base'>
            Status
          </p>
          <div className='flex items-center'>
            <input
              id='status'
              type='checkbox'
              name='active'
              checked={formik.values.active}
              value={formik.values.active}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='h-4 w-4 rounded border-primaryLight text-primary focus:outline-none'
            />
            <label
              htmlFor='status'
              className='ml-2 text-sm font-medium text-darkerGrey md:text-base'
            >
              Active
            </label>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='w-full rounded-lg bg-primary px-4 py-2 text-center text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4  focus:ring-primaryLight'
            disabled={formik.isSubmitting || isLoading}
          >
            Update
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

export default EditUserForm
