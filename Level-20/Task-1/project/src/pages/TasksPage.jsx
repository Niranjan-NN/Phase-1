import { useState } from 'react'
import { useTask } from '../contexts/TaskContext'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

const TasksPage = () => {
  const { createTask } = useTask()
  
  const handleCreateTask = async (taskData) => {
    await createTask(taskData)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Manage Your Tasks
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <TaskForm onSubmit={handleCreateTask} />
        </div>
        
        <div className="md:col-span-2">
          <TaskList />
        </div>
      </div>
    </div>
  )
}

export default TasksPage