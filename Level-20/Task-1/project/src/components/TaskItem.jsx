import { useState } from 'react'
import { FaCheck, FaTrash, FaEdit, FaClock } from 'react-icons/fa'
import { formatDistanceToNow } from '../utils/dateUtils'

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow-task p-4 mb-3 border-l-4 transition-all duration-300 
        ${task.completed ? 'border-success-500 bg-success-50' : 'border-primary-500'}
        ${isExpanded ? 'scale-[1.02]' : 'scale-100'}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggle(task._id, !task.completed)}
            className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center transition-colors
              ${task.completed 
                ? 'bg-success-500 border-success-500 text-white' 
                : 'border-gray-300 hover:border-primary-500'
              }`}
          >
            {task.completed && <FaCheck className="h-3 w-3" />}
          </button>
          
          <div className="flex-1">
            <h3 
              className={`text-lg font-medium leading-tight cursor-pointer
                ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}
              `}
              onClick={toggleExpand}
            >
              {task.title}
            </h3>
            
            {(task.dueDate || isExpanded) && (
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <FaClock className="mr-1 h-3 w-3" />
                {task.dueDate ? (
                  formatDistanceToNow(new Date(task.dueDate))
                ) : (
                  <span>No due date</span>
                )}
              </div>
            )}
            
            {isExpanded && task.description && (
              <p className={`mt-2 text-sm ${task.completed ? 'text-gray-500' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-secondary-500 transition-colors p-1"
            title="Edit task"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-500 hover:text-error-500 transition-colors p-1"
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem