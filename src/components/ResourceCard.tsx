import React from 'react';
import { Resource } from '../data/curriculum';
import * as LucideIcons from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  // Dynamically get icon from Lucide
  const IconComponent = LucideIcons[resource.icon as keyof typeof LucideIcons] || LucideIcons.FileText;
  
  // Determine background color based on resource type
  const getBgColor = () => {
    switch (resource.type) {
      case 'cheatsheet':
        return 'bg-blue-50 dark:bg-blue-900/30';
      case 'reference':
        return 'bg-green-50 dark:bg-green-900/30';
      case 'tool':
        return 'bg-purple-50 dark:bg-purple-900/30';
      case 'article':
        return 'bg-amber-50 dark:bg-amber-900/30';
      default:
        return 'bg-gray-50 dark:bg-gray-900/30';
    }
  };
  
  // Determine icon color based on resource type
  const getIconColor = () => {
    switch (resource.type) {
      case 'cheatsheet':
        return 'text-blue-500 dark:text-blue-400';
      case 'reference':
        return 'text-green-500 dark:text-green-400';
      case 'tool':
        return 'text-purple-500 dark:text-purple-400';
      case 'article':
        return 'text-amber-500 dark:text-amber-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };
  
  return (
    <a 
      href={resource.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      <div className={`p-5 ${getBgColor()}`}>
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-md ${getIconColor()} bg-white dark:bg-gray-800`}>
            <IconComponent size={20} />
          </div>
          <span className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
            {resource.type}
          </span>
        </div>
        
        <h3 className="font-bold text-md text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {resource.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {resource.description}
        </p>
      </div>
    </a>
  );
};

export default ResourceCard;