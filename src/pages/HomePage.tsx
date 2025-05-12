import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Code, Map, Zap, CheckCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const HomePage: React.FC = () => {
  const { xpPoints, completedLessons, completedProjects } = useProgress();
  
  // Update document title
  React.useEffect(() => {
    document.title = 'CodeMentor - Learn Frontend Development';
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Personal Mentor for Frontend Development
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Master frontend development with interactive lessons, practical projects, and personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link
                  to="/roadmap"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-colors"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm transform rotate-3"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform -rotate-2 transition-transform hover:rotate-0 duration-300">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-blue-100 dark:bg-blue-900/50 rounded"></div>
                  <div className="h-4 w-1/2 bg-blue-100 dark:bg-blue-900/50 rounded"></div>
                  <div className="flex items-center space-x-3 mt-6">
                    <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center text-white">
                      <Code size={18} />
                    </div>
                    <div className="h-3 w-1/2 bg-blue-100 dark:bg-blue-900/50 rounded"></div>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded p-3 mt-2">
                    <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
                    <div className="flex justify-between mt-2">
                      <div className="h-3 w-1/3 bg-green-100 dark:bg-green-900/30 rounded"></div>
                      <div className="h-3 w-1/4 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>
      
      {/* Stats Section */}
      <section className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 flex items-center shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full mr-4">
                <Award className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">Experience Points</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{xpPoints} XP</p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 flex items-center shadow-sm">
              <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full mr-4">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-green-600 dark:text-green-300 font-medium">Lessons Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedLessons.length}</p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 flex items-center shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full mr-4">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-300 font-medium">Projects Built</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedProjects.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Learn With CodeMentor?</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We've designed a learning experience that feels like having a personal mentor by your side.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-md inline-block mb-4">
                <Map className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Structured Roadmap</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Follow a clear learning path from HTML basics to advanced JavaScript and beyond.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-md inline-block mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Interactive Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice what you learn with interactive code playgrounds and instant feedback.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-md inline-block mb-4">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-World Projects</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build portfolio-worthy projects that demonstrate your skills to potential employers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-md inline-block mb-4">
                <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Achievement System</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Earn badges and XP as you progress, keeping you motivated throughout your journey.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-md inline-block mb-4">
                <CheckCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Practical Challenges</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Test your knowledge with coding challenges that reinforce your learning.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-md inline-block mb-4">
                <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Comprehensive Resources</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access curated resources, cheat sheets, and references to support your learning.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your coding journey?</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Begin learning today and build the skills you need for a successful career in web development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/roadmap"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-colors"
            >
              View Learning Roadmap
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;