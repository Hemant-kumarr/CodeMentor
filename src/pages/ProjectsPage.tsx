import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, ChevronRight } from 'lucide-react';
import { projects } from '../data/curriculum';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage: React.FC = () => {
  const [filters, setFilters] = useState({
    difficulty: 'all',
    search: '',
  });
  
  // Update document title
  React.useEffect(() => {
    document.title = 'Projects - CodeMentor';
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
  };
  
  // Filter projects based on criteria
  const filteredProjects = projects.filter(project => {
    // Filter by difficulty
    if (filters.difficulty !== 'all' && project.difficulty !== filters.difficulty) {
      return false;
    }
    
    // Filter by search query
    if (filters.search && !project.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !project.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>Projects</span>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Apply your skills by building real-world projects
        </p>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">Filter:</span>
            <div>
              <select
                name="difficulty"
                value={filters.difficulty}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div className="relative flex-1 md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search projects"
              value={filters.search}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects match your filters</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search query</p>
          <button
            onClick={() => setFilters({ difficulty: 'all', search: '' })}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;