import React, { useEffect, useState } from 'react'
import { resetPasswordSchema } from '../../config/validationSchemas'
import { useFormik } from 'formik'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useResetPasswordMutation } from './authApiSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ForgetPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const showPasswordHandler = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  const showConfirmPasswordHandler = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState)
  }

  const [resetPassword, { isLoading, isError, error, isSuccess }] =
    useResetPasswordMutation()

  const { token } = useParams()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, action) => {
      await resetPassword({ token, newPassword: values.password })
    },
  })

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess, navigate])

  return (
    <div className='w-full rounded-lg border bg-white shadow-2xl sm:max-w-md'>
      <div className='p-6 sm:p-8'>
        <h2 className='mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:mb-6 md:text-2xl'>
          Reset Password
        </h2>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className='space-y-4 md:space-y-6'>
          <div>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-gray-900 md:text-base'
            >
              Password
            </label>
            <div className='relative'>
              {isPasswordVisible ? (
                <AiOutlineEyeInvisible
                  className='absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-400'
                  onClick={showPasswordHandler}
                />
              ) : (
                <AiOutlineEye
                  className='absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-400'
                  onClick={showPasswordHandler}
                />
              )}
              <input
                id='password'
                type={isPasswordVisible ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                className='block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none sm:text-sm'
                placeholder='******'
              />
            </div>
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
            <div className='relative'>
              {isConfirmPasswordVisible ? (
                <AiOutlineEyeInvisible
                  className='absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-400'
                  onClick={showConfirmPasswordHandler}
                />
              ) : (
                <AiOutlineEye
                  className='absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-400'
                  onClick={showConfirmPasswordHandler}
                />
              )}
              <input
                id='confirmPassword'
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                {...formik.getFieldProps('confirmPassword')}
                className='block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-2 focus:border-primaryLight focus:outline-none sm:text-sm'
                placeholder='******'
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className='text-red-600'>{formik.errors.confirmPassword}</p>
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
        {isError && (
          <div className='mt-4 w-full rounded-lg bg-red-500 p-2.5 text-center text-sm text-white md:text-base'>
            {error?.data?.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgetPassword
