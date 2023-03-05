import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { topicsApiSlice } from '../topics/topicsApiSlice'

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    )
    store.dispatch(
      topicsApiSlice.util.prefetch('getTopics', 'topicsList', { force: true })
    )
  }, [])

  return <Outlet />
}

export default Prefetch
