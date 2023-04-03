import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)

  if (token) {
    const decoded = jwtDecode(token)
    const { email, role, id, username } = decoded.UserInfo

    return { email, role, id, username }
  }

  return { email: '', role: '', id: '', username: '' }
}

export default useAuth
