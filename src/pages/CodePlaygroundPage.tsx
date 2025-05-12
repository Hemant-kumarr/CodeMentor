import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Save, Trash2, Download, Upload, Code, Copy, Layout, PlayCircle } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';

interface PlaygroundState {
  html: string;
  css: string;
  js: string;
}

interface SavedPlayground {
  id: string;
  name: string;
  date: string;
  html: string;
  css: string;
  js: string;
}

const initialState: PlaygroundState = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Playground</title>
</head>
<body>
  <h1>Hello, CodeMentor!</h1>
  <p>Start editing to see your changes live.</p>
  <div class="container">
    <button id="clickMe">Click Me!</button>
  </div>
</body>
</html>`,
  css: `body {
  font-family: sans-serif;
  margin: 0;
  padding: 20px;
  line-height: 1.6;
}

h1 {
  color: #3b82f6;
}

.container {
  margin-top: 20px;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2563eb;
}`,
  js: `// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the button element
  const button = document.getElementById('clickMe');
  
  // Add a click event listener
  button.addEventListener('click', function() {
    alert('Button clicked!');
    
    // Change the button text
    this.textContent = 'Clicked!';
    
    // Add a class to the button
    this.classList.add('clicked');
  });
});`
};

const CodePlaygroundPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [playgroundState, setPlaygroundState] = useState<PlaygroundState>(initialState);
  const [output, setOutput] = useState<string>('');
  const [playgroundName, setPlaygroundName] = useState<string>('Untitled Playground');
  const [savedPlaygrounds, setSavedPlaygrounds] = useState<SavedPlayground[]>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState<boolean>(false);
  
  const outputIframeRef = useRef<HTMLIFrameElement>(null);
  
  // Update document title
  useEffect(() => {
    document.title = `${playgroundName} - CodeMentor Playground`;
  }, [playgroundName]);
  
  // Load saved playgrounds from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedPlaygrounds');
    if (saved) {
      setSavedPlaygrounds(JSON.parse(saved));
    }
  }, []);
  
  // Update output whenever code changes
  useEffect(() => {
    updateOutput();
  }, [playgroundState]);

  // Handle iframe message communication
  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      if (outputIframeRef.current && outputIframeRef.current.contentWindow === event.source) {
        const iframeDoc = outputIframeRef.current.contentDocument || outputIframeRef.current.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(event.data);
          iframeDoc.close();
        }
      }
    };

    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, []);
  
  // Handle code changes in editors
  const handleCodeChange = (code: string, language: 'html' | 'css' | 'js') => {
    setPlaygroundState(prevState => ({
      ...prevState,
      [language]: code
    }));
  };
  
  // Update the output iframe using postMessage
  const updateOutput = () => {
    const { html, css, js } = playgroundState;
    
    // Create a complete HTML document
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <title>${playgroundName}</title>
  <style>${css}</style>
</head>
<body>
${html.replace(/<!DOCTYPE html>|<html>|<\/html>|<head>.*<\/head>|<body>|<\/body>/g, '')}
<script>${js}</script>
</body>
</html>`;
    
    // Set output state
    setOutput(fullHtml);
    
    // Update iframe using postMessage
    if (outputIframeRef.current && outputIframeRef.current.contentWindow) {
      outputIframeRef.current.contentWindow.postMessage(fullHtml, '*');
    }
  };
  
  // Reset playground to initial state
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset? All unsaved changes will be lost.')) {
      setPlaygroundState(initialState);
      setPlaygroundName('Untitled Playground');
    }
  };
  
  // Save playground
  const handleSave = () => {
    const id = Date.now().toString();
    const newPlayground: SavedPlayground = {
      id,
      name: playgroundName,
      date: new Date().toLocaleString(),
      ...playgroundState
    };
    
    const updatedPlaygrounds = [...savedPlaygrounds, newPlayground];
    setSavedPlaygrounds(updatedPlaygrounds);
    localStorage.setItem('savedPlaygrounds', JSON.stringify(updatedPlaygrounds));
    setIsSaveModalOpen(false);
  };
  
  // Load playground
  const handleLoad = (playground: SavedPlayground) => {
    setPlaygroundState({
      html: playground.html,
      css: playground.css,
      js: playground.js
    });
    setPlaygroundName(playground.name);
    setIsLoadModalOpen(false);
  };
  
  // Delete saved playground
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this playground?')) {
      const updatedPlaygrounds = savedPlaygrounds.filter(playground => playground.id !== id);
      setSavedPlaygrounds(updatedPlaygrounds);
      localStorage.setItem('savedPlaygrounds', JSON.stringify(updatedPlaygrounds));
    }
  };
  
  // Export playground as HTML file
  const handleExport = () => {
    const { html, css, js } = playgroundState;
    
    // Create a complete HTML document
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <title>${playgroundName}</title>
  <style>
${css}
  </style>
</head>
<body>
${html.replace(/<!DOCTYPE html>|<html>|<\/html>|<head>.*<\/head>|<body>|<\/body>/g, '')}
  <script>
${js}
  </script>
</body>
</html>`;
    
    // Create a blob and download it
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${playgroundName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Code Playground</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div>
              <input
                type="text"
                value={playgroundName}
                onChange={e => setPlaygroundName(e.target.value)}
                className="border-0 p-0 text-lg font-bold text-gray-900 dark:text-white bg-transparent focus:ring-0 focus:outline-none"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsSaveModalOpen(true)}
                className="flex items-center px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/70 transition-colors"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </button>
              
              <button
                onClick={() => setIsLoadModalOpen(true)}
                className="flex items-center px-3 py-1 text-xs font-medium rounded bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900/70 transition-colors"
              >
                <Upload className="h-3 w-3 mr-1" />
                Load
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900/70 transition-colors"
              >
                <Download className="h-3 w-3 mr-1" />
                Export
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/70 transition-colors"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Section */}
        <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
          {/* Editor Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button
              className={`flex-1 py-3 text-sm font-medium focus:outline-none ${
                activeTab === 'html'
                  ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('html')}
            >
              <Code className="h-4 w-4 inline-block mr-1" />
              HTML
            </button>
            
            <button
              className={`flex-1 py-3 text-sm font-medium focus:outline-none ${
                activeTab === 'css'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('css')}
            >
              <Layout className="h-4 w-4 inline-block mr-1" />
              CSS
            </button>
            
            <button
              className={`flex-1 py-3 text-sm font-medium focus:outline-none ${
                activeTab === 'js'
                  ? 'text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-600 dark:border-yellow-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('js')}
            >
              <PlayCircle className="h-4 w-4 inline-block mr-1" />
              JavaScript
            </button>
          </div>
          
          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'html' && (
              <div className="h-full">
                <CodeEditor
                  initialCode={playgroundState.html}
                  language="html"
                  onCodeChange={(code) => handleCodeChange(code, 'html')}
                />
              </div>
            )}
            
            {activeTab === 'css' && (
              <div className="h-full">
                <CodeEditor
                  initialCode={playgroundState.css}
                  language="css"
                  onCodeChange={(code) => handleCodeChange(code, 'css')}
                />
              </div>
            )}
            
            {activeTab === 'js' && (
              <div className="h-full">
                <CodeEditor
                  initialCode={playgroundState.js}
                  language="javascript"
                  onCodeChange={(code) => handleCodeChange(code, 'js')}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="w-full md:w-1/2 flex flex-col border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white">Preview</h2>
            <button
              onClick={updateOutput}
              className="flex items-center px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <PlayCircle className="h-3 w-3 mr-1" />
              Run
            </button>
          </div>
          
          <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden">
            <iframe 
              ref={outputIframeRef}
              title="Preview"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
      
      {/* Save Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Save Playground</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="playgroundName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Playground Name
                </label>
                <input
                  type="text"
                  id="playgroundName"
                  value={playgroundName}
                  onChange={e => setPlaygroundName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsSaveModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Load Modal */}
      {isLoadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Load Playground</h3>
            </div>
            
            <div className="p-6">
              {savedPlaygrounds.length > 0 ? (
                <div className="max-h-60 overflow-y-auto">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {savedPlaygrounds.map(playground => (
                      <li 
                        key={playground.id}
                        className="py-3 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() => handleLoad(playground)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{playground.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{playground.date}</p>
                          </div>
                          <button
                            onClick={(e) => handleDelete(playground.id, e)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500 dark:text-gray-400">No saved playgrounds.</p>
              )}
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsLoadModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePlaygroundPage;