import { Link } from 'react-router-dom'
import { FaTasks, FaCheckCircle, FaClock, FaUserFriends } from 'react-icons/fa'

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Stay Organized, Get More Done
              </h1>
              <p className="text-xl opacity-90 mb-8">
                TaskMaster helps you manage your tasks efficiently, so you can focus on what really matters.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/register" 
                  className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-2 transition-transform hover:rotate-0">
                <div className="flex items-center mb-4">
                  <div className="h-3 w-3 bg-error-500 rounded-full mr-2"></div>
                  <div className="h-3 w-3 bg-warning-500 rounded-full mr-2"></div>
                  <div className="h-3 w-3 bg-success-500 rounded-full"></div>
                </div>
                <h3 className="text-gray-800 font-medium mb-2">Your Tasks</h3>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center py-2 border-b border-gray-200 last:border-b-0">
                    <div className="h-4 w-4 rounded-full border border-primary-500 mr-3"></div>
                    <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                  </div>
                ))}
                <div className="flex items-center py-2">
                  <div className="h-4 w-4 bg-success-500 rounded-full flex items-center justify-center mr-3">
                    <FaCheckCircle className="text-white text-xs" />
                  </div>
                  <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TaskMaster?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built a task management application that helps you stay organized and productive
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <FaTasks className="text-primary-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Organization</h3>
              <p className="text-gray-600">
                Keep all your tasks organized in one place. Create, update, and delete tasks with ease.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <FaCheckCircle className="text-secondary-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Keep track of completed and pending tasks. Filter your tasks based on their completion status.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <FaClock className="text-accent-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Due Dates</h3>
              <p className="text-gray-600">
                Set due dates for your tasks and never miss a deadline again. Receive timely reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of users who have transformed their productivity with TaskMaster.
          </p>
          <Link 
            to="/register" 
            className="btn bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold text-lg"
          >
            Sign Up Now — It's Free!
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage