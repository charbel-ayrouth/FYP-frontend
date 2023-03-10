import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { useFormik } from 'formik'
import { userLoginSchema } from '../../config/validationSchemas'
import usePersist from '../../hooks/usePersist'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [persist, setPersist] = usePersist()
  const [errorMessage, setErrorMessage] = useState('')

  const handleToggle = () => setPersist((prev) => !prev)

  const [loginMutaion, { isLoading, isSuccess, isError, error }] =
    useLoginMutation()

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

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch('/dash')
  //   }
  // }, [dispatch, isSuccess])

  return (
    <section className='bg-gray-500 '>
      <div className='flex flex-col justify-center items-center px-6 py-8 mx-auto h-screen'>
        {/* Title */}
        {/* <h1 className='flex items-center mb-6 text-2xl'>FYP</h1> */}
        {errorMessage && <p aria-live='assertive'>{errorMessage}</p>}
        {isError && <p aria-live='assertive'>{error.data?.message}</p>}
        {/* Form container*/}
        <div className='w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-lg sm:max-w-md'>
          <div className='p-6 space-y-4 sm:p-8 md:space-y-6'>
            <h2 className='text-xl font-bold md:text-2xl'>Create account</h2>
            {/* Form */}
            <form
              onSubmit={formik.handleSubmit}
              className='space-y-4 md:space-y-6'
            >
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium'
                >
                  Your email
                </label>
                <input
                  id='email'
                  type='email'
                  {...formik.getFieldProps('email')}
                  className=' sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-50 border border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 '
                  placeholder='name@email.com'
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className='text-red-600'>{formik.errors.email}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium'
                >
                  Password
                </label>
                <input
                  id='password'
                  type='password'
                  {...formik.getFieldProps('password')}
                  className=' sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-50 border border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
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
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 '
                  />
                  <label
                    htmlFor='trust'
                    className='ml-2 font-medium text-gray-900 '
                  >
                    Trust This Device
                  </label>
                </div>
              </div>

              {/* Button */}
              <button
                type='submit'
                className='w-full  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-white'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
