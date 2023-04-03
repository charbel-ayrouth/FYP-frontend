import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const { pathname } = useLocation()

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    // React 18 strict mode (effectRan will be true the second time) mount => unmount => remount
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // verify function
      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          await refresh()
          setTrueSuccess(true)
        } catch (error) {
          console.error(error)
        }
      }

      // wa2ta ne3mil refresh bet rouh token mn state mechen hek !token
      if (!token && persist) verifyRefreshToken()
    }

    return () => (effectRan.current = true)
    // eslint-disable-next-line
  }, [])

  let content

  if (!persist) {
    // persist: no
    console.log('no persist')
    content = <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no (refresh token will only load here)
    console.log('loading')
    content = <LoadingSpinner />
  } else if (isError) {
    //persist: yes, token: no
    console.log('error')
    content = <Navigate to={'/401'} replace />
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}

export default PersistLogin
