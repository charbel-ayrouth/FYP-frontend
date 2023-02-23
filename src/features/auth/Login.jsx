import React from 'react'

const Login = () => {
  return (
    <section className='bg-gray-900'>
      <div className='flex flex-col justify-center items-center px-6 py-8 mx-auto h-screen lg:py-0'>
        {/* Title */}
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-white'
        >
          <img
            className='mr-2 w-8 h-8'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          Flowbite
        </a>
        {/* Form container*/}
        <div className='w-full bg-gray-800 rounded border-gray-700 shadow sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 sm:p-8 md:space-y-6'>
            <h1 className='text-xl font-bold tracking-tight leading-tight text-white md:text-2xl'>
              Create account
            </h1>
            {/* Form */}
            <form className='space-y-4 md:space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className=' sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  placeholder='name@email.com'
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className=' sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  placeholder='******'
                />
              </div>
              {/* Button */}
              <button
                type='submit'
                className='w-full text-white  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
