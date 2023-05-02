import useAuth from '../../hooks/useAuth'
import SupervisorLandingPage from './SupervisorLandingPage'
import { Navigate, useLocation } from 'react-router-dom'

const SupervisorLanding = () => {
  const { setupComplete } = useAuth()
  const location = useLocation()

  let content

  if (setupComplete === false) {
    content = (
      <Navigate to={'/account-setup'} state={{ from: location }} replace />
    )
  }

  if (setupComplete === true) {
    content = <SupervisorLandingPage />
  }
  return content
}

export default SupervisorLanding
