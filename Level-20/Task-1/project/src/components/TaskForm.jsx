import { useState, useEffect } from 'react'
import { FaPlus, FaEdit } from 'react-icons/fa'

const TaskForm = ({ task = null, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // If task is provided, populate form for editing
    if (task) {
      setTitle(task.title || '')
      setDescription(task.description || '')
      // Format date to YYYY-MM-DD for input field
      if (task.dueDate) {
        const formattedDate = new Date(task.dueDate).toISOString().split('T')[0]
        setDueDate(formattedDate)
      } else {
        setDueDate('')
      }
    }
  }, [task])

  const validateForm = () => {
    const newErrors = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = 'Due date cannot be in the past'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const taskData = {
        title,
        description,
        dueDate: dueDate || null
      }
      
      onSubmit(taskData)
      
      // Clear form if not editing
      if (!task) {
        setTitle('')
        setDescription('')
        setDueDate('')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {task ? (
          <>
            <FaEdit className="mr-2 text-secondary-500" />
            Edit Task
          </>
        ) : (
          <>
            <FaPlus className="mr-2 text-primary-500" />
            Add New Task
          </>
        )}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title*
        </label>
        <input
          type="text"
          id="title"
          className={`input ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
        {errors.title && <p className="mt-1 text-sm text-error-500">{errors.title}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        ></textarea>
      </div>
      
      <div className="mb-6">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          className={`input ${errors.dueDate ? 'border-error-500 focus:ring-error-500' : ''}`}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <p className="mt-1 text-sm text-error-500">{errors.dueDate}</p>}
      </div>
      
      <div className="flex justify-end space-x-3">
        {task && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm