import useAuth from '../../hooks/useAuth'
import SupervisorLandingPage from './SupervisorLandingPage'
import { useAccountSetupQuery } from '../../features/auth/authApiSlice'
import LoadingSpinner from '../LoadingSpinner'
import { Navigate, useLocation } from 'react-router-dom'

const SupervisorLanding = () => {
  const { id } = useAuth()
  const location = useLocation()

  const { isError, isLoading, isSuccess } = useAccountSetupQuery({
    id,
  })

  let content

  if (isLoading) content = <LoadingSpinner />

  if (isError) {
    content = (
      <Navigate to={'/account-setup'} state={{ from: location }} replace />
    )
  }

  if (isSuccess) {
    content = <SupervisorLandingPage />
  }
  return content
}

export default SupervisorLanding
