import React from 'react'

const Settings = () => {
  return (
    <div className='rounded-lg bg-white p-6 shadow'>
      <h2 className='mb-6 text-xl font-bold'>Settings</h2>
      <div className='flex flex-col'>
        <label htmlFor='name' className='mb-2 font-bold text-gray-700'>
          Name
        </label>
        <input
          id='name'
          name='name'
          type='text'
          placeholder='John Doe'
          className='mb-4 rounded-lg border-2 border-gray-400 px-4 py-2'
          disabled
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='email' className='mb-2 font-bold text-gray-700'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='john.doe@example.com'
          className='mb-4 rounded-lg border-2 border-gray-400 px-4 py-2'
          disabled
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='password' className='mb-2 font-bold text-gray-700'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='**********'
          className='mb-4 rounded-lg border-2 border-gray-400 px-4 py-2'
          disabled
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='language' className='mb-2 font-bold text-gray-700'>
          Language
        </label>
        <select
          id='language'
          name='language'
          className='mb-4 rounded-lg border-2 border-gray-400 px-4 py-2'
          defaultValue='en'
          disabled
        >
          <option value='en'>English</option>
          <option value='fr'>French</option>
          <option value='es'>Spanish</option>
        </select>
      </div>
      <div className='flex flex-col'>
        <label htmlFor='notifications' className='mb-2 font-bold text-gray-700'>
          Notifications
        </label>
        <div className='flex items-center'>
          <input
            id='notifications'
            name='notifications'
            type='checkbox'
            className='mr-2 rounded-lg border-2 border-gray-400 px-4 py-2'
            disabled
          />
          <label htmlFor='notifications' className='text-gray-700'>
            Receive notifications
          </label>
        </div>
      </div>
      <button
        className='mt-6 rounded-lg bg-blue-500 py-2 px-4 font-bold text-white'
        disabled
      >
        Save Changes
      </button>
    </div>
  )
}

export default Settings
