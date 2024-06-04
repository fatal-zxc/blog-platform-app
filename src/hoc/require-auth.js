import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function RequireAuth({ children }) {
  const auth = Cookies.get('authToken')

  if (!auth) {
    return <Navigate to="/sign-in" />
  }

  return children
}
