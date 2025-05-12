import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';
import { Topic } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import * as LucideIcons from 'lucide-react';
import ProgressBar from './ProgressBar';

interface TopicCardProps {
  topic: Topic;
  isUnlocked: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, isUnlocked }) => {
  const { completedLessons } = useProgress();
  
  // Calculate progress percentage
  const totalLessons = topic.lessons.length;
  const completedCount = topic.lessons.filter(lesson => 
    completedLessons.includes(lesson.id)
  ).length;
  
  const progressPercentage = totalLessons > 0 
    ? (completedCount / totalLessons) * 100 
    : 0;
  
  // Dynamically get the icon component from Lucide
  const IconComponent = LucideIcons[topic.icon as keyof typeof LucideIcons] || LucideIcons.BookOpen;
  
  return (
    <div 
      className={`relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 
      ${isUnlocked 
        ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700' 
        : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'}`}
    >
      <div className={`h-2 w-full ${topic.color}`}></div>
      
      <div className="p-5">
        <div className="flex items-start mb-4">
          <div className={`p-2 rounded-md ${topic.color} text-white mr-4`}>
            <IconComponent size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className={`font-bold text-lg mb-1 ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
              {topic.title}
            </h3>
            <p className={`text-sm ${isUnlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>
              {topic.description}
            </p>
          </div>
        </div>
        
        {isUnlocked && (
          <>
            <ProgressBar 
              progress={progressPercentage} 
              color={topic.color} 
              label={`${completedCount}/${totalLessons} lessons completed`}
              size="sm"
            />
            
            <div className="mt-4">
              <Link
                to={`/roadmap?topic=${topic.id}`}
                className="flex items-center justify-between text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <span>Start learning</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </>
        )}
        
        {!isUnlocked && (
          <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <Lock size={16} className="mr-2" />
            <span>Complete previous topics to unlock</span>
          </div>
        )}
      </div>
      
      {!isUnlocked && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 bg-opacity-10 dark:bg-opacity-20 backdrop-blur-[1px]"></div>
      )}
    </div>
  );
};

export default TopicCard;