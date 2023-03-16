import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { topicsApiSlice } from '../topics/topicsApiSlice'
import { domainsApiSlice } from '../domains/domainsApiSlice'

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    )
    store.dispatch(
      topicsApiSlice.util.prefetch('getTopics', 'topicsList', { force: true })
    )
    store.dispatch(
      domainsApiSlice.util.prefetch('getDomains', 'domainsList', {
        force: true,
      })
    )
  }, [])

  // useEffect(() => {
  //   const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
  //   const topics = store.dispatch(topicsApiSlice.endpoints.getTopics.initiate())
  //   const domains = store.dispatch(
  //     domainsApiSlice.endpoints.getDomains.initiate()
  //   )

  //   return () => {
  //     users.unsubscribe()
  //     topics.unsubscribe()
  //     domains.unsubscribe()
  //   }
  // }, [])

  return <Outlet />
}

export default Prefetch
