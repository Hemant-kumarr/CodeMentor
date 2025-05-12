import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Badge as BadgeType } from '../data/curriculum';

interface BadgeProps {
  badge: BadgeType;
  earned?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ badge, earned = false }) => {
  // Dynamically get the icon from Lucide
  const IconComponent = LucideIcons[badge.icon as keyof typeof LucideIcons] || LucideIcons.Award;

  return (
    <div 
      className={`relative flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
        earned 
          ? `${badge.color} text-white shadow-md transform hover:-translate-y-1` 
          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
      }`}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-2">
        <IconComponent size={32} />
      </div>
      <h3 className="text-sm font-bold text-center">{badge.title}</h3>
      <p className="text-xs text-center mt-1 opacity-90">{badge.description}</p>
      
      {!earned && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 bg-opacity-70 dark:bg-opacity-70 rounded-lg flex items-center justify-center">
          <LucideIcons.Lock className="text-gray-500 dark:text-gray-400" size={24} />
        </div>
      )}
    </div>
  );
};

export default Badge;