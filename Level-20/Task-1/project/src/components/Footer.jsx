import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {year} TaskMaster. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/tasks" className="text-gray-600 hover:text-primary-600 transition-colors">
              Tasks
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
              Login
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              <FaGithub className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer