import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const { signup } = useAuth()
  const navigate = useNavigate()

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Please enter your name.'
    if (!email.includes('@')) e.email = 'Please enter a valid email.'
    if (password.length < 6) e.password = 'Password must be at least 6 characters.'
    if (confirm !== password) e.confirm = 'Passwords do not match.'
    return e
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    const result = await signup(name, email, password)
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
          Create your account to submit reviews and comments.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
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
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              placeholder="Repeat password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {errors.confirm && (
              <span className="form-error">{errors.confirm}</span>
            )}
          </div>

          {errors.form && <span className="form-error">{errors.form}</span>}

          <button type="submit" className="auth-submit">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
