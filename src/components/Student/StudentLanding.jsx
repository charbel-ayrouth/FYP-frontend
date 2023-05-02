import useAuth from '../../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import StudentLandingPage from './StudentLandingPage'

const StudentLanding = () => {
  const { setupComplete } = useAuth()
  const location = useLocation()

  let content

  if (setupComplete === false) {
    content = (
      <Navigate to={'/account-setup'} state={{ from: location }} replace />
    )
  }

  if (setupComplete === true) {
    content = <StudentLandingPage />
  }
  return content
}

export default StudentLanding
