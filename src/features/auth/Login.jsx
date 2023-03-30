import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { useFormik } from 'formik'
import { userLoginSchema } from '../../config/validationSchemas'
import usePersist from '../../hooks/usePersist'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { role } = useAuth()

  useEffect(() => {
    if (role) navigate('/login/auth')
  }, [role, navigate])

  const [persist, setPersist] = usePersist()
  const [errorMessage, setErrorMessage] = useState('')

  const handleToggle = () => setPersist((prev) => !prev)

  const [loginMutaion, { isLoading }] = useLoginMutation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userLoginSchema,
    onSubmit: async (values, action) => {
      try {
        // we used unwrap because we dont want to use isError from rtk query
        const { accessToken } = await loginMutaion(values).unwrap()
        dispatch(setCredentials({ accessToken }))
        action.resetForm()
        navigate('/auth')
      } catch (err) {
        if (!err.status) {
          setErrorMessage('No Server Response')
        } else if (err.status === 400) {
          setErrorMessage('Missing Username or Password')
        } else if (err.status === 401) {
          setErrorMessage('Unauthorized')
        } else {
          setErrorMessage(err.data?.message)
        }
      }
    },
  })

  return (
    <section className='bg-gray-50'>
      <div className='mx-auto flex h-screen flex-col items-center justify-center px-6 py-8'>
        {/* Form container*/}
        <div className='w-full rounded-lg bg-white shadow-2xl sm:max-w-md'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Sign In
            </h2>
            {/* Form */}
            <form
              onSubmit={formik.handleSubmit}
              className='space-y-4 md:space-y-6'
            >
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
                >
                  Your email
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
                <div className='flex items-center'>
                  <input
                    id='trust'
                    type='checkbox'
                    name='active'
                    checked={persist}
                    onChange={handleToggle}
                    className='h-4 w-4 rounded border-primaryLight text-primary focus:outline-none'
                  />
                  <label
                    htmlFor='trust'
                    className='ml-2 text-sm font-medium text-gray-500 md:text-base'
                  >
                    Trust This Device
                  </label>
                </div>
              </div>

              {/* Button */}
              <div>
                <button
                  type='submit'
                  className='w-full rounded-lg bg-primary px-4 py-2 text-center text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
                  disabled={formik.isSubmitting || isLoading}
                >
                  Sign In
                </button>
                {errorMessage && (
                  <p
                    aria-live='assertive'
                    className='mt-2 text-center text-red-600'
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
