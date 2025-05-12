import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, BookOpen, CheckCircle, Code, Award } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { topics } from '../data/curriculum';
import CodeEditor from '../components/CodeEditor';
import ProgressBar from '../components/ProgressBar';
import * as LucideIcons from 'lucide-react';

// Convert markdown to HTML (simple version)
const markdownToHtml = (markdown: string) => {
  if (!markdown) return '';
  
  // Convert headings
  let html = markdown.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
  
  // Convert code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded my-3 overflow-x-auto text-sm"><code>$1</code></pre>');
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">$1</code>');
  
  // Convert paragraphs
  html = html.replace(/^(?!<h[1-6]|<pre|<ul|<ol|<li|<blockquote)(.+$)/gm, '<p class="mb-3">$1</p>');
  
  // Convert lists
  html = html.replace(/^\* (.*$)/gm, '<ul class="list-disc pl-6 mb-3"><li>$1</li></ul>');
  html = html.replace(/^\d\. (.*$)/gm, '<ol class="list-decimal pl-6 mb-3"><li>$1</li></ol>');
  html = html.replace(/<\/ul>\s*<ul class="list-disc pl-6 mb-3">/g, '');
  html = html.replace(/<\/ol>\s*<ol class="list-decimal pl-6 mb-3">/g, '');
  
  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank">$1</a>');
  
  return html;
};

