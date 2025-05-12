import React from 'react';
import { ExternalLink, Award, BookOpen } from 'lucide-react';
import { Project } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import * as LucideIcons from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { completedProjects, markProjectComplete } = useProgress();
  const isCompleted = completedProjects.includes(project.id);
  
  // Determine badge color based on difficulty
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };
  
  const handleComplete = () => {
    markProjectComplete(project.id);
  };
  
  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty]}`}>
            {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
          </span>
        </div>
        {isCompleted && (
          <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
            <Award size={16} />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Required Topics</h4>
          <div className="flex flex-wrap gap-2">
            {project.topics.map(topicId => {
              // Get the first letter icon for each topic
              const iconName = topicId.includes('html') ? 'Code' : 
                               topicId.includes('css') ? 'Palette' : 
                               topicId.includes('javascript') ? 'FileCode' : 'BookOpen';
              
              const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
              
              return (
                <div key={topicId} className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {IconComponent && <IconComponent size={12} className="mr-1" />}
                  <span>{topicId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-amber-600 dark:text-amber-400">
            <Award size={16} className="mr-1" />
            <span className="text-sm font-medium">{project.xpReward} XP</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={`px-3 py-1 rounded text-xs font-medium ${
                isCompleted 
                  ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'
              }`}
            >
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
            
            <a 
              href="#" 
              className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
            >
              <span className="mr-1">View</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;