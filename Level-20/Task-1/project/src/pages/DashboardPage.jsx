import { useEffect, useState } from 'react'
import { FaUser, FaCalendarAlt, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { useTask } from '../contexts/TaskContext'
import TaskForm from '../components/TaskForm'

const DashboardPage = () => {
  const { user } = useAuth()
  const { tasks, loading, createTask, filterTasks } = useTask()
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    dueSoon: 0
  })

  useEffect(() => {
    if (tasks.length > 0) {
      const completed = tasks.filter(task => task.completed).length
      const pending = tasks.length - completed
      
      // Tasks due in the next 3 days
      const today = new Date()
      const threeDaysLater = new Date()
      threeDaysLater.setDate(today.getDate() + 3)
      
      const dueSoon = tasks.filter(task => {
        if (!task.dueDate || task.completed) return false
        const dueDate = new Date(task.dueDate)
        return dueDate >= today && dueDate <= threeDaysLater
      }).length
      
      setTaskCounts({
        total: tasks.length,
        completed,
        pending,
        dueSoon
      })
    }
  }, [tasks])

  const handleCreateTask = async (taskData) => {
    await createTask(taskData)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your tasks and productivity
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-gray-500">
            <FaCalendarAlt className="inline mr-1" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500 transform transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{taskCounts.total}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <FaUser className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-success-500 transform transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{taskCounts.completed}</p>
            </div>
            <div className="p-3 bg-success-100 rounded-full">
              <FaCheckCircle className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary-500 transform transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{taskCounts.pending}</p>
            </div>
            <div className="p-3 bg-secondary-100 rounded-full">
              <FaHourglassHalf className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-warning-500 transform transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Due Soon</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{taskCounts.dueSoon}</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-full">
              <FaCalendarAlt className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks & Add Task */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <TaskForm onSubmit={handleCreateTask} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-primary-500 border-solid"></div>
              </div>
            ) : (
              <div>
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No tasks yet. Create your first task to get started!</p>
                  </div>
                ) : (
                  <div>
                    {tasks.slice(0, 5).map(task => (
                      <div 
                        key={task._id} 
                        className={`py-3 px-4 border-l-4 mb-3 rounded bg-gray-50 
                          ${task.completed ? 'border-success-500' : 'border-primary-500'}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-3 ${task.completed ? 'bg-success-500' : 'bg-primary-500'}`}></div>
                            <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {task.title}
                            </span>
                          </div>
                          {task.dueDate && (
                            <span className="text-xs text-gray-500">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage