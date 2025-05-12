import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const { isAuthenticated, loading, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 border-solid"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route 
          path="dashboard" 
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="tasks" 
          element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" />} 
        />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App