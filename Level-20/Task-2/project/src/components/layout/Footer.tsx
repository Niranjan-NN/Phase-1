import React from 'react';
import { BookOpen, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookOpen size={24} />
            <span className="text-xl font-serif font-bold">BookShelf</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-teal-300 transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BookShelf. All rights reserved.</p>
          <p className="mt-1">Made with React, Node.js, and MongoDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;