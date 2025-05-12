import { Link } from 'react-router-dom'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <FaExclamationTriangle className="mx-auto h-16 w-16 text-warning-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-base text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center"
          >
            <FaHome className="mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage