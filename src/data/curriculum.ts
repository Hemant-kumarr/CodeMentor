import { BookOpen, Code2, Layout, FileCode, PenTool, Database, Globe, Layers, GitBranch, Terminal, Server, Shield, Smartphone, Cpu } from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample?: string;
  challenge?: {
    description: string;
    startingCode: string;
    solution: string;
  };
  xpReward: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  requiredTopics?: string[];
}

export const topics: Topic[] = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    description: 'Learn the building blocks of the web',
    icon: 'code',
    color: 'bg-orange-500',
    lessons: [
      {
        id: 'html-intro',
        title: 'Introduction to HTML',
        description: 'Understanding the structure of web pages',
        content: `
# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements that tell the browser how to display the content.

## Basic Structure

An HTML document has a required structure that includes the following declarations:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</body>
</html>
\`\`\`

## Key Elements

- \`<!DOCTYPE html>\`: Declares the document type
- \`<html>\`: The root element
- \`<head>\`: Contains meta information
- \`<title>\`: Specifies a title for the document
- \`<body>\`: Contains the visible page content
        `,
        codeExample: `
<!DOCTYPE html>
<html>
<head>
  <title>My First Web Page</title>
</head>
<body>
  <h1>Welcome to Web Development</h1>
  <p>This is a paragraph of text.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</body>
</html>
        `,
        challenge: {
          description: 'Create a simple HTML page with a heading, paragraph, and list',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <!-- Add your content here -->
  
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>My First Web Page</h1>
  <p>This is my first HTML page.</p>
  <ul>
    <li>HTML is fun</li>
    <li>CSS is next</li>
    <li>Then JavaScript</li>
  </ul>
</body>
</html>
          `
        },
        xpReward: 10
      },
      {
        id: 'html-elements',
        title: 'HTML Elements',
        description: 'Learn about different HTML elements and their purposes',
        content: `
# HTML Elements

HTML elements are the building blocks of HTML pages. Elements are represented by tags, written using angle brackets.

## Common Elements

### Headings
HTML has six levels of headings, from \`<h1>\` (most important) to \`<h6>\` (least important).

\`\`\`html
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
\`\`\`

### Paragraphs
The \`<p>\` element defines a paragraph.

\`\`\`html
<p>This is a paragraph.</p>
\`\`\`

### Links
The \`<a>\` element defines a hyperlink.

\`\`\`html
<a href="https://www.example.com">This is a link</a>
\`\`\`

### Images
The \`<img>\` element is used to embed images.

\`\`\`html
<img src="image.jpg" alt="Description of image">
\`\`\`

### Lists
HTML supports ordered lists (\`<ol>\`) and unordered lists (\`<ul>\`).

\`\`\`html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
\`\`\`
        `,
        codeExample: `
<!DOCTYPE html>
<html>
<head>
  <title>HTML Elements Example</title>
</head>
<body>
  <h1>Main Heading</h1>
  <h2>Subheading</h2>
  
  <p>This is a paragraph with a <a href="https://example.com">link</a>.</p>
  
  <img src="https://via.placeholder.com/150" alt="Placeholder image">
  
  <h3>My Favorite Foods</h3>
  <ul>
    <li>Pizza</li>
    <li>Tacos</li>
    <li>Ice Cream</li>
  </ul>
  
  <h3>Top 3 Movies</h3>
  <ol>
    <li>The Shawshank Redemption</li>
    <li>The Godfather</li>
    <li>The Dark Knight</li>
  </ol>
</body>
</html>
        `,
        challenge: {
          description: 'Create an HTML page about your favorite hobby with headings, paragraphs, links, and images',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>My Hobby</title>
</head>
<body>
  <!-- Create a page about your hobby here -->
  
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>My Hobby</title>
</head>
<body>
  <h1>Photography</h1>
  <p>Photography is my favorite hobby. I love capturing moments and landscapes.</p>
  
  <h2>My Equipment</h2>
  <ul>
    <li>Camera: Canon EOS R</li>
    <li>Lenses: 24-70mm f/2.8, 50mm f/1.8</li>
    <li>Tripod</li>
  </ul>
  
  <h2>Favorite Subjects</h2>
  <ol>
    <li>Landscapes</li>
    <li>Street photography</li>
    <li>Portraits</li>
  </ol>
  
  <p>Learn more about photography at <a href="https://www.nationalgeographic.com/photography/">National Geographic</a>.</p>
  
  <img src="https://via.placeholder.com/300x200" alt="Photography example">
</body>
</html>
          `
        },
        xpReward: 15
      },
      {
        id: 'html-forms',
        title: 'HTML Forms & Validation',
        description: 'Create interactive forms with built-in validation',
        content: `
# HTML Forms & Validation

Forms are essential for collecting user input on web pages. HTML5 provides built-in validation features to ensure data quality.

## Form Elements

\`\`\`html
<form action="/submit" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required minlength="3">
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required minlength="8">
  
  <button type="submit">Submit</button>
</form>
\`\`\`

## Input Types

- text: Basic text input
- email: Email validation
- password: Password field
- number: Numeric input
- tel: Phone numbers
- date: Date picker
- color: Color picker
- file: File upload
- checkbox: Multiple selections
- radio: Single selection
`,
        challenge: {
          description: 'Create a registration form with proper validation',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>Registration Form</title>
</head>
<body>
  <!-- Create your form here -->
  
</body>
</html>
`,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>Registration Form</title>
  <style>
    form { max-width: 400px; margin: 20px auto; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input { width: 100%; padding: 8px; }
    button { padding: 10px 20px; background: #4CAF50; color: white; border: none; }
  </style>
</head>
<body>
  <form id="registrationForm" onsubmit="return validateForm()">
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required minlength="3">
    </div>
    
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required minlength="8">
    </div>
    
    <div class="form-group">
      <label for="confirm-password">Confirm Password:</label>
      <input type="password" id="confirm-password" name="confirm-password" required>
    </div>
    
    <button type="submit">Register</button>
  </form>

  <script>
    function validateForm() {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
      }
      return true;
    }
  </script>
</body>
</html>
`
        },
        xpReward: 20
      }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS Basics',
    description: 'Style your web pages with CSS',
    icon: 'palette',
    color: 'bg-blue-500',
    requiredTopics: ['html-basics'],
    lessons: [
      {
        id: 'css-intro',
        title: 'Introduction to CSS',
        description: 'Learn how to style HTML elements',
        content: `
# Introduction to CSS

CSS (Cascading Style Sheets) is used to style and layout web pages — for example, to alter the font, color, size, and spacing of your content, split it into multiple columns, or add animations and other decorative features.

## Adding CSS to HTML

There are three ways to add CSS to HTML:

1. **Inline CSS** - using the \`style\` attribute in HTML elements
2. **Internal CSS** - using the \`<style>\` element in the \`<head>\` section
3. **External CSS** - using an external CSS file

### Inline CSS

\`\`\`html
<h1 style="color: blue; text-align: center;">This is a heading</h1>
\`\`\`

### Internal CSS

\`\`\`html
<head>
  <style>
    body {
      background-color: lightblue;
    }
    h1 {
      color: navy;
      margin-left: 20px;
    }
  </style>
</head>
\`\`\`

### External CSS (most common)

\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\`

## CSS Syntax

CSS consists of a selector and a declaration block:

\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

For example:

\`\`\`css
h1 {
  color: blue;
  font-size: 24px;
}
\`\`\`
        `,
        codeExample: `
<!DOCTYPE html>
<html>
<head>
  <title>CSS Introduction</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f0f0f0;
    }
    
    h1 {
      color: #0066cc;
      text-align: center;
    }
    
    p {
      color: #333;
      line-height: 1.6;
    }
    
    .highlight {
      background-color: yellow;
      padding: 5px;
    }
    
    #special {
      border: 2px solid #0066cc;
      padding: 10px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>Welcome to CSS</h1>
  <p>This is a paragraph with default styling.</p>
  <p>This paragraph has a <span class="highlight">highlighted</span> word.</p>
  <div id="special">
    <p>This is inside a special div with a border.</p>
  </div>
</body>
</html>
        `,
        challenge: {
          description: 'Style an HTML page with different CSS properties',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>My Styled Page</title>
  <style>
    /* Add your CSS here */
    
  </style>
</head>
<body>
  <h1>My Website</h1>
  <p>Welcome to my website about web development.</p>
  <ul class="topics">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>
  <div id="footer">
    <p>Created by me - 2025</p>
  </div>
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>My Styled Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    
    h1 {
      color: #2c3e50;
      text-align: center;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
    }
    
    p {
      color: #333;
    }
    
    .topics {
      background-color: #ecf0f1;
      padding: 15px;
      border-radius: 5px;
    }
    
    .topics li {
      color: #2980b9;
      margin-bottom: 5px;
    }
    
    #footer {
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #7f8c8d;
      border-top: 1px solid #bdc3c7;
      padding-top: 10px;
    }
  </style>
</head>
<body>
  <h1>My Website</h1>
  <p>Welcome to my website about web development.</p>
  <ul class="topics">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>
  <div id="footer">
    <p>Created by me - 2025</p>
  </div>
</body>
</html>
          `
        },
        xpReward: 15
      }
    ]
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Add interactivity to your web pages',
    icon: 'code2',
    color: 'bg-yellow-500',
    requiredTopics: ['html-basics', 'css-basics'],
    lessons: [
      {
        id: 'js-intro',
        title: 'Introduction to JavaScript',
        description: 'Learn the basics of JavaScript programming',
        content: `
# Introduction to JavaScript

JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications, and it's supported by all modern browsers without plugins.

## Adding JavaScript to HTML

There are three ways to add JavaScript to HTML:

1. **Inline JavaScript** - using the \`onclick\` attribute (and similar) in HTML elements
2. **Internal JavaScript** - using the \`<script>\` element in the HTML document
3. **External JavaScript** - using an external JavaScript file

### Inline JavaScript

\`\`\`html
<button onclick="alert('Hello, World!')">Click Me</button>
\`\`\`

### Internal JavaScript

\`\`\`html
<head>
  <script>
    function sayHello() {
      alert('Hello, World!');
    }
  </script>
</head>
<body>
  <button onclick="sayHello()">Click Me</button>
</body>
\`\`\`

### External JavaScript (most common)

\`\`\`html
<head>
  <script src="script.js"></script>
</head>
\`\`\`

## JavaScript Basics

### Variables and Data Types

\`\`\`javascript
// Variable declarations
let message = 'Hello'; // String
let number = 42; // Number
let isTrue = true; // Boolean
let nothing = null; // Null
let undefined; // Undefined
let person = { name: 'John', age: 30 }; // Object
let numbers = [1, 2, 3, 4, 5]; // Array
\`\`\`

### Functions

\`\`\`javascript
// Function declaration
function greet(name) {
  return 'Hello, ' + name + '!';
}

// Function expression
const sayGoodbye = function(name) {
  return 'Goodbye, ' + name + '!';
};

// Arrow function (ES6)
const add = (a, b) => a + b;
\`\`\`

### Conditionals

\`\`\`javascript
let age = 20;

if (age >= 18) {
  console.log('You are an adult');
} else {
  console.log('You are a minor');
}

// Ternary operator
let message = age >= 18 ? 'You are an adult' : 'You are a minor';
\`\`\`

### Loops

\`\`\`javascript
// For loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// For...of loop (arrays)
const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
  console.log(fruit);
}

// For...in loop (objects)
const person = { name: 'John', age: 30, job: 'developer' };
for (const key in person) {
  console.log(key + ': ' + person[key]);
}
\`\`\`
        `,
        codeExample: `
<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Introduction</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    
    button {
      padding: 10px 15px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 5px;
    }
    
    #output {
      margin-top: 20px;
      padding: 15px;
      background-color: #f1f1f1;
      border-radius: 4px;
      min-height: 20px;
    }
  </style>
</head>
<body>
  <h1>JavaScript Demo</h1>
  
  <button onclick="showMessage()">Show Message</button>
  <button onclick="changeColor()">Change Color</button>
  <button onclick="countToTen()">Count to 10</button>
  
  <div id="output"></div>
  
  <script>
    function showMessage() {
      document.getElementById('output').textContent = 'Hello, JavaScript!';
    }
    
    function changeColor() {
      const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#ee5253'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.getElementById('output').style.backgroundColor = randomColor;
    }
    
    function countToTen() {
      let result = '';
      for (let i = 1; i <= 10; i++) {
        result += i + ' ';
      }
      document.getElementById('output').textContent = result;
    }
  </script>
</body>
</html>
        `,
        challenge: {
          description: 'Create a simple calculator that can add, subtract, multiply, and divide two numbers',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>Simple Calculator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    
    input, button {
      padding: 8px;
      margin: 5px;
    }
    
    #result {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Simple Calculator</h1>
  
  <div>
    <input type="number" id="num1" placeholder="Enter first number">
    <input type="number" id="num2" placeholder="Enter second number">
  </div>
  
  <div>
    <button onclick="calculate('add')">Add</button>
    <button onclick="calculate('subtract')">Subtract</button>
    <button onclick="calculate('multiply')">Multiply</button>
    <button onclick="calculate('divide')">Divide</button>
  </div>
  
  <div id="result">Result will appear here</div>
  
  <script>
    function calculate(operation) {
      // Write your code here
      
    }
  </script>
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>Simple Calculator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    
    input, button {
      padding: 8px;
      margin: 5px;
    }
    
    #result {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Simple Calculator</h1>
  
  <div>
    <input type="number" id="num1" placeholder="Enter first number">
    <input type="number" id="num2" placeholder="Enter second number">
  </div>
  
  <div>
    <button onclick="calculate('add')">Add</button>
    <button onclick="calculate('subtract')">Subtract</button>
    <button onclick="calculate('multiply')">Multiply</button>
    <button onclick="calculate('divide')">Divide</button>
  </div>
  
  <div id="result">Result will appear here</div>
  
  <script>
    function calculate(operation) {
      // Get the input values
      const num1 = parseFloat(document.getElementById('num1').value);
      const num2 = parseFloat(document.getElementById('num2').value);
      let result;
      
      // Check if the inputs are valid numbers
      if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = 'Please enter valid numbers';
        return;
      }
      
      // Perform the calculation based on the operation
      switch(operation) {
        case 'add':
          result = num1 + num2;
          break;
        case 'subtract':
          result = num1 - num2;
          break;
        case 'multiply':
          result = num1 * num2;
          break;
        case 'divide':
          if (num2 === 0) {
            document.getElementById('result').textContent = 'Cannot divide by zero';
            return;
          }
          result = num1 / num2;
          break;
      }
      
      // Display the result
      document.getElementById('result').textContent = result;
    }
  </script>
</body>
</html>
          `
        },
        xpReward: 20
      }
    ]
  },
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    description: 'Learn to dynamically modify web pages',
    icon: 'layout',
    color: 'bg-purple-500',
    requiredTopics: ['javascript-basics'],
    lessons: [
      {
        id: 'dom-intro',
        title: 'Introduction to the DOM',
        description: 'Learn how to manipulate web page elements with JavaScript',
        content: `
# Introduction to the DOM

The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.

## What is the DOM?

The DOM is a tree-like representation of the web page that gets loaded into the browser. It represents the page so that programs can change the document structure, style, and content.

## Accessing DOM Elements

JavaScript provides several methods to access DOM elements:

\`\`\`javascript
// By ID
const element = document.getElementById('myId');

// By class name
const elements = document.getElementsByClassName('myClass');

// By tag name
const paragraphs = document.getElementsByTagName('p');

// Using CSS selectors (modern approach)
const element = document.querySelector('#myId'); // Select the first matching element
const elements = document.querySelectorAll('.myClass'); // Select all matching elements
\`\`\`

## Modifying DOM Elements

Once you have selected a DOM element, you can modify its properties:

\`\`\`javascript
// Changing text content
element.textContent = 'New text';

// Changing HTML content
element.innerHTML = '<strong>New HTML</strong>';

// Changing attributes
element.setAttribute('src', 'newimage.jpg');
element.id = 'newId';

// Changing styles
element.style.color = 'red';
element.style.backgroundColor = 'yellow';

// Adding classes
element.classList.add('newClass');
element.classList.remove('oldClass');
element.classList.toggle('someClass');
\`\`\`

## Creating and Adding Elements

\`\`\`javascript
// Create a new element
const newElement = document.createElement('div');

// Add content to it
newElement.textContent = 'This is a new element';

// Add it to the document
document.body.appendChild(newElement);

// Insert before another element
const referenceElement = document.getElementById('someId');
document.body.insertBefore(newElement, referenceElement);
\`\`\`

## Removing Elements

\`\`\`javascript
// Remove an element
element.remove();

// Remove a child element
const parent = document.getElementById('parent');
const child = document.getElementById('child');
parent.removeChild(child);
\`\`\`

## Event Handling

\`\`\`javascript
// Add event listener
element.addEventListener('click', function(event) {
  console.log('Element clicked!');
});

// Remove event listener
function handleClick(event) {
  console.log('Element clicked!');
}
element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);
\`\`\`
        `,
        challenge: {
          description: 'Create a function that fetches user data and handles errors appropriately',
          startingCode: `
async function fetchUserData(userId) {
  // Implement the function
}

// Test the function
fetchUserData(1);
`,
          solution: `
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }
    
    const userData = await response.json();
    console.log('User data:', userData);
    return userData;
    
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Test the function
fetchUserData(1)
  .then(user => console.log('Success:', user))
  .catch(error => console.error('Failed:', error));
`
        },
        xpReward: 30
      }
    ]
  },
  {
    id: 'advanced-javascript',
    title: 'Advanced JavaScript',
    description: 'Master advanced JavaScript concepts and patterns',
    icon: 'FileCode',
    color: 'bg-yellow-600',
    requiredTopics: ['javascript-basics'],
    lessons: [
      {
        id: 'async-programming',
        title: 'Asynchronous Programming',
        description: 'Learn about Promises, async/await, and handling asynchronous operations',
        content: `
# Asynchronous Programming in JavaScript

Understanding how to handle asynchronous operations is crucial for modern web development.

## Promises

\`\`\`javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'John' };
      resolve(data);
    }, 2000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

## Async/Await

\`\`\`javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`
`,
        challenge: {
          description: 'Create a function that fetches user data and handles errors appropriately',
          startingCode: `
async function fetchUserData(userId) {
  // Implement the function
}

// Test the function
fetchUserData(1);
`,
          solution: `
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }
    
    const userData = await response.json();
    console.log('User data:', userData);
    return userData;
    
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Test the function
fetchUserData(1)
  .then(user => console.log('Success:', user))
  .catch(error => console.error('Failed:', error));
`
        },
        xpReward: 30
      }
    ]
  }
];

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  requirements: string[];
  thumbnail: string;
  xpReward: number;
}

export const projects: Project[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    description: 'Create a professional portfolio website to showcase your skills and projects.',
    difficulty: 'beginner',
    topics: ['html-basics', 'css-basics'],
    requirements: [
      'Create a responsive layout',
      'Include an about section, skills section, and projects section',
      'Add contact information',
      'Style with CSS to make it visually appealing'
    ],
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    xpReward: 50
  },
  {
    id: 'quiz-app',
    title: 'Interactive Quiz App',
    description: 'Build a quiz application with multiple-choice questions and score tracking.',
    difficulty: 'intermediate',
    topics: ['html-basics', 'css-basics', 'javascript-basics'],
    requirements: [
      'Create a collection of questions with multiple-choice answers',
      'Track and display the user\'s score',
      'Show correct/incorrect feedback',
      'Add a timer for each question (optional)',
      'Style with CSS for a good user experience'
    ],
    thumbnail: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    xpReward: 75
  },
  {
    id: 'todo-app',
    title: 'To-Do List Application',
    description: 'Create a fully functional to-do list app with persistent storage.',
    difficulty: 'intermediate',
    topics: ['html-basics', 'css-basics', 'javascript-basics', 'dom-manipulation'],
    requirements: [
      'Allow users to add, edit, and delete tasks',
      'Implement task completion toggling',
      'Save tasks to localStorage for persistence',
      'Add filtering options (all, active, completed)',
      'Create a clean, user-friendly interface'
    ],
    thumbnail: 'https://images.pexels.com/photos/6382633/pexels-photo-6382633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    xpReward: 100
  },
  {
    id: 'weather-app',
    title: 'Weather Dashboard',
    description: 'Build a weather application that fetches and displays current weather data.',
    difficulty: 'advanced',
    topics: ['html-basics', 'css-basics', 'javascript-basics', 'dom-manipulation'],
    requirements: [
      'Connect to a weather API (like OpenWeatherMap)',
      'Allow users to search for weather by city or location',
      'Display current weather conditions (temperature, humidity, etc.)',
      'Show a 5-day forecast',
      'Create a visually appealing dashboard with weather icons',
      'Implement error handling for API requests'
    ],
    thumbnail: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    xpReward: 150
  },
  {
    id: 'chat-app',
    title: 'Real-time Chat Application',
    description: 'Build a real-time chat application with multiple rooms and user presence',
    difficulty: 'advanced',
    topics: ['html-basics', 'css-basics', 'javascript-basics', 'advanced-javascript'],
    requirements: [
      'Implement user authentication',
      'Create multiple chat rooms',
      'Show online/offline status',
      'Enable private messaging',
      'Add emoji support',
      'Implement message history'
    ],
    thumbnail: 'https://images.pexels.com/photos/1310532/pexels-photo-1310532.jpeg',
    xpReward: 200
  },
  {
    id: 'kanban-board',
    title: 'Kanban Task Board',
    description: 'Create a drag-and-drop Kanban board for task management',
    difficulty: 'intermediate',
    topics: ['html-basics', 'css-basics', 'javascript-basics'],
    requirements: [
      'Implement drag and drop functionality',
      'Create multiple columns (To Do, In Progress, Done)',
      'Add new tasks with title and description',
      'Enable task editing and deletion',
      'Save tasks to localStorage',
      'Add due dates and priority levels'
    ],
    thumbnail: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg',
    xpReward: 150
  },
  {
    id: 'music-player',
    title: 'Web Music Player',
    description: 'Build a feature-rich music player with playlist support',
    difficulty: 'intermediate',
    topics: ['html-basics', 'css-basics', 'javascript-basics'],
    requirements: [
      'Play/pause, next/previous controls',
      'Progress bar with seek functionality',
      'Volume control',
      'Playlist management',
      'Shuffle and repeat modes',
      'Display song metadata and album art'
    ],
    thumbnail: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg',
    xpReward: 150
  }
];

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'cheatsheet' | 'reference' | 'tool' | 'article';
  link: string;
  icon: string;
}

export const resources: Resource[] = [
  {
    id: 'html-cheatsheet',
    title: 'HTML Cheat Sheet',
    description: 'Quick reference for HTML elements and their attributes.',
    type: 'cheatsheet',
    link: 'https://htmlcheatsheet.com/',
    icon: 'file-text'
  },
  {
    id: 'css-cheatsheet',
    title: 'CSS Cheat Sheet',
    description: 'Comprehensive reference for CSS properties and selectors.',
    type: 'cheatsheet',
    link: 'https://htmlcheatsheet.com/css/',
    icon: 'file-text'
  },
  {
    id: 'js-cheatsheet',
    title: 'JavaScript Cheat Sheet',
    description: 'Essential JavaScript concepts, methods, and syntax.',
    type: 'cheatsheet',
    link: 'https://htmlcheatsheet.com/js/',
    icon: 'file-text'
  },
  {
    id: 'mdn-web-docs',
    title: 'MDN Web Docs',
    description: 'The complete developer resource for web technologies.',
    type: 'reference',
    link: 'https://developer.mozilla.org/',
    icon: 'book-open'
  },
  {
    id: 'codepen',
    title: 'CodePen',
    description: 'Online code editor for frontend development and experimentation.',
    type: 'tool',
    link: 'https://codepen.io/',
    icon: 'edit-3'
  },
  {
    id: 'figma',
    title: 'Figma',
    description: 'Design, prototype, and collaborate all in the browser.',
    type: 'tool',
    link: 'https://www.figma.com/',
    icon: 'pen-tool'
  },
  {
    id: 'git-guide',
    title: 'Git - Simple Guide',
    description: 'A straightforward guide to get started with Git version control.',
    type: 'article',
    link: 'https://rogerdudler.github.io/git-guide/',
    icon: 'git-branch'
  },
  {
    id: 'css-tricks',
    title: 'CSS-Tricks',
    description: 'Articles, tutorials, and guides for CSS and frontend development.',
    type: 'article',
    link: 'https://css-tricks.com/',
    icon: 'layout'
  }
];

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const badges: Badge[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Completed your first lesson',
    icon: 'award',
    color: 'bg-blue-500'
  },
  {
    id: 'ten-lessons',
    title: 'Knowledge Seeker',
    description: 'Completed 10 lessons',
    icon: 'book',
    color: 'bg-green-500'
  },
  {
    id: 'first-project',
    title: 'Project Pioneer',
    description: 'Completed your first project',
    icon: 'code',
    color: 'bg-purple-500'
  },
  {
    id: 'five-projects',
    title: 'Master Builder',
    description: 'Completed 5 projects',
    icon: 'briefcase',
    color: 'bg-amber-500'
  },
  {
    id: 'html-master',
    title: 'HTML Master',
    description: 'Completed all HTML lessons',
    icon: 'file-text',
    color: 'bg-orange-500'
  },
  {
    id: 'css-master',
    title: 'CSS Wizard',
    description: 'Completed all CSS lessons',
    icon: 'paint-bucket',
    color: 'bg-blue-500'
  },
  {
    id: 'js-master',
    title: 'JavaScript Guru',
    description: 'Completed all JavaScript lessons',
    icon: 'code-2',
    color: 'bg-yellow-500'
  }
];