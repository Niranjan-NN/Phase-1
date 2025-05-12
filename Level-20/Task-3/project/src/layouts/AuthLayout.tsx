import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';
import ThemeToggle from '../components/navigation/ThemeToggle';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container-custom py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold">360Connect</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-grow container-custom max-w-md py-12">
        <Outlet />
      </main>
      
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="container-custom">
          <p>&copy; {new Date().getFullYear()} 360Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;