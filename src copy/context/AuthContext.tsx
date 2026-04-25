import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '../api'
import type { User } from '../types'

interface AuthContextType {
  user: User | null; token: string | null; loading: boolean
  login:    (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>
  logout:   () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null)
  const [token,   setToken]   = useState<string | null>(localStorage.getItem('fh_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      authAPI.me().then(res => setUser(res.data)).catch(logout).finally(() => setLoading(false))
    } else { setLoading(false) }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authAPI.login(email, password)
    localStorage.setItem('fh_token', res.data.token)
    setToken(res.data.token); setUser(res.data.user)
  }

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const res = await authAPI.register(name, email, password, phone)
    localStorage.setItem('fh_token', res.data.token)
    setToken(res.data.token); setUser(res.data.user)
  }

  const logout = () => {
    localStorage.removeItem('fh_token'); setToken(null); setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
