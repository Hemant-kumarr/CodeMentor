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

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'cheatsheet' | 'reference' | 'tool' | 'article';
  link: string;
  icon: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
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
        id: 'html-text-formatting',
        title: 'Text Formatting and Typography',
        description: 'Learn how to format text and create typographic hierarchy',
        content: `
# Text Formatting and Typography in HTML

Learn how to format text and create clear visual hierarchies using HTML elements.

## Headings

HTML provides six levels of headings:

\`\`\`html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Section Heading</h3>
<h4>Subsection Heading</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>
\`\`\`

## Text Formatting Elements

\`\`\`html
<strong>Bold text</strong>
<em>Italic text</em>
<u>Underlined text</u>
<mark>Highlighted text</mark>
<small>Smaller text</small>
<del>Deleted text</del>
<ins>Inserted text</ins>
<sub>Subscript</sub>
<sup>Superscript</sup>
\`\`\`

## Paragraphs and Line Breaks

\`\`\`html
<p>This is a paragraph of text.</p>
<br> <!-- Line break -->
<hr> <!-- Horizontal rule -->
\`\`\`
        `,
        challenge: {
          description: 'Create a formatted article using various text elements',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>Article</title>
</head>
<body>
  <!-- Create your article here -->
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>Article</title>
</head>
<body>
  <h1>The Future of Web Development</h1>
  <p><strong>Web development</strong> is constantly evolving. New technologies emerge every year, making the field <em>dynamic and exciting</em>.</p>
  <h2>Key Trends</h2>
  <p>Here are some important trends in <mark>2025</mark>:</p>
  <ul>
    <li><strong>AI Integration</strong></li>
    <li><em>Responsive Design</em></li>
    <li><u>Progressive Web Apps</u></li>
  </ul>
  <hr>
  <small>Last updated: March 2025</small>
</body>
</html>
          `
        },
        xpReward: 15
      },
      {
        id: 'html-links-images',
        title: 'Links and Images',
        description: 'Learn how to add links and images to your web pages',
        content: `
# Links and Images in HTML

Learn how to create hyperlinks and add images to your web pages.

## Links

The \`<a>\` element creates hyperlinks:

\`\`\`html
<!-- Basic link -->
<a href="https://example.com">Visit Example</a>

<!-- Link to another page -->
<a href="about.html">About Us</a>

<!-- Link that opens in new tab -->
<a href="https://example.com" target="_blank">Open in New Tab</a>

<!-- Link to email -->
<a href="mailto:contact@example.com">Email Us</a>

<!-- Link to phone number -->
<a href="tel:+1234567890">Call Us</a>
\`\`\`

## Images

The \`<img>\` element embeds images:

\`\`\`html
<!-- Basic image -->
<img src="image.jpg" alt="Description">

<!-- Image with width and height -->
<img src="image.jpg" alt="Description" width="300" height="200">

<!-- Responsive image -->
<img src="image.jpg" alt="Description" style="max-width: 100%; height: auto;">
\`\`\`

## Combining Links and Images

\`\`\`html
<a href="https://example.com">
  <img src="logo.png" alt="Company Logo">
</a>
\`\`\`
        `,
        challenge: {
          description: 'Create a photo gallery with linked images',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>Photo Gallery</title>
</head>
<body>
  <!-- Create your gallery here -->
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>Photo Gallery</title>
</head>
<body>
  <h1>My Photo Gallery</h1>
  <div class="gallery">
    <a href="https://example.com/photo1-large.jpg" target="_blank">
      <img src="https://via.placeholder.com/300x200" alt="Nature Photo 1">
    </a>
    <a href="https://example.com/photo2-large.jpg" target="_blank">
      <img src="https://via.placeholder.com/300x200" alt="Nature Photo 2">
    </a>
    <a href="https://example.com/photo3-large.jpg" target="_blank">
      <img src="https://via.placeholder.com/300x200" alt="Nature Photo 3">
    </a>
  </div>
  <p>Click on any image to view full size</p>
</body>
</html>
          `
        },
        xpReward: 20
      },
      {
        id: 'html-lists',
        title: 'Lists and Navigation',
        description: 'Create different types of lists and navigation menus',
        content: `
# Lists and Navigation in HTML

Learn how to create various types of lists and navigation structures.

## Unordered Lists

\`\`\`html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
\`\`\`

## Ordered Lists

\`\`\`html
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>
\`\`\`

## Description Lists

\`\`\`html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
\`\`\`

## Navigation Menus

\`\`\`html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
\`\`\`
        `,
        challenge: {
          description: 'Create a website navigation menu with nested lists',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>Navigation Menu</title>
</head>
<body>
  <!-- Create your navigation here -->
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>Navigation Menu</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li>
        <a href="/products">Products</a>
        <ul>
          <li><a href="/products/new">New Arrivals</a></li>
          <li><a href="/products/featured">Featured</a></li>
          <li><a href="/products/sale">Sale</a></li>
        </ul>
      </li>
      <li>
        <a href="/services">Services</a>
        <ul>
          <li><a href="/services/consulting">Consulting</a></li>
          <li><a href="/services/training">Training</a></li>
          <li><a href="/services/support">Support</a></li>
        </ul>
      </li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</body>
</html>
          `
        },
        xpReward: 20
      },
      {
        id: 'html-tables',
        title: 'Tables and Data',
        description: 'Learn to create and structure tables for data presentation',
        content: `
# Tables in HTML

Learn how to create and structure tables for presenting data.

## Basic Table Structure

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Footer 1</td>
      <td>Footer 2</td>
    </tr>
  </tfoot>
</table>
\`\`\`

## Table Elements

- \`<table>\`: Defines a table
- \`<thead>\`: Groups header content
- \`<tbody>\`: Groups body content
- \`<tfoot>\`: Groups footer content
- \`<tr>\`: Defines a row
- \`<th>\`: Defines a header cell
- \`<td>\`: Defines a data cell

## Advanced Table Features

\`\`\`html
<table>
  <caption>Monthly Budget</caption>
  <colgroup>
    <col style="background-color: #f0f0f0">
    <col span="2">
  </colgroup>
  <tr>
    <th rowspan="2">Category</th>
    <th colspan="2">Amount</th>
  </tr>
</table>
\`\`\`
        `,
        challenge: {
          description: 'Create a complex table with merged cells and styling',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>Data Table</title>
</head>
<body>
  <!-- Create your table here -->
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>Data Table</title>
</head>
<body>
  <table border="1">
    <caption>Quarterly Sales Report</caption>
    <thead>
      <tr>
        <th rowspan="2">Product</th>
        <th colspan="4">Quarterly Sales</th>
      </tr>
      <tr>
        <th>Q1</th>
        <th>Q2</th>
        <th>Q3</th>
        <th>Q4</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Product A</td>
        <td>$1,000</td>
        <td>$1,200</td>
        <td>$900</td>
        <td>$1,500</td>
      </tr>
      <tr>
        <td>Product B</td>
        <td>$800</td>
        <td>$950</td>
        <td>$1,100</td>
        <td>$1,300</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Total</td>
        <td>$1,800</td>
        <td>$2,150</td>
        <td>$2,000</td>
        <td>$2,800</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>
          `
        },
        xpReward: 25
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

CSS (Cascading Style Sheets) is used to style and layout web pages. Learn the basics of CSS syntax and selectors.

## CSS Syntax

\`\`\`css
selector {
  property: value;
}
\`\`\`

## Ways to Add CSS

1. Inline CSS:
\`\`\`html
<div style="color: blue;">Blue text</div>
\`\`\`

2. Internal CSS:
\`\`\`html
<style>
  div { color: blue; }
</style>
\`\`\`

3. External CSS:
\`\`\`html
<link rel="stylesheet" href="styles.css">
\`\`\`

## Basic Selectors

\`\`\`css
/* Element selector */
p { color: red; }

/* Class selector */
.highlight { background-color: yellow; }

/* ID selector */
#header { font-size: 24px; }

/* Descendant selector */
div p { margin: 10px; }

/* Child selector */
div > p { padding: 5px; }
\`\`\`
        `,
        challenge: {
          description: 'Style a simple webpage using different CSS selectors',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>CSS Practice</title>
  <style>
    /* Add your CSS here */
  </style>
</head>
<body>
  <div id="container">
    <h1>Welcome</h1>
    <p class="highlight">This is a highlighted paragraph.</p>
    <p>This is a regular paragraph.</p>
  </div>
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>CSS Practice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
    }

    #container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
    }

    h1 {
      color: #333;
      text-align: center;
    }

    .highlight {
      background-color: #fff3cd;
      padding: 10px;
      border-radius: 4px;
    }

    p {
      color: #666;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div id="container">
    <h1>Welcome</h1>
    <p class="highlight">This is a highlighted paragraph.</p>
    <p>This is a regular paragraph.</p>
  </div>
</body>
</html>
          `
        },
        xpReward: 15
      },
      {
        id: 'css-colors-backgrounds',
        title: 'Colors and Backgrounds',
        description: 'Learn about color values and background properties',
        content: `
# Colors and Backgrounds in CSS

Learn how to work with colors and backgrounds in CSS.

## Color Values

\`\`\`css
/* Color keywords */
color: red;
color: blue;

/* Hexadecimal */
color: #ff0000;
color: #0000ff;

/* RGB */
color: rgb(255, 0, 0);
color: rgba(0, 0, 255, 0.5);

/* HSL */
color: hsl(0, 100%, 50%);
color: hsla(240, 100%, 50%, 0.5);
\`\`\`

## Background Properties

\`\`\`css
/* Background color */
background-color: #f0f0f0;

/* Background image */
background-image: url('image.jpg');

/* Background position */
background-position: center center;

/* Background size */
background-size: cover;
background-size: contain;

/* Background repeat */
background-repeat: no-repeat;

/* Background attachment */
background-attachment: fixed;

/* Shorthand */
background: #f0f0f0 url('image.jpg') center/cover no-repeat fixed;
\`\`\`
        `,
        challenge: {
          description: 'Create a webpage with various background effects',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>Backgrounds</title>
  <style>
    /* Add your CSS here */
  </style>
</head>
<body>
  <div class="hero">
    <h1>Welcome</h1>
  </div>
  <div class="content">
    <p>Content goes here</p>
  </div>
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>Backgrounds</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }

    .hero {
      height: 400px;
      background-image: url('https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero h1 {
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      font-size: 48px;
    }

    .content {
      padding: 40px;
      background-color: #f8f9fa;
      background-image: linear-gradient(45deg, #f8f9fa 25%, transparent 25%),
                        linear-gradient(-45deg, #f8f9fa 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #f8f9fa 75%),
                        linear-gradient(-45deg, transparent 75%, #f8f9fa 75%);
      background-size: 20px 20px;
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Welcome</h1>
  </div>
  <div class="content">
    <p>Content goes here</p>
  </div>
</body>
</html>
          `
        },
        xpReward: 20
      },
      {
        id: 'css-box-model',
        title: 'Box Model and Layout',
        description: 'Understanding the CSS box model and layout properties',
        content: `
# CSS Box Model

The CSS box model is fundamental to layout and spacing in CSS.

## Box Model Components

\`\`\`css
/* Content */
width: 200px;
height: 100px;

/* Padding */
padding: 20px;
padding-top: 10px;
padding-right: 20px;
padding-bottom: 10px;
padding-left: 20px;

/* Border */
border: 1px solid black;
border-width: 1px;
border-style: solid;
border-color: black;

/* Margin */
margin: 20px;
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;

/* Box Sizing */
box-sizing: border-box;
box-sizing: content-box;
\`\`\`

## Display Properties

\`\`\`css
/* Common display values */
display: block;
display: inline;
display: inline-block;
display: flex;
display: grid;
display: none;
\`\`\`

## Position Properties

\`\`\`css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;

top: 0;
right: 0;
bottom: 0;
left: 0;
z-index: 1;
\`\`\`
        `,
        challenge: {
          description: 'Create a layout using the box model and positioning',
          startingCode: `
<!DOCTYPE html>
<html>
<head>
  <title>Layout Practice</title>
  <style>
    /* Add your CSS here */
  </style>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>
  <main>
    <aside>Sidebar</aside>
    <article>Main Content</article>
  </main>
  <footer>Footer</footer>
</body>
</html>
          `,
          solution: `
<!DOCTYPE html>
<html>
<head>
  <title>Layout Practice</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    header {
      background-color: #333;
      color: white;
      padding: 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    main {
      display: flex;
      min-height: calc(100vh - 120px);
    }

    aside {
      width: 200px;
      background-color: #f4f4f4;
      padding: 1rem;
      border-right: 1px solid #ddd;
    }

    article {
      flex: 1;
      padding: 1rem;
    }

    footer {
      background-color: #333;
      color: white;
      padding: 1rem;
      text-align: center;
      height: 60px;
    }

    @media (max-width: 768px) {
      main {
        flex-direction: column;
      }

      aside {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #ddd;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>
  <main>
    <aside>Sidebar</aside>
    <article>Main Content</article>
  </main>
  <footer>Footer</footer>
</body>
</html>
          `
        },
        xpReward: 25
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

JavaScript is a programming language that enables interactive web pages. Learn the fundamentals of JavaScript programming.

## Variables and Data Types

\`\`\`javascript
// Variables
let name = 'John';
const age = 30;
var oldStyle = 'not recommended';

// Data Types
let string = 'Hello';
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { key: 'value' };
let nullValue = null;
let undefinedValue;

// Template Literals
let greeting = \`Hello, \${name}!\`;
\`\`\`

## Operators

\`\`\`javascript
// Arithmetic
let sum = 5 + 3;
let difference = 10 - 5;
let product = 4 * 2;
let quotient = 15 / 3;
let remainder = 10 % 3;

// Comparison
let equals = 5 === 5;
let notEquals = 5 !== 3;
let greaterThan = 10 > 5;
let lessThan = 5 < 10;

// Logical
let and = true && false;
let or = true || false;
let not = !true;
\`\`\`

## Control Flow

\`\`\`javascript
// If Statement
if (condition) {
  // code
} else if (otherCondition) {
  // code
} else {
  // code
}

// Switch Statement
switch (value) {
  case 1:
    // code
    break;
  case 2:
    // code
    break;
  default:
    // code
}

// Loops
for (let i = 0; i < 5; i++) {
  // code
}

while (condition) {
  // code
}

do {
  // code
} while (condition);
\`\`\`
        `,
        challenge: {
          description: 'Create a simple calculator program',
          startingCode: `
function calculate(num1, num2, operation) {
  // Implement the calculator
}

// Test cases
console.log(calculate(5, 3, 'add'));
console.log(calculate(10, 2, 'subtract'));
console.log(calculate(4, 5, 'multiply'));
console.log(calculate(15, 3, 'divide'));
          `,
          solution: `
function calculate(num1, num2, operation) {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 === 0) {
        return 'Cannot divide by zero';
      }
      return num1 / num2;
    default:
      return 'Invalid operation';
  }
}

// Test cases
console.log(calculate(5, 3, 'add')); // 8
console.log(calculate(10, 2, 'subtract')); // 8
console.log(calculate(4, 5, 'multiply')); // 20
console.log(calculate(15, 3, 'divide')); // 5
          `
        },
        xpReward: 20
      },
      {
        id: 'js-functions',
        title: 'Functions and Scope',
        description: 'Learn about JavaScript functions and variable scope',
        content: `
# Functions and Scope in JavaScript

Learn how to create and use functions, and understand variable scope.

## Function Declaration

\`\`\`javascript
// Function Declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function Expression
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

// Arrow Function
const greet = (name) => \`Hello, \${name}!\`;

// Default Parameters
function greet(name = 'Guest') {
  return \`Hello, \${name}!\`;
}

// Rest Parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
\`\`\`

## Scope

\`\`\`javascript
// Global Scope
let globalVar = 'I am global';

function example() {
  // Function Scope
  let functionVar = 'I am function-scoped';
  
  if (true) {
    // Block Scope
    let blockVar = 'I am block-scoped';
    const alsoBlockScoped = 'Me too';
    var notBlockScoped = 'I leak out';
  }
}

// Closure
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
\`\`\`
        `,
        challenge: {
          description: 'Create a function factory with closures',
          startingCode: `
function createGame(initialScore) {
  
  // Implement the game factory
}

// Test the implementation
const game = createGame(0);
console.log(game.getScore()); // Should print 0
game.addPoints(5);
console.log(game.getScore()); // Should print 5
game.subtractPoints(2);
console.log(game.getScore()); // Should print 3
          `,
          solution: `
function createGame(initialScore) {
  let score = initialScore;
  
  return {
    getScore: function() {
      return score;
    },
    addPoints: function(points) {
      score += points;
      return score;
    },
    subtractPoints: function(points) {
      score -= points;
      return score;
    },
    resetScore: function() {
      score = initialScore;
      return score;
    }
  };
}

// Test the implementation
const game = createGame(0);
console.log(game.getScore()); // 0
game.addPoints(5);
console.log(game.getScore()); // 5
game.subtractPoints(2);
console.log(game.getScore()); // 3
game.resetScore();
console.log(game.getScore()); // 0
          `
        },
        xpReward: 25
      },
      {
        id: 'js-arrays',
        title: 'Arrays and Array Methods',
        description: 'Work with arrays and learn powerful array methods',
        content: `
# Arrays in JavaScript

Learn how to work with arrays and use array methods effectively.

## Array Basics

\`\`\`javascript
// Creating Arrays
let fruits = ['apple', 'banana', 'orange'];
let numbers = new Array(1, 2, 3);
let mixed = [1, 'two', { three: 3 }, [4]];

// Accessing Elements
let firstFruit = fruits[0];
let lastFruit = fruits[fruits.length - 1];

// Modifying Arrays
fruits[1] = 'grape';
fruits.push('mango');
fruits.pop();
fruits.unshift('pear');
fruits.shift();
\`\`\`

## Array Methods

\`\`\`javascript
// forEach
fruits.forEach(fruit => console.log(fruit));

// map
let doubled = numbers.map(num => num * 2);

// filter
let evenNumbers = numbers.filter(num => num % 2 === 0);

// reduce
let sum = numbers.reduce((total, num) => total + num, 0);

// find
let found = numbers.find(num => num > 2);

// some
let hasEven = numbers.some(num => num % 2 === 0);

// every
let allPositive = numbers.every(num => num > 0);

// sort
fruits.sort();
numbers.sort((a, b) => a - b);

// slice and splice
let sliced = fruits.slice(1, 3);
fruits.splice(1, 1, 'new item');
\`\`\`
        `,
        challenge: {
          description: 'Create a todo list manager using array methods',
          startingCode: `
class TodoList {
  constructor() {
    this.todos = [];
  }
  
  // Implement these methods
  addTodo(text) {}
  removeTodo(id) {}
  toggleTodo(id) {}
  filterTodos(status) {}
}

// Test the implementation
const todoList = new TodoList();
          `,
          solution: `
class TodoList {
  constructor() {
    this.todos = [];
    this.currentId = 1;
  }
  
  addTodo(text) {
    const todo = {
      id: this.currentId++,
      text,
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(todo);
    return todo;
  }
  
  removeTodo(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      return this.todos.splice(index, 1)[0];
    }
    return null;
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      return todo;
    }
    return null;
  }
  
  filterTodos(status) {
    if (status === 'all') return this.todos;
    return this.todos.filter(todo => 
      status === 'completed' ? todo.completed : !todo.completed
    );
  }
}

// Test the implementation
const todoList = new TodoList();
todoList.addTodo('Learn JavaScript');
todoList.addTodo('Build a project');
todoList.toggleTodo(1);
console.log(todoList.filterTodos('completed'));
console.log(todoList.filterTodos('active'));
          `
        },
        xpReward: 30
      }
    ]
  }
];

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