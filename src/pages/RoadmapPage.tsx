import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BookOpen, ChevronRight, ArrowRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { topics } from '../data/curriculum';
import TopicCard from '../components/TopicCard';
import ProgressBar from '../components/ProgressBar';
import * as LucideIcons from 'lucide-react';

const RoadmapPage: React.FC = () => {
  const location = useLocation();
  const { completedLessons } = useProgress();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Update document title
  useEffect(() => {
    document.title = 'Learning Roadmap - CodeMentor';
  }, []);
  
  // Parse topic from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topicId = params.get('topic');
    if (topicId) {
      setSelectedTopic(topicId);
    }
  }, [location.search]);
  
  // Calculate progress for each topic
  const topicsWithProgress = topics.map(topic => {
    const totalLessons = topic.lessons.length;
    const completedCount = topic.lessons.filter(lesson => 
      completedLessons.includes(lesson.id)
    ).length;
    
    const progress = totalLessons > 0 
      ? (completedCount / totalLessons) * 100 
      : 0;
    
    return {
      ...topic,
      completedCount,
      totalLessons,
      progress
    };
  });
  
  // Determine which topics are unlocked
  const unlockedTopics = new Set<string>(['html-basics']); // First topic is always unlocked
  
  // Check for topics that are unlocked based on prerequisites
  let changed = true;
  while (changed) {
    changed = false;
    for (const topic of topics) {
      if (unlockedTopics.has(topic.id)) continue;
      
      // If topic has no prerequisites, or all prerequisites are completed, unlock it
      if (!topic.requiredTopics || topic.requiredTopics.every(requiredId => {
        const requiredTopic = topicsWithProgress.find(t => t.id === requiredId);
        return requiredTopic && requiredTopic.progress >= 80; // 80% completion required to unlock next topic
      })) {
        unlockedTopics.add(topic.id);
        changed = true;
      }
    }
  }
  
  // Get the selected topic object
  const activeTopic = selectedTopic 
    ? topicsWithProgress.find(topic => topic.id === selectedTopic) 
    : null;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Roadmap</span>
          {selectedTopic && (
            <>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{activeTopic?.title}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Roadmap</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Follow this structured path to master frontend development step by step
        </p>
      </div>
      
      {!selectedTopic ? (
        <div className="space-y-8">
          {/* Overall Progress Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Progress</h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Roadmap Completion</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {Math.round((completedLessons.length / topics.reduce((sum, topic) => sum + topic.lessons.length, 0)) * 100)}%
                </span>
              </div>
              <ProgressBar 
                progress={Math.round((completedLessons.length / topics.reduce((sum, topic) => sum + topic.lessons.length, 0)) * 100)} 
                color="bg-blue-500" 
                size="md"
                showPercentage={false}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {topicsWithProgress.slice(0, 4).map(topic => (
                <div key={topic.id} className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className={`${topic.color} p-2 rounded-md text-white mr-3`}>
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{topic.title}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{topic.completedCount}/{topic.totalLessons} lessons</span>
                      <span className="mx-2">•</span>
                      <span>{Math.round(topic.progress)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Topic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicsWithProgress.map(topic => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                isUnlocked={unlockedTopics.has(topic.id)} 
              />
            ))}
          </div>
        </div>
      ) : (
        activeTopic && (
          <div className="space-y-8">
            {/* Back to Roadmap button */}
            <div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/50 dark:hover:bg-blue-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="h-4 w-4 mr-2 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7" />
                </svg>
                Back to Roadmap
              </button>
            </div>
            
            {/* Topic Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-start">
                <div className={`${activeTopic.color} p-3 rounded-md text-white mr-4`}>
                  {/* Dynamically get icon from Lucide */}
                  {(() => {
                    const IconComponent = LucideIcons[activeTopic.icon as keyof typeof LucideIcons] || BookOpen;
                    return <IconComponent size={24} />;
                  })()}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activeTopic.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{activeTopic.description}</p>
                  
                  <div className="mb-4">
                    <ProgressBar 
                      progress={activeTopic.progress} 
                      color={activeTopic.color} 
                      label={`${activeTopic.completedCount}/${activeTopic.totalLessons} lessons completed`}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lessons List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Lessons</h3>
              </div>
              
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {activeTopic.lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={`/lesson/${activeTopic.id}/${lesson.id}`}
                        className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="px-6 py-4 flex justify-between items-center">
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full mr-4 ${
                              isCompleted 
                                ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            }`}>
                              {isCompleted ? (
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            
                            <div>
                              <h4 className="text-base font-medium text-gray-900 dark:text-white">{lesson.title}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lesson.description}</p>
                              
                              {isCompleted ? (
                                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  Completed
                                </span>
                              ) : (
                                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  {lesson.xpReward} XP Reward
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RoadmapPage;