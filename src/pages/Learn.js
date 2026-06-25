import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight, faChevronDown, faCheckCircle, faCircle,
  faBars, faTimes, faArrowLeft, faArrowRight, faLock,
  faTrophy, faFire, faBookOpen
} from '@fortawesome/free-solid-svg-icons';
import './Learn.css';

/* ───────────────────────────── CURRICULUM DATA ───────────────────────────── */
const curriculum = {
  html: {
    title: 'HTML',
    color: '#e34c26',
    lightColor: '#fff3f0',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
    desc: 'HTML is the standard markup language for Web pages.',
    sections: [
      {
        title: 'HTML Tutorial',
        modules: [
          { id: 'html-home', title: 'HTML HOME', content: { heading: 'Learn HTML', body: `HTML stands for **HyperText Markup Language**. It is the standard language used to create and structure content on the web.\n\nWith HTML you can create your own Website. HTML describes the structure of a Web page, and consists of a series of elements. HTML elements tell the browser how to display the content.`, example: `<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>This is my first HTML page.</p>\n</body>\n</html>`, tip: 'HTML stands for HyperText Markup Language. Every webpage you see is built with HTML.' } },
          { id: 'html-intro', title: 'HTML Introduction', content: { heading: 'HTML Introduction', body: `An HTML file is a text file containing small markup tags. The markup tags tell the Web browser how to display the page.\n\nHTML documents must start with a document type declaration: \`<!DOCTYPE html>\`\n\nThe HTML document itself begins with \`<html>\` and ends with \`</html>\`\n\nThe visible part of the HTML document is between \`<body>\` and \`</body>\``, example: `<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n\n</body>\n</html>`, tip: 'All HTML documents start with <!DOCTYPE html> — this tells the browser what type of document to expect.' } },
          { id: 'html-editors', title: 'HTML Editors', content: { heading: 'HTML Editors', body: `Web pages can be created and modified by using professional HTML editors. However, for learning HTML we recommend a simple text editor like:\n\n- **VS Code** — free, powerful, most popular\n- **Notepad++** — lightweight for Windows\n- **Sublime Text** — fast and clean\n\nWe believe that using a simple text editor is a good way to learn HTML.`, example: `<!-- Save your file as index.html -->\n<!-- Then open it in any browser -->\n\n<!DOCTYPE html>\n<html>\n<body>\n  <p>Hello from my editor!</p>\n</body>\n</html>`, tip: 'VS Code is the most popular code editor in the world. Install the "Live Server" extension to see changes instantly.' } },
          { id: 'html-basic', title: 'HTML Basic', content: { heading: 'HTML Basic Examples', body: `In this chapter we will show some basic HTML examples.\n\n**HTML Headings** are defined with \`<h1>\` to \`<h6>\` tags.\n\n**HTML Paragraphs** are defined with the \`<p>\` tag.\n\n**HTML Links** are defined with the \`<a>\` tag.\n\n**HTML Images** syntax is: \`<img src="url" alt="text">\``, example: `<h1>This is heading 1</h1>\n<h2>This is heading 2</h2>\n<p>This is a paragraph.</p>\n<a href="https://www.google.com">This is a link</a>\n<img src="pic.jpg" alt="My image">`, tip: 'Headings h1–h6 go from largest to smallest. Always use h1 for the main title of a page.' } },
          { id: 'html-elements', title: 'HTML Elements', content: { heading: 'HTML Elements', body: `An HTML element is defined by a start tag, some content, and an end tag:\n\n\`<tagname>Content goes here...</tagname>\`\n\nThe HTML element is everything from the start tag to the end tag. Some elements have no content (empty elements): \`<br>\`, \`<hr>\`, \`<img>\``, example: `<p>My first paragraph.</p>\n<br>           <!-- line break, no closing tag -->\n<hr>           <!-- horizontal rule -->\n<img src="logo.png" alt="Logo">  <!-- image -->`, tip: 'Not all HTML elements need a closing tag. Elements like <br>, <img>, and <input> are self-closing.' } },
          { id: 'html-attributes', title: 'HTML Attributes', content: { heading: 'HTML Attributes', body: `HTML attributes provide additional information about HTML elements. Attributes are always specified in the **start tag** and come in name/value pairs like: \`name="value"\`\n\nCommon attributes:\n- \`href\` — URL for links\n- \`src\` — source for images\n- \`class\` — CSS class name\n- \`id\` — unique identifier\n- \`style\` — inline CSS`, example: `<a href="https://google.com" target="_blank">Google</a>\n<img src="photo.jpg" alt="Photo" width="300">\n<p class="intro" id="first">Hello!</p>\n<p style="color:red">Red text</p>`, tip: 'Always use lowercase attribute names and quote attribute values — it makes your HTML cleaner and compatible.' } },
          { id: 'html-headings', title: 'HTML Headings', content: { heading: 'HTML Headings', body: `HTML headings are defined with the \`<h1>\` to \`<h6>\` tags. \`<h1>\` defines the most important heading. \`<h6>\` defines the least important heading.\n\nSearch engines use headings to index your page structure. Use headings to create a hierarchy. Don't use headings just to make text big or bold — use CSS for that.`, example: `<h1>Heading 1 (Most Important)</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6 (Least Important)</h6>`, tip: 'Each page should have only ONE <h1> tag. It tells search engines what the page is about.' } },
          { id: 'html-paragraphs', title: 'HTML Paragraphs', content: { heading: 'HTML Paragraphs', body: `The HTML \`<p>\` element defines a paragraph. A paragraph always starts on a new line, and browsers automatically add some white space (margin) before and after a paragraph.\n\nYou cannot change the display by adding extra spaces or extra lines in your HTML code. The browser will automatically remove any extra spaces and lines when the page is displayed.`, example: `<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>\n\n<!-- pre preserves spacing -->\n<pre>\n  My    formatted\n  text  here\n</pre>`, tip: 'Use <br> for a line break inside a paragraph. Use <p> when you want a full new paragraph with spacing.' } },
        ]
      },
      {
        title: 'HTML Styles',
        modules: [
          { id: 'html-styles', title: 'HTML Styles', content: { heading: 'HTML Styles', body: `The HTML \`style\` attribute is used to add styles to an element, such as color, font, size, and more.\n\nThe HTML style attribute has the following syntax:\n\`<tagname style="property:value;">\`\n\nThe property is a CSS property. The value is a CSS value.`, example: `<p style="color:red;">Red text</p>\n<p style="background-color:tomato; color:white; font-size:20px;">Styled!</p>\n<h1 style="text-align:center;">Centered Heading</h1>`, tip: 'Inline styles are fine for learning, but in real projects use external CSS files to keep styles separate from HTML.' } },
          { id: 'html-formatting', title: 'HTML Formatting', content: { heading: 'HTML Formatting', body: `HTML contains several elements for defining text with a special meaning. Formatting elements were designed to display special types of text:\n\n- \`<b>\` — Bold text\n- \`<strong>\` — Important text\n- \`<i>\` — Italic text\n- \`<em>\` — Emphasized text\n- \`<mark>\` — Marked/highlighted text\n- \`<small>\` — Smaller text\n- \`<del>\` — Deleted text\n- \`<ins>\` — Inserted text\n- \`<sub>\` / \`<sup>\` — Subscript / Superscript`, example: `<b>Bold text</b>\n<strong>Important text</strong>\n<i>Italic text</i>\n<em>Emphasized text</em>\n<mark>Highlighted text</mark>\n<del>Deleted</del> <ins>Inserted</ins>\nH<sub>2</sub>O and x<sup>2</sup>`, tip: 'Prefer <strong> over <b> and <em> over <i> — they carry semantic meaning, which helps screen readers and SEO.' } },
          { id: 'html-colors', title: 'HTML Colors', content: { heading: 'HTML Colors', body: `HTML colors are specified with predefined color names, or with RGB, HEX, HSL values.\n\nColor can be set on:\n- **Background**: \`background-color\`\n- **Text**: \`color\`\n- **Border**: \`border-color\`\n\nFormats: \`red\`, \`#ff0000\`, \`rgb(255,0,0)\`, \`hsl(0,100%,50%)\``, example: `<h1 style="background-color:DodgerBlue;">Blue bg</h1>\n<p style="color:#e34c26;">Orange text</p>\n<p style="color:rgb(60,179,113);">Green text</p>\n<p style="border: 2px solid hsl(300,100%,50%);">Pink border</p>`, tip: 'HEX colors are most common in web dev. Tools like coolors.co help you pick beautiful color palettes.' } },
        ]
      },
      {
        title: 'HTML Structure',
        modules: [
          { id: 'html-links', title: 'HTML Links', content: { heading: 'HTML Links', body: `HTML links are hyperlinks. You can click on a link and jump to another document. Links are defined with the \`<a>\` tag. The most important attribute is \`href\`, which indicates the link's destination.\n\n**Link targets:**\n- \`_blank\` — opens in a new tab\n- \`_self\` — opens in same tab (default)\n- \`_parent\` — opens in parent frame`, example: `<!-- External link -->\n<a href="https://google.com" target="_blank">Google</a>\n\n<!-- Internal link -->\n<a href="/about.html">About Us</a>\n\n<!-- Email link -->\n<a href="mailto:hello@example.com">Email Me</a>\n\n<!-- Jump to section -->\n<a href="#section1">Go to Section</a>`, tip: 'Always add target="_blank" when linking to external sites — it keeps users on your page while letting them explore.' } },
          { id: 'html-images', title: 'HTML Images', content: { heading: 'HTML Images', body: `Images can improve the design and appearance of a web page. The \`<img>\` tag is used to embed an image in an HTML page.\n\nThe \`<img>\` tag has two required attributes:\n- \`src\` — Specifies the path to the image\n- \`alt\` — Specifies an alternate text for the image\n\nAlways specify the width and height of an image. If width and height are not specified, the page might flicker while the image loads.`, example: `<img src="logo.png" alt="Company Logo" width="200" height="100">\n\n<!-- Using URL -->\n<img src="https://example.com/photo.jpg" alt="Photo">\n\n<!-- Responsive image -->\n<img src="pic.jpg" alt="pic" style="max-width:100%">`, tip: 'Always fill in the alt attribute — it helps visually impaired users and improves SEO.' } },
          { id: 'html-tables', title: 'HTML Tables', content: { heading: 'HTML Tables', body: `HTML tables allow web developers to arrange data into rows and columns.\n\nKey table tags:\n- \`<table>\` — defines the table\n- \`<tr>\` — table row\n- \`<th>\` — table header cell\n- \`<td>\` — table data cell\n- \`<thead>\` / \`<tbody>\` / \`<tfoot>\` — grouping`, example: `<table border="1">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Age</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>24</td>\n    </tr>\n    <tr>\n      <td>Bob</td>\n      <td>30</td>\n    </tr>\n  </tbody>\n</table>`, tip: 'Use CSS to style tables — the old "border" attribute still works but CSS gives you much more control.' } },
          { id: 'html-lists', title: 'HTML Lists', content: { heading: 'HTML Lists', body: `HTML lists allow web developers to group a set of related items in lists.\n\n**Types of lists:**\n- Unordered list (\`<ul>\`) — bullet points\n- Ordered list (\`<ol>\`) — numbered\n- Description list (\`<dl>\`) — term & description pairs\n\nLists can be nested inside each other.`, example: `<!-- Unordered -->\n<ul>\n  <li>Coffee</li>\n  <li>Tea</li>\n  <li>Milk</li>\n</ul>\n\n<!-- Ordered -->\n<ol>\n  <li>First step</li>\n  <li>Second step</li>\n</ol>\n\n<!-- Description -->\n<dl>\n  <dt>HTML</dt>\n  <dd>Markup language</dd>\n</dl>`, tip: 'Ordered lists default to numbers. Add type="A" for letters, type="I" for Roman numerals.' } },
          { id: 'html-forms', title: 'HTML Forms', content: { heading: 'HTML Forms', body: `An HTML form is used to collect user input. The user input is most often sent to a server for processing.\n\nThe \`<form>\` element is a container for input elements:\n- \`<input>\` — most versatile (text, email, password, checkbox, radio, submit…)\n- \`<textarea>\` — multiline text\n- \`<select>\` — dropdown\n- \`<button>\` — clickable button\n- \`<label>\` — labels for inputs`, example: `<form action="/submit" method="post">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email">\n\n  <label for="msg">Message:</label>\n  <textarea id="msg" name="msg" rows="4"></textarea>\n\n  <button type="submit">Send</button>\n</form>`, tip: 'Always use <label> with your inputs and connect them via the "for"/"id" pair — it improves accessibility.' } },
        ]
      },
    ]
  },

  css: {
    title: 'CSS',
    color: '#264de4',
    lightColor: '#f0f4ff',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg',
    desc: 'CSS is the language we use to style an HTML document.',
    sections: [
      {
        title: 'CSS Tutorial',
        modules: [
          { id: 'css-home', title: 'CSS HOME', content: { heading: 'Learn CSS', body: `CSS stands for **Cascading Style Sheets**. CSS describes how HTML elements are to be displayed on screen, paper, or in other media.\n\nCSS saves a lot of work. It can control the layout of multiple web pages all at once. External stylesheets are stored in CSS files.`, example: `/* A CSS rule has a selector and declarations */\nbody {\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #2563eb;\n  text-align: center;\n}\n\np {\n  font-size: 16px;\n  line-height: 1.6;\n}`, tip: 'CSS stands for Cascading Style Sheets — "cascading" means styles can be overridden from multiple sources.' } },
          { id: 'css-intro', title: 'CSS Introduction', content: { heading: 'CSS Introduction', body: `CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.\n\n**Three ways to insert CSS:**\n1. **Inline** — inside an HTML element's style attribute\n2. **Internal** — inside a \`<style>\` tag in \`<head>\`\n3. **External** — in a separate .css file (recommended)`, example: `<!-- 1. Inline -->\n<p style="color:blue;">Blue text</p>\n\n<!-- 2. Internal (in <head>) -->\n<style>\n  p { color: green; }\n</style>\n\n<!-- 3. External (in <head>) -->\n<link rel="stylesheet" href="styles.css">`, tip: 'Always use external CSS files in real projects. It keeps your HTML clean and lets you reuse styles across pages.' } },
          { id: 'css-selectors', title: 'CSS Selectors', content: { heading: 'CSS Selectors', body: `CSS selectors are used to "find" (or select) the HTML elements you want to style.\n\n**Types of Selectors:**\n- **Element** — \`p { }\` selects all \`<p>\`\n- **Class** — \`.intro { }\` selects class="intro"\n- **ID** — \`#title { }\` selects id="title"\n- **Universal** — \`* { }\` selects everything\n- **Grouping** — \`h1, h2, p { }\` selects all three\n- **Descendant** — \`div p { }\` selects \`<p>\` inside \`<div>\``, example: `/* Element selector */\np { color: black; }\n\n/* Class selector */\n.highlight { background: yellow; }\n\n/* ID selector */\n#header { font-size: 2rem; }\n\n/* Descendant */\nnav a { text-decoration: none; }\n\n/* Pseudo-class */\na:hover { color: red; }`, tip: 'IDs must be unique on a page. Classes can be reused. Use classes for styling — IDs for JavaScript hooks.' } },
          { id: 'css-colors', title: 'CSS Colors', content: { heading: 'CSS Colors', body: `In CSS, colors can be specified by using predefined color names, HEX values, RGB, RGBA, HSL, and HSLA values.\n\n- **Named**: \`red\`, \`tomato\`, \`dodgerblue\`\n- **HEX**: \`#RRGGBB\` or \`#RGB\`\n- **RGB**: \`rgb(255, 0, 0)\`\n- **RGBA**: \`rgba(255, 0, 0, 0.5)\` — with opacity\n- **HSL**: \`hsl(0, 100%, 50%)\``, example: `h1 { color: #2563eb; }\np  { color: rgb(100, 100, 100); }\ndiv {\n  background-color: rgba(0, 0, 0, 0.1);\n  border: 2px solid hsl(217, 91%, 60%);\n}\n.overlay {\n  background: rgba(0,0,0,0.5); /* semi-transparent */\n}`, tip: 'RGBA is perfect for overlays and semi-transparent backgrounds. The 4th value (0–1) controls opacity.' } },
          { id: 'css-backgrounds', title: 'CSS Backgrounds', content: { heading: 'CSS Backgrounds', body: `CSS background properties are used to add background effects for elements.\n\n**Key properties:**\n- \`background-color\` — solid color\n- \`background-image\` — image or gradient\n- \`background-repeat\` — repeat behavior\n- \`background-size\` — \`cover\`, \`contain\`, size\n- \`background-position\` — center, top, etc.\n- \`background\` — shorthand for all`, example: `/* Solid color */\nbody { background-color: #f8fafc; }\n\n/* Image */\n.hero {\n  background-image: url('hero.jpg');\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n/* Gradient */\n.banner {\n  background: linear-gradient(135deg, #1e3a5f, #2563eb);\n}`, tip: 'background-size: cover makes images fill their container without stretching. Perfect for hero sections.' } },
        ]
      },
      {
        title: 'CSS Box Model',
        modules: [
          { id: 'css-box-model', title: 'CSS Box Model', content: { heading: 'CSS Box Model', body: `In CSS, the term "box model" is used when talking about design and layout. Every element is a rectangular box.\n\nThe CSS box model consists of:\n- **Content** — the actual content\n- **Padding** — space inside the border\n- **Border** — border around the padding\n- **Margin** — space outside the border\n\nWith \`box-sizing: border-box\`, padding and border are included in the element's total width.`, example: `div {\n  width: 300px;\n  padding: 20px;        /* space inside */\n  border: 2px solid #ccc;\n  margin: 10px;         /* space outside */\n  box-sizing: border-box;\n}\n\n/* Common reset */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}`, tip: 'Always add "box-sizing: border-box" to your CSS reset. It makes sizing elements much more predictable.' } },
          { id: 'css-border', title: 'CSS Borders', content: { heading: 'CSS Borders', body: `The CSS border properties allow you to specify the style, width, and color of an element's border.\n\n**border-style values:**\n\`dotted\`, \`dashed\`, \`solid\`, \`double\`, \`groove\`, \`ridge\`, \`inset\`, \`outset\`, \`none\`\n\nShorthand: \`border: width style color\`\n\nIndividual sides: \`border-top\`, \`border-right\`, \`border-bottom\`, \`border-left\``, example: `p { border: 2px solid #2563eb; }\n\n/* Individual sides */\nh1 { border-bottom: 3px solid red; }\n\n/* Rounded corners */\n.card {\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n}\n\n/* Pill shape */\n.badge {\n  border-radius: 999px;\n}`, tip: 'border-radius: 50% makes a perfect circle. border-radius: 999px creates a pill/capsule shape.' } },
          { id: 'css-margins', title: 'CSS Margins', content: { heading: 'CSS Margins & Padding', body: `**Margins** create space outside an element's border. **Padding** creates space inside the border.\n\nBoth use the same shorthand system:\n- **4 values**: top right bottom left\n- **3 values**: top left&right bottom\n- **2 values**: top&bottom left&right\n- **1 value**: all sides\n\n\`margin: auto\` horizontally centers a block element.`, example: `/* Shorthand */\np { margin: 10px 20px 10px 20px; }\np { margin: 10px 20px; }  /* top&bottom, left&right */\np { padding: 16px; }       /* all sides */\n\n/* Center a block */\n.container {\n  width: 900px;\n  margin: 0 auto;\n}\n\n/* Individual */\nh1 { margin-top: 2rem; margin-bottom: 1rem; }`, tip: 'margin: 0 auto is the classic trick to center a block element horizontally — it still works great!' } },
        ]
      },
      {
        title: 'CSS Layout',
        modules: [
          { id: 'css-display', title: 'CSS Display', content: { heading: 'CSS Display', body: `The \`display\` property specifies the display behavior of an element. It is the most important CSS property for controlling layout.\n\n**Common values:**\n- \`block\` — full width, new line (div, p, h1)\n- \`inline\` — fits content, same line (span, a)\n- \`inline-block\` — inline but with block properties\n- \`none\` — hides the element\n- \`flex\` — flexbox layout\n- \`grid\` — grid layout`, example: `/* Make inline element block */\na { display: block; padding: 10px; }\n\n/* Hide element */\n.hidden { display: none; }\n\n/* Inline block for nav items */\nnav li {\n  display: inline-block;\n  margin: 0 10px;\n}\n\n/* Flexbox */\n.container { display: flex; gap: 16px; }`, tip: 'display: none completely removes the element from flow. Use visibility: hidden to hide but keep the space.' } },
          { id: 'css-flexbox', title: 'CSS Flexbox', content: { heading: 'CSS Flexbox', body: `The Flexbox layout mode makes it easy to design flexible responsive layouts.\n\n**Parent (container) properties:**\n- \`display: flex\`\n- \`flex-direction\`: row | column\n- \`justify-content\`: flex-start | center | flex-end | space-between | space-around\n- \`align-items\`: stretch | center | flex-start | flex-end\n- \`flex-wrap\`: nowrap | wrap\n- \`gap\`: space between items`, example: `.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n/* Vertical centering */\n.hero {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n}`, tip: 'justify-content controls the main axis (horizontal by default). align-items controls the cross axis (vertical).' } },
          { id: 'css-grid', title: 'CSS Grid', content: { heading: 'CSS Grid', body: `CSS Grid Layout is a two-dimensional layout system. It lets you create rows AND columns simultaneously.\n\n**Key properties:**\n- \`grid-template-columns\` — define columns\n- \`grid-template-rows\` — define rows\n- \`gap\` — spacing between cells\n- \`grid-column\` / \`grid-row\` — span multiple cells\n- \`repeat()\` — shorthand for repeating\n- \`fr\` unit — fractional space`, example: `/* 3 equal columns */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n\n/* Responsive auto-fit */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n\n/* Span multiple columns */\n.featured {\n  grid-column: span 2;\n}`, tip: 'repeat(auto-fit, minmax(250px, 1fr)) creates a fully responsive grid with no media queries — very powerful!' } },
          { id: 'css-responsive', title: 'CSS Responsive', content: { heading: 'CSS Responsive Design', body: `Responsive web design is about creating web pages that look good on all devices. It uses CSS and HTML to resize, hide, shrink, or enlarge a website.\n\n**Media Queries** apply styles based on screen size:\n- \`max-width\` — applies below a size\n- \`min-width\` — applies above a size\n\n**Common breakpoints:**\n- Mobile: 480px\n- Tablet: 768px\n- Desktop: 1024px+`, example: `/* Mobile first: write for small screens, then add larger */\n.container { padding: 1rem; }\n\n/* Tablet */\n@media (min-width: 768px) {\n  .container { padding: 2rem; }\n  .grid { grid-template-columns: 1fr 1fr; }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .container { max-width: 1200px; margin: 0 auto; }\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}`, tip: 'Design mobile-first — start with styles for small screens, then use min-width queries to add complexity for larger screens.' } },
        ]
      },
    ]
  },

  javascript: {
    title: 'JavaScript',
    color: '#f7df1e',
    textColor: '#1a1a1a',
    lightColor: '#fffde7',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    desc: 'JavaScript is the world\'s most popular programming language.',
    sections: [
      {
        title: 'JS Tutorial',
        modules: [
          { id: 'js-home', title: 'JS HOME', content: { heading: 'Learn JavaScript', body: `JavaScript is the world's most popular programming language. It is the programming language of the Web. JavaScript is easy to learn.\n\nJavaScript can:\n- Change HTML content and attributes\n- Change HTML element styles (CSS)\n- Validate data entered by the user\n- Make requests to servers (AJAX/Fetch)\n- Create interactive applications`, example: `// Your first JavaScript\nconsole.log("Hello, World!");\n\n// Change HTML content\ndocument.getElementById("demo").innerHTML = "Hello JS!";\n\n// Simple calculation\nlet x = 5 + 3;\nconsole.log(x); // 8`, tip: 'JavaScript runs in every browser — no installation needed! Open DevTools (F12) and use the Console to try code right now.' } },
          { id: 'js-intro', title: 'JS Introduction', content: { heading: 'JavaScript Introduction', body: `JavaScript can be added to HTML pages in 3 ways:\n\n1. **Inline** — directly in HTML attributes like \`onclick\`\n2. **Internal** — inside \`<script>\` tags in HTML\n3. **External** — in a separate \`*.js\` file (best practice)\n\nThe \`<script>\` tag can be placed in \`<head>\` or \`<body>\`. Placing scripts at the bottom of \`<body>\` is best practice.`, example: `<!-- 1. Inline (avoid for complex logic) -->\n<button onclick="alert('Hi!')">Click me</button>\n\n<!-- 2. Internal -->\n<script>\n  console.log("Internal JS");\n</script>\n\n<!-- 3. External (best practice) -->\n<script src="app.js"></script>`, tip: 'Place your <script src="app.js"> just before </body> — this ensures the HTML loads before your JS runs.' } },
          { id: 'js-variables', title: 'JS Variables', content: { heading: 'JavaScript Variables', body: `Variables are containers for storing data values. JavaScript has 3 ways to declare variables:\n\n- \`var\` — old way, function-scoped, avoid in modern JS\n- \`let\` — block-scoped, can be reassigned\n- \`const\` — block-scoped, cannot be reassigned\n\n**Rule of thumb**: Use \`const\` by default. Use \`let\` when you need to reassign. Avoid \`var\`.`, example: `// const - value won't change\nconst name = "Alice";\nconst PI = 3.14159;\n\n// let - value may change\nlet age = 25;\nage = 26; // OK\n\n// var - avoid in modern JS\nvar old = "don't use";\n\n// Multiple assignment\nlet x = 1, y = 2, z = 3;\n\nconsole.log(name, age); // Alice 26`, tip: 'Default to const. Only use let when you know the value will change. Never use var in new code.' } },
          { id: 'js-datatypes', title: 'JS Data Types', content: { heading: 'JavaScript Data Types', body: `JavaScript variables can hold different types of data:\n\n**Primitive types:**\n- \`String\` — text: \`"hello"\`\n- \`Number\` — numbers: \`42\`, \`3.14\`\n- \`Boolean\` — true/false\n- \`null\` — intentional empty value\n- \`undefined\` — variable not assigned\n\n**Non-primitive:**\n- \`Object\` — \`{ key: value }\`\n- \`Array\` — \`[1, 2, 3]\`\n- \`Function\` — callable block of code`, example: `let name = "CodeHive";       // String\nlet score = 100;              // Number\nlet isActive = true;          // Boolean\nlet empty = null;             // Null\nlet notSet;                   // Undefined\n\nlet user = {                  // Object\n  name: "Alice",\n  age: 25\n};\n\nlet fruits = ["apple", "mango"]; // Array\n\nconsole.log(typeof name);    // "string"`, tip: 'typeof is your best friend for debugging — it tells you what type a variable holds at runtime.' } },
        ]
      },
      {
        title: 'JS Core Concepts',
        modules: [
          { id: 'js-functions', title: 'JS Functions', content: { heading: 'JavaScript Functions', body: `A JavaScript function is a block of code designed to perform a particular task. A function is executed when "something" invokes (calls) it.\n\n**Ways to define functions:**\n1. Function declaration\n2. Function expression\n3. Arrow function (modern, preferred)\n\nFunctions can accept parameters and return values.`, example: `// 1. Function declaration\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\n// 2. Function expression\nconst square = function(x) {\n  return x * x;\n};\n\n// 3. Arrow function (modern)\nconst add = (a, b) => a + b;\n\n// Calling functions\nconsole.log(greet("Alice"));  // Hello, Alice!\nconsole.log(add(3, 5));       // 8`, tip: 'Arrow functions are shorter and handle "this" differently. Prefer them for callbacks and short functions.' } },
          { id: 'js-arrays', title: 'JS Arrays', content: { heading: 'JavaScript Arrays', body: `Arrays are used to store multiple values in a single variable.\n\n**Essential array methods:**\n- \`push()\` / \`pop()\` — add/remove from end\n- \`unshift()\` / \`shift()\` — add/remove from start\n- \`map()\` — transform each element\n- \`filter()\` — keep elements that pass a test\n- \`find()\` — get first matching element\n- \`forEach()\` — loop over elements\n- \`includes()\` — check if value exists`, example: `const fruits = ["apple", "mango", "banana"];\n\n// Add/remove\nfruits.push("grape");     // add to end\nfruits.pop();             // remove from end\n\n// Transform\nconst upper = fruits.map(f => f.toUpperCase());\n// ["APPLE", "MANGO", "BANANA"]\n\n// Filter\nconst long = fruits.filter(f => f.length > 5);\n// ["banana"]\n\n// Find\nconst found = fruits.find(f => f === "mango");`, tip: '.map(), .filter(), and .find() are the holy trinity of array methods. Master these and you are ready for React.' } },
          { id: 'js-objects', title: 'JS Objects', content: { heading: 'JavaScript Objects', body: `JavaScript objects are containers for named values called properties and methods.\n\nObjects are defined with curly braces \`{}\`. Properties are \`key: value\` pairs.\n\n**Accessing properties:**\n- Dot notation: \`obj.name\`\n- Bracket notation: \`obj["name"]\`\n\nObjects can have methods (functions as values).`, example: `const user = {\n  name: "Alice",\n  age: 25,\n  isActive: true,\n  greet() {\n    return "Hi, I'm " + this.name;\n  }\n};\n\n// Access\nconsole.log(user.name);        // Alice\nconsole.log(user["age"]);      // 25\nconsole.log(user.greet());     // Hi, I'm Alice\n\n// Add property\nuser.email = "alice@mail.com";\n\n// Destructure\nconst { name, age } = user;`, tip: 'Destructuring ({name, age} = user) is used everywhere in modern JS and React. Get comfortable with it early.' } },
          { id: 'js-dom', title: 'JS DOM', content: { heading: 'JavaScript DOM', body: `The DOM (Document Object Model) is a programming interface for web documents. It represents the page so programs can change the document structure, style, and content.\n\n**Selecting elements:**\n- \`getElementById()\`\n- \`querySelector()\` — CSS selector, first match\n- \`querySelectorAll()\` — all matches\n\n**Modifying elements:**\n- \`innerHTML\` — set HTML content\n- \`textContent\` — set text\n- \`style.property\` — inline styles\n- \`classList.add/remove/toggle\` — classes`, example: `// Select elements\nconst btn = document.querySelector("#myBtn");\nconst items = document.querySelectorAll(".item");\n\n// Modify\ndocument.getElementById("title").textContent = "New Title";\n\n// Change style\nbtn.style.backgroundColor = "blue";\n\n// Toggle class\nbtn.classList.toggle("active");\n\n// Listen for events\nbtn.addEventListener("click", () => {\n  alert("Button clicked!");\n});`, tip: 'querySelector uses CSS selectors — so you can target anything: "#id", ".class", "input[type=text]" etc.' } },
          { id: 'js-events', title: 'JS Events', content: { heading: 'JavaScript Events', body: `HTML events are "things" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can "react" on these events.\n\n**Common events:**\n- \`click\` — element clicked\n- \`submit\` — form submitted\n- \`input\` / \`change\` — form value changes\n- \`keydown\` / \`keyup\` — keyboard\n- \`mouseover\` / \`mouseout\` — mouse hover\n- \`load\` — page/resource loaded\n- \`DOMContentLoaded\` — DOM ready`, example: `// Click event\ndocument.querySelector("button")\n  .addEventListener("click", function(e) {\n    console.log("Clicked!", e.target);\n  });\n\n// Form submit\ndocument.querySelector("form")\n  .addEventListener("submit", (e) => {\n    e.preventDefault(); // stop page reload\n    const name = e.target.elements.name.value;\n    console.log("Submitted:", name);\n  });\n\n// Keyboard\ndocument.addEventListener("keydown", (e) => {\n  if (e.key === "Escape") closeModal();\n});`, tip: 'Always use addEventListener — never the old onclick="..." HTML attribute. It keeps code clean and allows multiple handlers.' } },
          { id: 'js-fetch', title: 'JS Fetch API', content: { heading: 'JavaScript Fetch API', body: `The Fetch API provides an interface for fetching resources (including across the network). It is the modern way to make HTTP requests from JavaScript.\n\n**Async/Await** makes asynchronous code look synchronous and much easier to read.\n\nFetch returns a **Promise** which resolves to a Response object.`, example: `// Basic GET request\nasync function getUsers() {\n  try {\n    const response = await fetch("https://api.github.com/users");\n    \n    if (!response.ok) {\n      throw new Error("Network error: " + response.status);\n    }\n    \n    const data = await response.json();\n    console.log(data);\n    return data;\n  } catch (error) {\n    console.error("Error:", error);\n  }\n}\n\n// POST request\nasync function createUser(userData) {\n  const res = await fetch("/api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(userData),\n  });\n  return res.json();\n}`, tip: 'Always wrap fetch in try/catch with async/await. APIs can fail — always handle errors gracefully.' } },
        ]
      },
    ]
  }
};

