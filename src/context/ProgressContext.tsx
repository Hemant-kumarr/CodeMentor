import React, { createContext, useContext, useState, useEffect } from 'react';
import { topics } from '../data/curriculum';

interface ProgressContextType {
  completedLessons: string[];
  completedProjects: string[];
  xpPoints: number;
  badges: string[];
  streakDays: number;
  markLessonComplete: (lessonId: string) => void;
  markProjectComplete: (projectId: string) => void;
  earnBadge: (badgeId: string) => void;
  increaseXP: (amount: number) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedProjects, setCompletedProjects] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedProjects');
    return saved ? JSON.parse(saved) : [];
  });

  const [xpPoints, setXpPoints] = useState<number>(() => {
    const saved = localStorage.getItem('xpPoints');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [badges, setBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem('badges');
    return saved ? JSON.parse(saved) : [];
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('streakDays');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    localStorage.setItem('completedProjects', JSON.stringify(completedProjects));
    localStorage.setItem('xpPoints', xpPoints.toString());
    localStorage.setItem('badges', JSON.stringify(badges));
    localStorage.setItem('streakDays', streakDays.toString());
  }, [completedLessons, completedProjects, xpPoints, badges, streakDays]);

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      increaseXP(10); // Award XP for completing a lesson

      // Check for potential badges
      if (completedLessons.length + 1 === 1) {
        earnBadge('first-lesson');
      }
      if (completedLessons.length + 1 === 10) {
        earnBadge('ten-lessons');
      }
    }
  };

  const markProjectComplete = (projectId: string) => {
    if (!completedProjects.includes(projectId)) {
      setCompletedProjects([...completedProjects, projectId]);
      increaseXP(50); // Award XP for completing a project

      // Check for potential badges
      if (completedProjects.length + 1 === 1) {
        earnBadge('first-project');
      }
      if (completedProjects.length + 1 === 5) {
        earnBadge('five-projects');
      }
    }
  };

  const earnBadge = (badgeId: string) => {
    if (!badges.includes(badgeId)) {
      setBadges([...badges, badgeId]);
    }
  };

  const increaseXP = (amount: number) => {
    setXpPoints(prev => prev + amount);
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    setCompletedProjects([]);
    setXpPoints(0);
    setBadges([]);
    setStreakDays(0);
  };

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        completedProjects,
        xpPoints,
        badges,
        streakDays,
        markLessonComplete,
        markProjectComplete,
        earnBadge,
        increaseXP,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};