import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'bg-blue-500', 
  label,
  size = 'md',
  showPercentage = true
}) => {
  // Ensure progress is within 0-100 range
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4'
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{Math.round(normalizedProgress)}%</span>
          )}
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div 
          className={`${color} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;