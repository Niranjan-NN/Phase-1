import Task from '../models/taskModel.js'

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body
    
    if (!title) {
      res.status(400)
      throw new Error('Please add a title')
    }
    
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate
    })
    
    res.status(201).json(task)
  } catch (error) {
    next(error)
  }
}

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    
    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to access this task')
    }
    
    res.json(task)
  } catch (error) {
    next(error)
  }
}

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body
    
    const task = await Task.findById(req.params.id)
    
    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to update this task')
    }
    
    // Update task
    task.title = title || task.title
    task.description = description !== undefined ? description : task.description
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate
    
    const updatedTask = await task.save()
    
    res.json(updatedTask)
  } catch (error) {
    next(error)
  }
}

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    
    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to delete this task')
    }
    
    await task.deleteOne()
    
    res.json({ message: 'Task removed' })
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle task completion status
// @route   PATCH /api/tasks/:id/toggle
// @access  Private
export const toggleTaskCompletion = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    
    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to update this task')
    }
    
    // Toggle completed status
    task.completed = req.body.completed !== undefined ? req.body.completed : !task.completed
    
    const updatedTask = await task.save()
    
    res.json(updatedTask)
  } catch (error) {
    next(error)
  }
}