const LessonPage: React.FC = () => {
  const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
  const { completedLessons, markLessonComplete } = useProgress();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'content' | 'challenge'>('content');
  const [challengeCode, setChallengeCode] = useState('');
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  
  // Find the current topic and lesson
  const topic = topics.find(t => t.id === topicId);
  const lesson = topic?.lessons.find(l => l.id === lessonId);
  
  // Find lesson index and next/previous lessons
  const lessonIndex = topic ? topic.lessons.findIndex(l => l.id === lessonId) : -1;
  const previousLesson = lessonIndex > 0 ? topic?.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < (topic?.lessons.length || 0) - 1 ? topic?.lessons[lessonIndex + 1] : null;
  
  // Next topic
  const topicIndex = topics.findIndex(t => t.id === topicId);
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;
  
  // Update document title
  useEffect(() => {
    if (lesson && topic) {
      document.title = `${lesson.title} - ${topic.title} - CodeMentor`;
    }
  }, [lesson, topic]);
  
  // Initialize challenge code
  useEffect(() => {
    if (lesson?.challenge) {
      setChallengeCode(lesson.challenge.startingCode);
    }
  }, [lesson]);
  
  // Check if lesson is completed
  const isLessonCompleted = completedLessons.includes(lessonId || '');
  
  // Handle challenge submission
  const handleChallengeSubmit = () => {
    // Simple check: Does the user code include key parts of the solution?
    // In a real app, this would be more sophisticated with actual code evaluation
    if (lesson?.challenge) {
      const solution = lesson.challenge.solution;
      const requiredElements = [
        // Extract some key elements from the solution as required check
        ...solution.match(/<h1.*>.*<\/h1>/g) || [],
        ...solution.match(/<img.*>/g) || [],
        ...solution.match(/<ul.*>.*<\/ul>/g) || [],
      ];
      
      const hasRequiredElements = requiredElements.every(element => {
        // Simple check if the element or something similar is in the code
        const pattern = element.replace(/\s+/g, '\\s*').replace(/"/g, '["\']');
        const regex = new RegExp(pattern, 'i');
        return regex.test(challengeCode);
      });
      
      if (hasRequiredElements) {
        setChallengeCompleted(true);
        if (!isLessonCompleted) {
          markLessonComplete(lessonId || '');
        }
      } else {
        alert('Your solution is not quite right. Try again!');
      }
    }
  };
  
  // Handle completing the lesson
  const handleCompleteLesson = () => {
    if (!isLessonCompleted) {
      markLessonComplete(lessonId || '');
    }
    
    // Navigate to next lesson or back to roadmap
    if (nextLesson) {
      navigate(`/lesson/${topicId}/${nextLesson.id}`);
    } else if (nextTopic) {
      navigate(`/roadmap?topic=${nextTopic.id}`);
    } else {
      navigate('/roadmap');
    }
  };
  
  // If lesson or topic not found
  if (!lesson || !topic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lesson not found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">The lesson you're looking for doesn't exist.</p>
        <Link
          to="/roadmap"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Return to Roadmap
        </Link>
      </div>
    );
  }
  
  // Get icon component
  const IconComponent = LucideIcons[topic.icon as keyof typeof LucideIcons] || BookOpen;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link to="/roadmap" className="hover:text-gray-700 dark:hover:text-gray-300">Roadmap</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link to={`/roadmap?topic=${topic.id}`} className="hover:text-gray-700 dark:hover:text-gray-300">{topic.title}</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>{lesson.title}</span>
      </div>
      
      {/* Lesson Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start">
          <div className={`${topic.color} p-3 rounded-md text-white mr-4`}>
            <IconComponent size={24} />
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{lesson.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{lesson.description}</p>
            
            <div className="flex items-center mt-4">
              <span className="flex items-center text-blue-600 dark:text-blue-400 mr-4">
                <Award className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">{lesson.xpReward} XP</span>
              </span>
              
              {isLessonCompleted && (
                <span className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Completed</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      {lesson.challenge && (
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 focus:outline-none ${
              activeTab === 'content'
                ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('content')}
          >
            <BookOpen className="h-4 w-4 inline-block mr-2" />
            Lesson Content
          </button>
          
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 focus:outline-none ${
              activeTab === 'challenge'
                ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('challenge')}
          >
            <Code className="h-4 w-4 inline-block mr-2" />
            Practice Challenge
          </button>
        </div>
      )}
      
      {/* Lesson Content */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div 
              className="prose dark:prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(lesson.content) }}
            />
          </div>
          
          {/* Example Code */}
          {lesson.codeExample && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Code Example</h2>
              <CodeEditor 
                initialCode={lesson.codeExample} 
                language={
                  topic.id.includes('html') ? 'html' : 
                  topic.id.includes('css') ? 'css' : 'javascript'
                } 
              />
            </div>
          )}
          
          {/* Next/Previous Navigation */}
          <div className="flex justify-between items-center pt-4">
            <div>
              {previousLesson ? (
                <Link
                  to={`/lesson/${topicId}/${previousLesson.id}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Previous Lesson
                </Link>
              ) : (
                <Link
                  to={`/roadmap?topic=${topicId}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back to Topic
                </Link>
              )}
            </div>
            
            <button
              onClick={handleCompleteLesson}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLessonCompleted
                  ? nextLesson
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-white bg-green-600 hover:bg-green-700'
                  : 'text-white bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLessonCompleted ? (
                nextLesson ? (
                  <>
                    Next Lesson
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </>
                ) : (
                  <>
                    Complete Topic
                    <CheckCircle className="h-5 w-5 ml-1" />
                  </>
                )
              ) : (
                <>
                  Mark as Complete
                  <CheckCircle className="h-5 w-5 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Challenge Tab */}
      {activeTab === 'challenge' && lesson.challenge && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Challenge</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{lesson.challenge.description}</p>
            
            <div className="border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Complete the challenge by writing code that meets the requirements. You can run your code to see the results and submit when you're done.
              </p>
            </div>
            
            <CodeEditor 
              initialCode={challengeCode} 
              language={
                topic.id.includes('html') ? 'html' : 
                topic.id.includes('css') ? 'css' : 'javascript'
              }
              onCodeChange={setChallengeCode}
            />
            
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setChallengeCode(lesson.challenge!.startingCode)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Code
              </button>
              
              <button
                onClick={handleChallengeSubmit}
                disabled={challengeCompleted}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  challengeCompleted
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {challengeCompleted ? (
                  <>
                    Challenge Completed
                    <CheckCircle className="h-5 w-5 ml-1" />
                  </>
                ) : (
                  'Submit Solution'
                )}
              </button>
            </div>
          </div>
          
          {challengeCompleted && (
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Challenge completed!</h3>
                  <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                    <p>Great job! You've successfully completed this challenge. You can now move on to the next lesson.</p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      {nextLesson ? (
                        <Link
                          to={`/lesson/${topicId}/${nextLesson.id}`}
                          className="px-3 py-1.5 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Next Lesson
                        </Link>
                      ) : (
                        <Link
                          to={`/roadmap?topic=${topicId}`}
                          className="px-3 py-1.5 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Back to Topic
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonPage;