import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { useFormik } from 'formik'
import { userLoginSchema } from '../../config/validationSchemas'
import usePersist from '../../hooks/usePersist'
import useAuth from '../../hooks/useAuth'
import { ROLES } from '../../config/roles'
import { selectCurrentToken } from './authSlice'
import { useRefreshMutation } from './authApiSlice'
import LoadingSpinner from '../../components/LoadingSpinner'
import { Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [
    refresh,
    { isSuccess, isError, isUninitialized, isLoading: isLoadingRefresh },
  ] = useRefreshMutation()

  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const { role } = useAuth()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh()
          setTrueSuccess(true)
        } catch (error) {
          console.error(error)
        }
      }

      if (!token) verifyRefreshToken()
    }

    return () => (effectRan.current = true)
    // eslint-disable-next-line
  }, [])

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

  let content

  if (isError || isUninitialized) {
    content = (
      <div className='w-full rounded-lg border bg-white shadow-2xl sm:max-w-md'>
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

            <div className='flex items-center justify-between'>
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
              <Link
                to='/forget-password'
                className='text-sm font-medium text-primary hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <div>
              <button
                type='submit'
                className='w-full rounded-lg bg-primary px-4 py-2 text-center text-lg font-medium text-white hover:bg-primaryDark focus:outline-none focus:ring-4 focus:ring-primaryLight'
                disabled={formik.isSubmitting || isLoading}
              >
                {isLoading ? <LoadingSpinner white={true} /> : 'Sign In'}
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
    )
  } else if (isLoadingRefresh) {
    content = <LoadingSpinner />
  } else if (isSuccess && trueSuccess) {
    if (role === ROLES.Admin) {
      content = <Navigate to={'/admin'} state={{ from: location }} replace />
    } else if (role === ROLES.Supervisor) {
      content = (
        <Navigate to={'/supervisor'} state={{ from: location }} replace />
      )
    } else if (role === ROLES.Student) {
      content = <Navigate to={'/student'} state={{ from: location }} replace />
    }
  }
  // else if (isUninitialized) {
  //   content = (
  //     <div>
  //       <h1>uninitialized</h1>
  //       <LoadingSpinner />
  //     </div>
  //   )
  // }
  return content
}

export default Login
