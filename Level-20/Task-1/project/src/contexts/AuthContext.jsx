import { createContext, useContext, useState, useCallback } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is authenticated
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      setLoading(false)
      return
    }
    
    try {
      const res = await axios.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(res.data)
      setLoading(false)
    } catch (err) {
      localStorage.removeItem('token')
      setUser(null)
      setLoading(false)
    }
  }, [])

  // Register user
  const register = async (userData) => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await axios.post(`${API_URL}/api/users/register`, userData)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      setLoading(false)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      setLoading(false)
      throw err
    }
  }

  // Login user
  const login = async (userData) => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, userData)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      setLoading(false)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setLoading(false)
      throw err
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    checkAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}