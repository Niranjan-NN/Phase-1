import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = async (req, res, next) => {
  try {
    let token
    
    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey')
        
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password')
        
        next()
      } catch (error) {
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }
    
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  } catch (error) {
    next(error)
  }
}