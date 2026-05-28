import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  function validate() {
    const e = {}
    if (!email.includes('@')) e.email = 'Please enter a valid email.'
    if (password.length < 6) e.password = 'Password must be at least 6 characters.'
    return e
  }

  function handleSubmit(event) {
    event.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    const result = login(email, password)
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__logo">TenantTrails</h1>
        <p className="auth-card__subtitle">
          See what past tenants had to say, before you sign.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="alex@dal.ca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>

          {errors.form && <span className="form-error">{errors.form}</span>}

          <button type="submit" className="auth-submit">
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

        <div className="auth-demo">
          Demo: <strong>alex@dal.ca</strong> / <strong>password123</strong>
        </div>
      </div>
    </div>
  )
}

export default Login
