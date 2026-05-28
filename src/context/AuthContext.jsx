import { createContext, useContext, useState } from 'react'
import { demoUser } from '../data/mockData'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Returns { ok: true } on success or { ok: false, error } on failure.
  function login(email, password) {
    if (email === demoUser.email && password === demoUser.password) {
      setUser({ name: demoUser.name, email: demoUser.email })
      return { ok: true }
    }
    return { ok: false, error: 'Invalid email or password.' }
  }

  // Creates an account from the signup form and logs the user in.
  function signup(name, email) {
    setUser({ name, email })
    return { ok: true }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
