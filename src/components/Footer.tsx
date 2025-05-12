import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github as GitHub, Twitter, Linkedin, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-inner py-8 mt-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">CodeMentor</span>
            </Link>
            <p className="text-sm">
              Your personal mentor for learning frontend development. Progress from beginner to advanced with interactive lessons and projects.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/roadmap" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Learning Roadmap</Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/playground" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Code Playground</Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Feedback</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <GitHub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <MessageCircle size={20} />
                <span className="sr-only">Discord</span>
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm">Join our community to get help and share your progress.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} CodeMentor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;