/* ───────────────────────────── HELPERS ───────────────────────────── */
const getAllModules = (sections) => sections.flatMap(s => s.modules);

const parseBody = (text) =>
  text.split('\n').map((line, i) => {
    const boldLine = line.replace(/\*\*(.+?)\*\*/g, (_, m) => `<strong>${m}</strong>`);
    const codeLine = boldLine.replace(/`([^`]+)`/g, (_, m) => `<code>${m}</code>`);
    if (!line.trim()) return null;
    if (line.startsWith('- ')) return <li key={i} dangerouslySetInnerHTML={{ __html: codeLine.slice(2) }} />;
    return <p key={i} dangerouslySetInnerHTML={{ __html: codeLine }} />;
  }).filter(Boolean);

/* ───────────────────────────── COMPONENT ───────────────────────────── */
const Learn = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const course = curriculum[lang?.toLowerCase()];
  const storageKey = `codehive_progress_${lang}`;

  const firstModuleId = course ? getAllModules(course.sections)[0]?.id : null;

  const [completed, setCompleted] = useState(() => {
    if (!user || !course) return {};
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  });
  const [activeId, setActiveId] = useState(firstModuleId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(() =>
    course ? Object.fromEntries(course.sections.map(s => [s.title, true])) : {}
  );

  if (!course) {
    return (
      <div className="learn-not-found">
        <h2>Course not found</h2>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const allModules = getAllModules(course.sections);
  const activeModule = allModules.find(m => m.id === activeId);
  const activeIndex = allModules.findIndex(m => m.id === activeId);
  const totalModules = allModules.length;
  const completedCount = Object.keys(completed).filter(k => completed[k]).length;
  const progressPct = Math.round((completedCount / totalModules) * 100);

  const markComplete = (id) => {
    if (!user) return;
    const updated = { ...completed, [id]: true };
    setCompleted(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const goNext = () => {
    if (activeIndex < allModules.length - 1) {
      markComplete(activeId);
      setActiveId(allModules[activeIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setActiveId(allModules[activeIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  const toggleSection = (title) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="learn-page page-enter">

      {/* Top Bar */}
      <div className="learn-topbar" style={{ borderBottom: `3px solid ${course.color}` }}>
        <div className="learn-topbar-inner">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(s => !s)}>
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>
          <Link to="/" className="topbar-back">
            <FontAwesomeIcon icon={faArrowLeft} /> Home
          </Link>
          <div className="topbar-title">
            <img src={course.img} alt={course.title} className="topbar-lang-icon" />
            <span>{course.title} Tutorial</span>
          </div>
          <div className="topbar-progress">
            <span className="progress-text">{completedCount}/{totalModules}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPct}%`, background: course.color }} />
            </div>
            <span className="progress-pct">{progressPct}%</span>
          </div>
        </div>
      </div>

      <div className="learn-body">
        {/* Sidebar */}
        <aside className={`learn-sidebar ${sidebarOpen ? 'open' : ''}`}>
          {/* Mini Progress */}
          <div className="sidebar-progress-box" style={{ background: course.lightColor }}>
            <div className="sp-header">
              <FontAwesomeIcon icon={faFire} style={{ color: course.color }} />
              <span>Your Progress</span>
              {!user && <span className="sp-lock"><FontAwesomeIcon icon={faLock} /> Sign in to save</span>}
            </div>
            <div className="sp-bar-wrap">
              <div className="sp-bar">
                <div className="sp-fill" style={{ width: `${progressPct}%`, background: course.color }} />
              </div>
              <span className="sp-count">{completedCount} of {totalModules} done</span>
            </div>
          </div>

          {/* Section list */}
          <nav className="sidebar-nav">
            {course.sections.map(section => (
              <div className="nav-section" key={section.title}>
                <button className="nav-section-title" onClick={() => toggleSection(section.title)}>
                  <span>{section.title}</span>
                  <FontAwesomeIcon icon={expandedSections[section.title] ? faChevronDown : faChevronRight} />
                </button>
                {expandedSections[section.title] && (
                  <ul className="nav-section-items">
                    {section.modules.map(mod => {
                      const isDone = !!completed[mod.id];
                      const isActive = mod.id === activeId;
                      return (
                        <li key={mod.id}>
                          <button
                            className={`nav-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                            onClick={() => { setActiveId(mod.id); setSidebarOpen(false); }}
                          >
                            <FontAwesomeIcon
                              icon={isDone ? faCheckCircle : faCircle}
                              className={`nav-item-icon ${isDone ? 'done' : ''}`}
                            />
                            <span>{mod.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="learn-main">
          {activeModule && (
            <div className="module-content">
              {/* Trophy if all done */}
              {progressPct === 100 && (
                <div className="all-done-banner" style={{ background: course.lightColor, borderColor: course.color }}>
                  <FontAwesomeIcon icon={faTrophy} style={{ color: course.color }} />
                  <span>You've completed all <strong>{course.title}</strong> modules! 🎉</span>
                </div>
              )}

              {/* Module header */}
              <div className="module-header">
                <div className="module-breadcrumb">
                  <span style={{ color: course.color }}>{course.title}</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                  <span>{activeModule.title}</span>
                </div>
                <h1 className="module-title">{activeModule.content.heading}</h1>
                <div className="module-meta">
                  <FontAwesomeIcon icon={faBookOpen} />
                  <span>Module {activeIndex + 1} of {totalModules}</span>
                  {completed[activeId] && (
                    <span className="done-badge">
                      <FontAwesomeIcon icon={faCheckCircle} /> Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Body text */}
              <div className="module-body">
                <ul className="body-text">
                  {parseBody(activeModule.content.body)}
                </ul>
              </div>

              {/* Code example */}
              {activeModule.content.example && (
                <div className="code-block">
                  <div className="code-block-header">
                    <span className="code-label">Example</span>
                    <button className="copy-btn" onClick={() => {
                      navigator.clipboard.writeText(activeModule.content.example);
                    }}>Copy</button>
                  </div>
                  <pre><code>{activeModule.content.example}</code></pre>
                </div>
              )}

              {/* Tip */}
              {activeModule.content.tip && (
                <div className="tip-box" style={{ borderColor: course.color, background: course.lightColor }}>
                  <strong style={{ color: course.color }}>💡 Pro Tip</strong>
                  <p>{activeModule.content.tip}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="module-nav">
                <button
                  className="btn btn-outline"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                >
                  <FontAwesomeIcon icon={faArrowLeft} /> Previous
                </button>

                {!user ? (
                  <div className="save-progress-nudge">
                    <FontAwesomeIcon icon={faLock} />
                    <Link to="/login">Log in</Link> to save progress
                  </div>
                ) : !completed[activeId] ? (
                  <button
                    className="btn mark-done-btn"
                    style={{ background: course.color, color: course.color === '#f7df1e' ? '#1a1a1a' : 'white' }}
                    onClick={() => markComplete(activeId)}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} /> Mark Complete
                  </button>
                ) : (
                  <span className="already-done">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: course.color }} /> Done
                  </span>
                )}

                <button
                  className="btn btn-primary"
                  onClick={goNext}
                  disabled={activeIndex === allModules.length - 1}
                >
                  Next <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Learn;
