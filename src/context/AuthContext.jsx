import { createContext, useContext, useState, useEffect } from 'react'
import { API } from '../api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // true until the /me check finishes

  // On first load, ask the API who we are. The httpOnly cookie rides along,
  // so a logged-in user stays logged in across refreshes.
  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  // Returns { ok: true } on success or { ok: false, error } on failure.
  async function login(email, password) {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return { ok: false, error: data.error || 'Invalid email or password.' }
    }
    const data = await res.json()
    setUser(data.user)
    return { ok: true }
  }

  // Creates an account, sets the cookie, and logs the user in.
  async function signup(name, email, password) {
    const res = await fetch(`${API}/api/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return { ok: false, error: data.error || 'Could not create account.' }
    }
    const data = await res.json()
    setUser(data.user)
    return { ok: true }
  }

  async function logout() {
    await fetch(`${API}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {})
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
