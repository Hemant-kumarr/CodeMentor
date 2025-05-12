import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Code, BarChart2, Calendar, ArrowRight, Trophy } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { topics, projects, badges as allBadges } from '../data/curriculum';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';

const DashboardPage: React.FC = () => {
  const { completedLessons, completedProjects, xpPoints, badges } = useProgress();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Update document title
  React.useEffect(() => {
    document.title = 'Dashboard - CodeMentor';
  }, []);
  
  // Calculate progress stats
  const totalLessons = topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const lessonProgress = Math.round((completedLessons.length / totalLessons) * 100);
  
  const totalProjects = projects.length;
  const projectProgress = Math.round((completedProjects.length / totalProjects) * 100);
  
  // Get recently completed lessons
  const recentLessons = topics
    .flatMap(topic => 
      topic.lessons
        .filter(lesson => completedLessons.includes(lesson.id))
        .map(lesson => ({
          ...lesson,
          topicId: topic.id,
          topicTitle: topic.title,
          topicColor: topic.color
        }))
    )
    .sort(() => Math.random() - 0.5) // This is just for demo purposes to randomize
    .slice(0, 3);
  
  // Get recently completed projects
  const recentProjects = projects
    .filter(project => completedProjects.includes(project.id))
    .sort(() => Math.random() - 0.5) // This is just for demo purposes to randomize
    .slice(0, 2);
  
  // Get earned badges
  const earnedBadges = allBadges.filter(badge => badges.includes(badge.id));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Track your learning progress and achievements
        </p>
      </div>
      
      {/* Dashboard Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'overview'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'progress'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('progress')}
        >
          Progress Tracking
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'achievements'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">XP Earned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{xpPoints}</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-start space-x-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lessons Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedLessons.length} <span className="text-sm font-normal text-gray-500">/ {totalLessons}</span>
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-start space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Projects Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedProjects.length} <span className="text-sm font-normal text-gray-500">/ {totalProjects}</span>
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-start space-x-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg">
                <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Badges Earned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {badges.length} <span className="text-sm font-normal text-gray-500">/ {allBadges.length}</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Progress Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Learning Progress</h2>
                <Link 
                  to="/roadmap" 
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                >
                  View Roadmap
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lessons Completed</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{lessonProgress}%</span>
                  </div>
                  <ProgressBar progress={lessonProgress} color="bg-blue-500" size="md" showPercentage={false} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Projects Completed</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{projectProgress}%</span>
                  </div>
                  <ProgressBar progress={projectProgress} color="bg-purple-500" size="md" showPercentage={false} />
                </div>
                
                {/* Topics Progress */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Topics Progress</h3>
                  <div className="space-y-3">
                    {topics.slice(0, 3).map(topic => {
                      const topicLessons = topic.lessons;
                      const completedTopicLessons = topicLessons.filter(lesson => 
                        completedLessons.includes(lesson.id)
                      );
                      const topicProgress = Math.round((completedTopicLessons.length / topicLessons.length) * 100);
                      
                      return (
                        <div key={topic.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{topic.title}</span>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {completedTopicLessons.length}/{topicLessons.length}
                            </span>
                          </div>
                          <ProgressBar progress={topicProgress} color={topic.color} size="sm" showPercentage={false} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activity Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  This Week
                </span>
              </div>
              
              <div className="space-y-6">
                {recentLessons.length > 0 ? (
                  <div>
                    <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">Completed Lessons</h3>
                    <div className="space-y-3">
                      {recentLessons.map(lesson => (
                        <div key={lesson.id} className="flex items-start">
                          <div className={`${lesson.topicColor} p-2 rounded-md text-white mr-3`}>
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{lesson.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">From: {lesson.topicTitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No lessons completed yet.</p>
                )}
                
                {recentProjects.length > 0 ? (
                  <div>
                    <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">Completed Projects</h3>
                    <div className="space-y-3">
                      {recentProjects.map(project => (
                        <div key={project.id} className="flex items-start">
                          <div className="bg-purple-500 p-2 rounded-md text-white mr-3">
                            <Code className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{project.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)} Project
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No projects completed yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'progress' && (
        <div className="space-y-8">
          {/* Overall Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Overall Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Roadmap Completion</span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {Math.round((lessonProgress + projectProgress) / 2)}%
                  </span>
                </div>
                <ProgressBar 
                  progress={Math.round((lessonProgress + projectProgress) / 2)} 
                  color="bg-blue-500" 
                  size="lg" 
                  showPercentage={false} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Lessons</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{completedLessons.length}/{totalLessons}</p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                  <Code className="h-8 w-8 mx-auto mb-2 text-purple-500 dark:text-purple-400" />
                  <p className="text-xs text-purple-700 dark:text-purple-300 font-medium mb-1">Projects</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{completedProjects.length}/{totalProjects}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Topic Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Topic Progress</h2>
            
            <div className="space-y-6">
              {topics.map(topic => {
                const topicLessons = topic.lessons;
                const completedTopicLessons = topicLessons.filter(lesson => 
                  completedLessons.includes(lesson.id)
                );
                const topicProgress = Math.round((completedTopicLessons.length / topicLessons.length) * 100);
                
                return (
                  <div key={topic.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className={`${topic.color} p-2 rounded-md text-white mr-3`}>
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{topic.title}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {completedTopicLessons.length}/{topicLessons.length} lessons
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{topicProgress}% complete</p>
                      </div>
                    </div>
                    
                    <ProgressBar progress={topicProgress} color={topic.color} size="md" showPercentage={false} />
                    
                    {/* Individual Lessons Progress */}
                    <div className="mt-3 pl-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {topic.lessons.map(lesson => {
                          const isCompleted = completedLessons.includes(lesson.id);
                          
                          return (
                            <div 
                              key={lesson.id} 
                              className={`text-xs rounded px-2 py-1 flex items-center
                                ${isCompleted 
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}
                            >
                              {isCompleted ? (
                                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                              )}
                              {lesson.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'achievements' && (
        <div className="space-y-8">
          {/* Badges Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Badges</h2>
              <div className="flex items-center text-amber-600 dark:text-amber-400">
                <Award className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">{badges.length}/{allBadges.length} Unlocked</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allBadges.map(badge => (
                <Badge 
                  key={badge.id} 
                  badge={badge}
                  earned={badges.includes(badge.id)}
                />
              ))}
            </div>
          </div>
          
          {/* XP Levels */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Experience Levels</h2>
            
            <div className="relative">
              {/* XP Progress Bar */}
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${Math.min((xpPoints / 1000) * 100, 100)}%` }}
                />
              </div>
              
              {/* Level Markers */}
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 relative -mt-3 mb-8">
                <div className="text-center">
                  <div className="h-4 w-1 bg-gray-300 dark:bg-gray-600 mx-auto mb-1"></div>
                  <span>0 XP</span>
                </div>
                <div className="text-center">
                  <div className="h-4 w-1 bg-gray-300 dark:bg-gray-600 mx-auto mb-1"></div>
                  <span>250 XP</span>
                </div>
                <div className="text-center">
                  <div className="h-4 w-1 bg-gray-300 dark:bg-gray-600 mx-auto mb-1"></div>
                  <span>500 XP</span>
                </div>
                <div className="text-center">
                  <div className="h-4 w-1 bg-gray-300 dark:bg-gray-600 mx-auto mb-1"></div>
                  <span>750 XP</span>
                </div>
                <div className="text-center">
                  <div className="h-4 w-1 bg-gray-300 dark:bg-gray-600 mx-auto mb-1"></div>
                  <span>1000 XP</span>
                </div>
              </div>
              
              {/* Current XP Indicator */}
              <div className="text-center mb-8">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  Current XP: {xpPoints}
                </span>
              </div>
              
              {/* Level Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { level: 'Beginner', xp: 0, icon: 'Seedling' },
                  { level: 'Apprentice', xp: 250, icon: 'Sprout' },
                  { level: 'Developer', xp: 500, icon: 'Laptop' },
                  { level: 'Pro', xp: 750, icon: 'Code2' },
                  { level: 'Master', xp: 1000, icon: 'Award' }
                ].map((level, index) => {
                  const isCurrentLevel = xpPoints >= level.xp && (index === 4 || xpPoints < [250, 500, 750, 1000, Infinity][index]);
                  const isAchieved = xpPoints >= level.xp;
                  
                  // Get the icon component
                  const LevelIcon = LucideIcons[level.icon as keyof typeof LucideIcons] || Trophy;
                  
                  return (
                    <div 
                      key={level.level}
                      className={`p-4 rounded-lg border ${
                        isCurrentLevel 
                          ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 dark:ring-blue-400 ring-opacity-50'
                          : isAchieved
                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`p-3 rounded-full mb-2 ${
                          isAchieved 
                            ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                        }`}>
                          <LevelIcon className="h-5 w-5" />
                        </div>
                        <h3 className={`font-medium ${
                          isCurrentLevel 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {level.level}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{level.xp} XP</p>
                        {isAchieved && (
                          <span className="mt-2 text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                            Unlocked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;