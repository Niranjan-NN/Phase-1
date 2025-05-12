import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'mysecretkey', {
    expiresIn: '30d'
  })
}

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    
    // Check if user exists
    const userExists = await User.findOne({ email })
    
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password
    })
    
    if (user) {
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    
    // Check for user email
    const user = await User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } catch (error) {
    next(error)
  }
}