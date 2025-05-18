import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  language: 'html' | 'css' | 'javascript';
  onCodeChange?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode, 
  language, 
  onCodeChange 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState(`index.${language}`);
  
  useEffect(() => {
    if (initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode]);
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  // Code suggestions based on language
  const getCodeSuggestion = () => {
    switch (language) {
      case 'html':
        return `<!-- Try this HTML structure -->
<div class="container">
  <h1>Welcome</h1>
  <p>This is a paragraph</p>
  <button onclick="alert('Hello!')">Click me</button>
</div>`;
      case 'css':
        return `/* Try these CSS styles */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}`;
      case 'javascript':
        return `// Try this JavaScript code
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Add event listener
document.querySelector('button').addEventListener('click', () => {
  alert(greet('World'));
});`;
      default:
        return '';
    }
  };
  
  const runCode = () => {
    if (language === 'html') {
      setOutput(code);
    } else if (language === 'javascript') {
      try {
        const sandbox = document.createElement('iframe');
        sandbox.style.display = 'none';
        document.body.appendChild(sandbox);
        
        const sandboxContent = `
        <html>
          <head>
            <style>
              body { 
                font-family: sans-serif;
                margin: 0;
                padding: 16px;
                background: white;
                color: black;
              }
              .output { 
                white-space: pre-wrap;
                font-family: monospace;
                background: white;
                padding: 12px;
                border-radius: 6px;
                border: 1px solid #e5e7eb;
              }
              * { box-sizing: border-box; }
            </style>
          </head>
          <body>
            <div id="output" class="output"></div>
            <script>
              const originalLog = console.log;
              const outputs = [];
              console.log = function(...args) {
                originalLog.apply(console, args);
                outputs.push(args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
                ).join(' '));
                document.getElementById('output').textContent = outputs.join('\\n');
              };
              
              try {
                ${code};
              } catch (error) {
                console.log('Error:', error.message);
              }
            </script>
          </body>
        </html>
      `;
        
        sandbox.srcdoc = sandboxContent;
        
        setTimeout(() => {
          try {
            if (sandbox.contentDocument) {
              const outputEl = sandbox.contentDocument.getElementById('output');
              setOutput(outputEl?.textContent || 'No output');
            }
          } catch (error) {
            setOutput(`Error executing code: ${error}`);
          }
          document.body.removeChild(sandbox);
        }, 500);
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
    } else if (language === 'css') {
      const htmlWithCSS = `
      <html>
        <head>
          <style>
            body {
              font-family: sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
              color: black;
            }
            ${code}
          </style>
        </head>
        <body>
          <div class="box">CSS Box</div>
          <p>Paragraph with <a href="#">link</a></p>
          <button>Button</button>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </body>
      </html>
    `;
      setOutput(htmlWithCSS);
    }
  };
  
  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    if (onCodeChange) {
      onCodeChange(initialCode);
    }
  };

  const insertSuggestion = () => {
    setCode(getCodeSuggestion());
    if (onCodeChange) {
      onCodeChange(getCodeSuggestion());
    }
  };
  
  // Determine which language-specific styling to use
  const getLanguageClass = () => {
    switch (language) {
      case 'html':
        return 'border-orange-500';
      case 'css':
        return 'border-blue-500';
      case 'javascript':
        return 'border-yellow-500';
      default:
        return 'border-gray-500';
    }
  };
  
  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className={`flex justify-between items-center px-4 py-2 border-b ${getLanguageClass()} bg-gray-50 dark:bg-gray-700`}>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-0 w-32"
          />
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={insertSuggestion}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs"
            title="Insert code suggestion"
          >
            Try Example
          </button>
          <button 
            onClick={resetCode}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Reset code"
          >
            <RotateCcw size={16} />
          </button>
          <button 
            onClick={runCode}
            className="flex items-center space-x-1 px-2 py-1 rounded text-white bg-green-500 hover:bg-green-600 transition-colors text-xs"
          >
            <Play size={14} />
            <span>Run</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">
        <div className="h-64 lg:h-80">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
            spellCheck="false"
          />
        </div>
        
        <div className="h-64 lg:h-80 bg-white dark:bg-gray-900 overflow-auto">
          {language === 'html' || language === 'css' ? (
            <iframe
              srcDoc={output}
              title="output"
              className="w-full h-full border-none bg-white"
              sandbox="allow-scripts"
            />
          ) : (
            <pre className="p-4 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">{output}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;