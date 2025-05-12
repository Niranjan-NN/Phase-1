import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'
import { API_URL } from '../config'

const TaskContext = createContext()

export const useTask = () => useContext(TaskContext)

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuth()

  // Get all tasks
  const getTasks = useCallback(async () => {
    if (!isAuthenticated) return

    setLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(res.data)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks')
      setLoading(false)
    }
  }, [isAuthenticated])

  // Create task
  const createTask = async (taskData) => {
    setLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(`${API_URL}/api/tasks`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks([...tasks, res.data])
      setLoading(false)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task')
      setLoading(false)
      throw err
    }
  }

  // Update task
  const updateTask = async (id, taskData) => {
    setLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(`${API_URL}/api/tasks/${id}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(tasks.map(task => task._id === id ? res.data : task))
      setLoading(false)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task')
      setLoading(false)
      throw err
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    setLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(tasks.filter(task => task._id !== id))
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task')
      setLoading(false)
      throw err
    }
  }

  // Toggle task completion
  const toggleTaskCompletion = async (id, completed) => {
    setLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      const res = await axios.patch(`${API_URL}/api/tasks/${id}/toggle`, { completed }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(tasks.map(task => task._id === id ? res.data : task))
      setLoading(false)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to toggle task completion')
      setLoading(false)
      throw err
    }
  }

  // Filter tasks by completion status
  const filterTasks = (status) => {
    if (status === 'all') {
      return tasks
    }
    return tasks.filter(task => task.completed === (status === 'completed'))
  }

  useEffect(() => {
    if (isAuthenticated) {
      getTasks()
    }
  }, [isAuthenticated, getTasks])

  const value = {
    tasks,
    loading,
    error,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    filterTasks
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}