import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wraps a page that requires login. While the initial /me check runs we wait,
// so a logged-in user refreshing a protected page is not bounced to /login.
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
