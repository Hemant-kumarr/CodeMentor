import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronRight, ExternalLink } from 'lucide-react';
import { resources } from '../data/curriculum';
import ResourceCard from '../components/ResourceCard';

const ResourcesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  // Update document title
  React.useEffect(() => {
    document.title = 'Resources - CodeMentor';
  }, []);
  
  // Filter resources based on type
  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === filter);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>Resources</span>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resources</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Helpful references, cheat sheets, and tools to support your learning
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex overflow-x-auto py-4 mb-6">
        <button
          className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm font-medium ${
            filter === 'all'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          onClick={() => setFilter('all')}
        >
          All Resources
        </button>
        
        <button
          className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm font-medium ${
            filter === 'cheatsheet'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          onClick={() => setFilter('cheatsheet')}
        >
          Cheat Sheets
        </button>
        
        <button
          className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm font-medium ${
            filter === 'reference'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          onClick={() => setFilter('reference')}
        >
          References
        </button>
        
        <button
          className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm font-medium ${
            filter === 'tool'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          onClick={() => setFilter('tool')}
        >
          Tools
        </button>
        
        <button
          className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm font-medium ${
            filter === 'article'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          onClick={() => setFilter('article')}
        >
          Articles
        </button>
      </div>
      
      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      
      {/* External Resources */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">More Learning Resources</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Here are some additional resources from around the web to enhance your learning journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://developer.mozilla.org/en-US/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md mr-4">
              <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">MDN Web Docs</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">The complete resource for web developers, by Mozilla.</p>
            </div>
          </a>
          
          <a 
            href="https://www.freecodecamp.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md mr-4">
              <ExternalLink className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">freeCodeCamp</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Learn to code with free courses, projects, and certifications.</p>
            </div>
          </a>
          
          <a 
            href="https://css-tricks.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-md mr-4">
              <ExternalLink className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">CSS Tricks</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Articles, tutorials, and guides for CSS and frontend development.</p>
            </div>
          </a>
          
          <a 
            href="https://javascript.info/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-md mr-4">
              <ExternalLink className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">JavaScript.info</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Modern JavaScript tutorial from the basics to advanced topics.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;