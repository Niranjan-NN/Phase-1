import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

// Home route
app.get('/', (req, res) => {
  res.send('TaskMaster API is running...')
})

// Error middleware
app.use(errorHandler)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskmaster')
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })