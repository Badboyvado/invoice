Invoice Management App 

Complete Developer Documentation & README 

  React  ·  LocalStorage 

# What Was Built 

This is a fully functional Invoice Management Application built entirely with React — a JavaScript library for building user interfaces. It runs entirely in the browser with no backend server required. All invoice data is saved in your browser's localStorage, which means the data persists even when you close and reopen the browser tab. 

# Live Demo
 https://invoice-orpin-rho.vercel.app/

# Perview
<p align="center">
[!\[alt text\](image.png)](https://github.com/user-attachments/assets/94dbede7-61c3-4db2-a384-e57170ce336f)
</p>

Here is a summary of every feature that was implemented: 


## Feature 
    What it does 
- *Create Invoice*-
	Open a form, fill in client details, add line items, save as Draft or send as Pending 
- *View Invoices*-
	See all invoices in a list with status badges, client names, due dates and totals 
- *Invoice Detail*-
	Click any invoice to see its full breakdown including all line items and addresses 
- *Edit Invoice* -
	Reopen the form pre-filled with existing data and save changes 
- *Delete Invoice*-
	Remove an invoice after confirming in a popup modal 
- *Draft Saving*-
	Save incomplete invoices as drafts to finish later 
- *Mark as Paid*-
	Change a Pending invoice to Paid with one click 
- *Filter by Status*-
	Show only Draft, Pending, or Paid invoices using a dropdown filter 
- *Light / Dark Mode*-
	Toggle between a light and dark colour theme, saved across sessions 
- *Responsive Layout*-
	Works on mobile phones (320px), tablets (768px) and desktops (1024px+) 
- *Form Validation*-
	Prevents saving invalid forms — highlights errors with red borders and messages 
- *Keyboard & Accessibility*-
	Fully navigable by keyboard, screen reader labels, ESC closes modals 

 
## Setup Instructions 

Follow these steps carefully. Each step builds on the last. This should take about 10–15 minutes on a fresh computer. 

Step 1 — Install Node.js 

Node.js is a program that lets you run JavaScript on your computer (outside the browser). React needs it to compile and run your project locally. 

    Go to https://nodejs.org 

    Download the "LTS" version (Long Term Support — the stable one) 

    Run the installer and follow the prompts 

    When it asks about PATH, leave the default options checked 

To check it installed correctly, open your terminal (Command Prompt on Windows, Terminal on Mac) and run: 

node --version 

npm --version 

You should see version numbers printed (e.g. v20.11.0 and 10.2.4). If you see an error, restart your computer and try again. 

Step 2 — Create a New React Project 

Vite is the tool we use to create and run a React project. It sets up everything you need automatically. 

In your terminal, navigate to wherever you keep your coding projects (e.g. your Desktop or a Projects folder), then run: 

npm create vite@latest invoice-app -- --template react 

cd invoice-app 

npm install 

What these commands do: 

Line 1 creates a new React project in a folder called invoice-app. Line 2 moves into that folder. Line 3 installs all the libraries the project needs. 


Step 3 — Replace the App File 

    Open the invoice-app folder in VS Code (or any code editor) 

    Find the file at: src/App.jsx 

    Delete everything inside it 

    Paste the entire InvoiceApp.jsx code you were given into src/App.jsx 

    Save the file 

Step 4 — Start the Development Server 

Run this command in your terminal (make sure you are inside the invoice-app folder): 

npm run dev 

You will see output like: 

  VITE v5.x.x  ready in 300ms 

  ➜  Local:   http://localhost:5173/ 

Open your browser and go to http://localhost:5173 — you should see the invoice app running! 

Tip: 

The dev server hot-reloads automatically. Every time you save a change to your code, the browser updates instantly without you needing to refresh. 

 
Step 5 — Build for Production (Deployment) 

When you are ready to deploy to Vercel, Netlify, or another host: 

npm run build 

This creates a dist/ folder containing your compiled, minified app ready for hosting. 


## Deploying to Vercel (Recommended) 

 * Push your project to a GitHub repository 
 * Go to vercel.com and sign up / log in with your GitHub account 
 * Click New Project and select your invoice-app repository 
 * Leave all settings as default — Vercel auto-detects Vite projects 
 * Click Deploy and wait about 60 seconds 
 * Vercel gives you a live URL like: https://invoice-orpin-rho.vercel.app/

 
## Architecture Explanation 
 Architecture means how the code is structured — how the different pieces are organised and how they communicate with each other. Here is a plain-English explanation of every major piece. 

 
## The Big Picture 
 The entire app lives in one file: App.jsx. This was a deliberate choice to keep things simple for a first project. In a larger production app you would split these into separate files, but having everything in one place makes it much easier to understand what is happening. 
 The app is built from React components. A component is just a JavaScript function that returns HTML (called JSX). Components are like Lego bricks — you build small pieces and snap them together to make the full app. 

## Component Tree — How Components Are Nested 
 This is how all the components relate to each other: 

 App  (root — owns all data and state) 
├── Nav  (top/side navigation bar with theme toggle) 
├── InvoiceList  (the main list view) 
│   ├── Filter dropdown 
│   └── InvoiceCard × N (one card per invoice) 
├── InvoiceDetail  (single invoice view) 
│   ├── Badge  (status pill) 
│   ├── Items table 
│   └── DeleteModal  (confirmation popup) 
└── InvoiceForm  (create / edit drawer) 
└── Field components  (reusable input + label + error) 

 
## Key concept — Data flows DOWN: 
 In React, data (called props) flows from parent to child. App holds the invoices array and passes individual invoices down to InvoiceList, InvoiceDetail, and InvoiceForm. Children cannot directly change parent data — they call functions (callbacks) passed down from the parent to request changes. 

## State Management 
 State is data that can change over time and causes the UI to update when it does. This app manages state in one central place — the App component — using React's useState hook. 

## State Variable 
	What it stores 
- *invoices*-
	The full array of all invoice objects 
- *view*-
	Which screen is showing: 'list' or 'detail' 
- *selectedInvoice*-
	The invoice the user clicked on to view 
- *formState*-
	Whether the form drawer is open and which invoice is being edited (null = closed) 
- *theme*-
	The current colour theme: 'light' or 'dark' 

##  Data Persistence — localStorage 
    Every time the invoices array changes, the app saves it to localStorage using this pattern: 
// Whenever invoices updates, save to localStorage: 

useEffect(() => { 

  localStorage.setItem('invoiceapp_invoices_v1', JSON.stringify(invoices)); 

}, [invoices]); 

// When the app first loads, read from localStorage: 

const [invoices, setInvoices] = useState(loadInvoices); 

localStorage stores data as text (strings), so I use JSON.stringify() to convert the JavaScript array into text when saving, and JSON.parse() to convert it back when loading. 

## Invoice Data Structure 

Each invoice in the array is a JavaScript object with this shape: 

{ 

  id: "RT3080",              // Auto-generated e.g. "AB1234" 

  status: "pending",         // "draft" | "pending" | "paid" 

  createdAt: "2024-01-15",   // ISO date string YYYY-MM-DD 

  dueDate: "2024-01-22",     // createdAt + paymentTerms days 

  paymentTerms: 7,           // 1 | 7 | 14 | 30 

  clientName: "Alex Grim", 

  clientEmail: "alex@mail.com", 

  clientAddress: { 

    street: "84 Church Way", 

    city: "Bradford", 

    postCode: "BD1 9PB", 

    country: "United Kingdom" 

  }, 

  senderAddress: { ... },    // Same shape as clientAddress 

  description: "Graphic Design", 

  items: [ 

    { 

      name: "Banner Design", 

      quantity: 1, 

      price: 156.00 

    } 

  ] 

} 

## The Form & Validation 

The invoice form uses controlled inputs — every keystroke updates a form state object, and the input's value is always driven from that state. This gives React full control over the form data at all times. 

Validation runs when the user tries to submit. It checks: 

    Required text fields (client name, description, all address fields) — must not be empty 

    Email — must match a basic email pattern using a regular expression 

    Items list — must contain at least one item 

    Item quantities — must be positive numbers greater than zero 

    Item prices — must be zero or positive numbers 

Errors are stored in an errors object keyed by field name. Each field checks if its own key is in the errors object and applies a red border + message if so. Submission is blocked until all errors are resolved. 

# Trade-offs 
  Every technical decision involves a trade-off between competing priorities: simplicity vs scalability, speed vs robustness, flexibility vs consistency. Here are the key decisions made in this project and the reasoning behind each. 

## Single-File Architecture 
 *Decision*: All code lives in one App.jsx file 
 *Trade-off*: Easier to read and understand as a beginner, but harder to maintain at scale. 

 A production app would split each component into its own file (e.g. components/InvoiceCard.jsx, components/InvoiceForm.jsx, etc.) and use an index.js barrel export. This makes it easier to find specific code in large projects and enables better code splitting for performance. 
 
 For a first React app and a task submission, keeping everything in one file makes it much easier to read the entire codebase top-to-bottom and understand how all the pieces connect. 

## localStorage vs a Real Backend 
 *Decision*: localStorage for data persistence instead of a Node/Express or Next.js API 
 *Trade-off*: Zero setup cost, but data is per-device, per-browser, and limited to ~5MB. 

 localStorage was chosen because it requires no server, no database setup, no environment variables, and no deployment configuration. The app is fully self-contained and works offline. The trade-offs are: 

    Data does not sync across devices or browsers 

    Clearing browser storage wipes all invoices 

    Cannot be used by multiple users simultaneously 

    5MB storage limit (roughly thousands of invoices — not a real concern for this project) 

For a real product you would use a database (PostgreSQL, MongoDB) accessed via a REST API or GraphQL endpoint. 

## No External Component Library 
 *Decision*: All UI components are hand-coded — no Tailwind, MUI, shadcn/ui, etc. 

 *Trade-off*: Full design control and no dependency overhead, but more CSS to write and maintain. 

 Using a component library like Material UI or shadcn/ui would speed up development significantly, but would also make it harder to precisely match the provided Figma design. Writing custom CSS with CSS custom properties (variables) gives complete control over every pixel while keeping the bundle size small. 

## No URL-based Routing 
 *Decision*: View switching is handled with a 'view' state variable instead of React Router 
 *Trade-off*: Simpler code, but the URL does not change when navigating, so browser back/forward do not work. 
 
 React Router is the standard library for handling navigation in React apps. It maps URL paths (like /invoices/RT3080) to specific components. Not using it means the browser's back button does not navigate between the list and detail views. For a production app this would be a significant usability problem, but for a task submission with a small number of views it keeps the code substantially simpler. 

## Inline Styles vs CSS Modules vs Styled Components 
 *Decision*: A single <style> tag with CSS custom    properties injected into the component.
 *Trade-off*: Fast to write and self-contained, but not how styles are typically organised in production. 

 In production React apps, styles are handled via CSS Modules (App.module.css), Tailwind CSS utility classes, or CSS-in-JS libraries like styled-components or Emotion. The approach used here — injecting a style string — works well for a self-contained artifact but would not scale to a large multi-file project. The benefit is that the entire visual design is visible in one place. 

## Accessibility Notes 
 Accessibility (often abbreviated as a11y) means making your app usable by people with disabilities — including those who use screen readers, cannot use a mouse, have low vision, or rely on keyboard navigation. The following practices were implemented throughout the app. 

## Semantic HTML 
 Semantic HTML means using the right element for the right purpose. Screen readers and assistive technologies use the element type to understand what they are reading. 

## Element used 
	Why it matters 
 <nav>: Screen readers announce it as a navigation landmark, helping users jump to it directly.
 <main>: Identifies the primary content area — users can skip to it bypassing the nav. 
 <ul> and <li>: Invoice cards are wrapped in a proper list so screen readers announce 'list of N items' 
 <button>: All clickable controls use <button> (not <div> or <span>), giving them keyboard focus and Enter/Space activation for free 
 <label>: Every form input has a <label> with a matching htmlFor attribute — clicking the label focuses the input 
 role='dialog': The form drawer and delete modal are marked as dialogs so screen readers announce them correctly 
 aria-modal='true': Tells screen readers the modal is the active region and content behind it is inert(unmoving content).

## Keyboard Navigation 

    All buttons and interactive elements are focusable with the Tab key 

    Invoice cards can be activated with the Enter key (via onKeyDown handler) 

    Filter checkboxes respond to Space bar to toggle 

    Pressing ESC closes both the form drawer and the delete confirmation modal 

    Focus order follows a logical visual order (top to bottom, left to right) 

## ARIA Labels 
 ARIA (Accessible Rich Internet Applications) attributes add context that is not visible on screen but is announced by screen readers: 

    aria-label='New invoice' — describes the New Invoice button in full 

    aria-label='Edit invoice' — describes the Edit button context 

    aria-expanded={filterOpen} — announces whether the filter dropdown is open or closed 

    aria-checked on filter checkboxes — announces the checked state 

    aria-label on the Back button — reads 'Go back' instead of the arrow icon 

    role='status' on the empty state — announces when no invoices match the filter 

## Colour Contrast 
 Both the light and dark themes were designed to meet WCAG AA standards (minimum 4.5:1 contrast ratio for normal text, 3:1 for large text): 

    Status badge text colours (#33D69F green, #FF8F00 amber, #373B53 dark) are tested against their respective background tints 

    The purple accent (#7C5DFA) is used on white/light backgrounds only — not as text on coloured backgrounds 

    Dark mode text (#FFFFFF, #DFE3FA) is tested against dark backgrounds (#141625, #1E2139) 

    Form error states use red (#EC5757) which meets contrast requirements on both white and dark input backgrounds 


## Focus Trapping in Modals 

When the delete confirmation modal is open, pressing Tab should cycle only through the modal's buttons (Cancel and Delete), not elements behind the modal. The modal uses aria-modal='true' which signals this to screen readers. For a production app you would additionally implement a JavaScript focus trap that intercepts Tab key events and keeps focus inside the modal. 

## Known Accessibility Limitations 
 Areas for improvement in a production version: 

    Focus is not programmatically moved into the form drawer when it opens — a screen reader user would not know the drawer appeared 

    Focus trap in modals are handled by aria-modal but not by a hard JS trap — some older screen readers may not respect aria-modal 

    Error messages are shown visually but not announced live — adding role='alert' or aria-live='polite' to error message containers would announce them to screen readers as they appear 

    Colour alone is not the only indicator of error state — red borders are combined with text messages — but the error message icons could be improved for better communication 


# Improvements Beyond Requirements 

 The following features and design decisions go beyond the minimum requirements listed in the brief. 
 
* Seed Data on First Load 
   When a user opens the app for the very first time (empty localStorage), three realistic sample invoices are automatically loaded — one in each status (paid, pending, draft). This prevents a blank empty state on first impression and immediately demonstrates all three status types and their visual presentation. 

* Animated Drawer and Page Transitions 
   The invoice form slides in from the left using a CSS keyframe animation (@keyframes slideIn). The invoice detail view fades in with a subtle upward translateY animation (@keyframes fadeIn). These micro-transitions make the app feel significantly more polished and help users understand spatial relationships — the form comes from the left, indicating it is a layer on top of the current view. 

* Auto-calculated Due Date 
   The due date field is never shown in the form — it is automatically calculated from the Invoice Date and Payment Terms fields. When you select Net 7 days and a date of 1st January, the due date becomes 8th January. This reduces user error and keeps the form simpler. 

* Persistent Theme Preference 
   The light/dark theme preference is saved in localStorage so it persists across page reloads and browser sessions. Most implementations do not persist the theme — the user has to toggle it again every time they visit. 

* Responsive Mobile Bottom Action Bar 
   On mobile screens, the invoice action buttons (Edit, Delete, Mark as Paid) that appear in the detail view header on desktop are hidden and replaced with a sticky bottom bar that stays fixed at the bottom of the screen. This follows native mobile app patterns where actions are thumb-reachable at the bottom of the screen, rather than requiring the user to scroll to the top. 

* Unique ID Generation 
   Invoice IDs are generated in the format used by the Figma design: two random uppercase letters followed by four digits (e.g. RT3080, XM9141). This is cosmetically meaningful — it matches the design reference exactly rather than using UUID strings or incremental numbers. 

* Smart Form State for Edit vs Create 
   The InvoiceForm component handles both creating new invoices and editing existing ones using the same component. When opened for editing, the entire form is pre-populated with the existing invoice's data. When saved, the component detects whether this is a new invoice (no matching ID in the array) or an update (existing ID) and handles the array mutation accordingly — either prepending a new invoice or replacing the existing one in place. 

* Status Badge Dot 
   Each status badge includes a coloured dot to the left of the label, implemented as a CSS ::before pseudo-element using currentColor. This means the dot is always the exact same colour as the badge text with zero additional HTML or inline styles. It also means if you change the badge text colour, the dot updates automatically. 

## Suggested Future Improvements 

These are features worth adding in a future iteration: 

    React Router integration — so the URL changes when viewing an invoice (e.g. /invoices/RT3080) enabling browser back/forward navigation and shareable links 

    Export to PDF — a print stylesheet or jsPDF integration to export individual invoices as professional PDFs 

    Search / filter by client name — a text input that filters the invoice list as you type 

    Sort invoices — by date, amount, or status, with a toggleable sort direction 

    IndexedDB storage — for larger data sets and more reliable storage than localStorage 

    Unit tests — React Testing Library tests for form validation logic and state transitions 

    Storybook — isolated component development environment for documenting and testing components individually 

    Toast notifications — brief non-modal confirmations (e.g. 'Invoice saved', 'Invoice deleted') using a library like react-hot-toast 

    Invoice numbering — sequential numbering (INV-0001, INV-0002) instead of random IDs for professional invoice tracking 
 

# React Concepts Explained for Beginners 
  Since this is your first React app, here is a plain-English explanation of the key concepts used throughout the code. 

    What is React? 
    
    React is a JavaScript library that makes it easier to build interactive user interfaces. Instead of manually updating the HTML when data changes (as you would with vanilla JavaScript), you describe what the UI should look like for a given state of data, and React handles updating the page automatically. 

## Components 
 A component is a JavaScript function that returns JSX — a syntax that looks like HTML but is actually JavaScript. Every piece of the UI is a component. 
 // This is a React component 
 function Badge({ status }) { 

  return <span className='badge'>{status}</span>; 

 } 

 // Using it: 

 <Badge status='paid' />

## useState — Making Things Interactive 

 useState is a React hook that creates a variable which, when changed, causes React to re-render the component with the new value. 

 const [count, setCount] = useState(0); 

// count = current value (0) 

// setCount = function to update it 

// useState(0) = initial value 

<button onClick={() => setCount(count + 1)}> 

  Clicked {count} times 

</button> 

## useEffect — Running Code on Changes 

 useEffect runs code after the component renders. The second argument is a dependency array — the effect re-runs whenever any of those values change. 

 // Runs once when the component first loads (empty array = no deps) 

 useEffect(() => { 

  console.log('App loaded'); 

 }, []); 

 // Runs every time 'invoices' changes 

 useEffect(() => { 

  localStorage.setItem('invoices', JSON.stringify(invoices)); 

 }, [invoices]); 

## Props — Passing Data Between Components 

 Props are arguments you pass to a component, similar to function parameters. They flow from parent to child. 

 // Parent passes data down: 

 <InvoiceCard invoice={inv} onSelect={selectInvoice} /> 

 

 // Child receives and uses it: 

 function InvoiceCard({ invoice, onSelect }) { 

  return ( 

    <div onClick={() => onSelect(invoice)}> 

      {invoice.clientName} 

    </div> 

  ); 

 } 

## CSS Custom Properties (Variables) 

 The app uses CSS custom properties (--purple, --bg, etc.) defined on :root. The dark mode theme overrides these same variables on [data-theme='dark'], so every component automatically gets the right colours without needing separate dark-mode CSS for each element. 

 :root { 

  --purple: #7C5DFA; 

  --bg: #F8F8FB; 

 } 

 

 [data-theme='dark'] { 

  --bg: #141625;  /* Override just the ones that change */ 

 } 

 /* Component just uses the variable — works in both themes: */ 

 background: var(--bg); 

 