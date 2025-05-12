import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear related error
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
    
    // Clear login error when user types
    if (loginError) {
      setLoginError('')
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const { email, password } = formData
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setLoading(true)
      setLoginError('')
      
      try {
        await login(formData)
        navigate('/dashboard')
      } catch (err) {
        setLoginError(err.response?.data?.message || 'Login failed. Please check your credentials.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign in to TaskMaster</h1>
          <p className="mt-2 text-gray-600">
            Or{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          {loginError && (
            <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md">
              {loginError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`input pl-10 ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-error-500">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={`input pl-10 ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-error-500">{errors.password}</p>}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <FaSignInAlt className="mr-2" />
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage