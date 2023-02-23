import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    // mount => unmount => remount (react 18)
    console.log('subscribing')
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate()) // manual subscribtion
    return () => {
      console.log('unsubscribing')
      users.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch
