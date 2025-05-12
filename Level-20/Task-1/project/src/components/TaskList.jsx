import { useState } from 'react'
import { FaTasks, FaCheck, FaClock } from 'react-icons/fa'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import { useTask } from '../contexts/TaskContext'

const TaskList = () => {
  const { tasks, loading, filterTasks, toggleTaskCompletion, updateTask, deleteTask } = useTask()
  const [filter, setFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)

  const filteredTasks = filterTasks(filter)
  
  const handleEdit = (task) => {
    setEditingTask(task)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleCancelEdit = () => {
    setEditingTask(null)
  }
  
  const handleUpdateTask = (taskData) => {
    updateTask(editingTask._id, taskData)
    setEditingTask(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center my-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary-500 border-solid"></div>
      </div>
    )
  }

  return (
    <div>
      {editingTask && (
        <TaskForm 
          task={editingTask} 
          onSubmit={handleUpdateTask} 
          onCancel={handleCancelEdit} 
        />
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold mb-4 md:mb-0 flex items-center">
            <FaTasks className="mr-2 text-primary-500" />
            Your Tasks
          </h2>
          
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${
                filter === 'all' 
                  ? 'bg-white shadow text-primary-600 font-medium' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded flex items-center ${
                filter === 'active' 
                  ? 'bg-white shadow text-primary-600 font-medium' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <FaClock className="mr-1 h-3 w-3" />
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded flex items-center ${
                filter === 'completed' 
                  ? 'bg-white shadow text-success-600 font-medium' 
                  : 'text-gray-600 hover:text-success-600'
              }`}
            >
              <FaCheck className="mr-1 h-3 w-3" />
              Completed
            </button>
          </div>
        </div>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No {filter !== 'all' ? filter : ''} tasks found</p>
            <p className="mt-2">Create a new task to get started</p>
          </div>
        ) : (
          <div>
            {filteredTasks.map(task => (
              <TaskItem 
                key={task._id}
                task={task}
                onToggle={toggleTaskCompletion}
                onEdit={handleEdit}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList