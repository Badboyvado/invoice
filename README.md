Invoice Management App
Complete Developer Documentation & README
Stage 2 Frontend Track  ·  React  ·  LocalStorage


What Was Built
This is a fully functional Invoice Management Application built entirely with React — a JavaScript library for building user interfaces. It runs entirely in the browser with no backend server required. All invoice data is saved in your browser's localStorage, which means the data persists even when you close and reopen the browser tab.

Here is a summary of every feature that was implemented:

Feature	What it does
Create Invoice	Open a form, fill in client details, add line items, save as Draft or send as Pending
View Invoices	See all invoices in a list with status badges, client names, due dates and totals
Invoice Detail	Click any invoice to see its full breakdown including all line items and addresses
Edit Invoice	Reopen the form pre-filled with existing data and save changes
Delete Invoice	Remove an invoice after confirming in a popup modal
Draft Saving	Save incomplete invoices as drafts to finish later
Mark as Paid	Change a Pending invoice to Paid with one click
Filter by Status	Show only Draft, Pending, or Paid invoices using a dropdown filter
Light / Dark Mode	Toggle between a light and dark colour theme, saved across sessions
Responsive Layout	Works on mobile phones (320px), tablets (768px) and desktops (1024px+)
Form Validation	Prevents saving invalid forms — highlights errors with red borders and messages
Keyboard & Accessibility	Fully navigable by keyboard, screen reader labels, ESC closes modals


Architecture Explanation
Architecture means how the code is structured — how the different pieces are organised and how they communicate with each other. Here is a plain-English explanation of every major piece.

The Big Picture
The entire app lives in one file: App.jsx. This was a deliberate choice to keep things simple for a first project. In a larger production app you would split these into separate files, but having everything in one place makes it much easier to understand what is happening.

The app is built from React components. A component is just a JavaScript function that returns HTML (called JSX). Components are like Lego bricks — you build small pieces and snap them together to make the full app.

State Management
State is data that can change over time and causes the UI to update when it does. This app manages state in one central place — the App component — using React's useState hook.

State Variable	What it stores
invoices	The full array of all invoice objects
view	Which screen is showing: 'list' or 'detail'
selectedInvoice	The invoice the user clicked on to view
formState	Whether the form drawer is open and which invoice is being edited (null = closed)
theme	The current colour theme: 'light' or 'dark'

The Form & Validation
The invoice form uses controlled inputs — every keystroke updates a form state object, and the input's value is always driven from that state. This gives React full control over the form data at all times.

Validation runs when the user tries to submit. It checks:
⦁	Required text fields (client name, description, all address fields) — must not be empty
⦁	Email — must match a basic email pattern using a regular expression
⦁	Items list — must contain at least one item
⦁	Item quantities — must be positive numbers greater than zero
⦁	Item prices — must be zero or positive numbers

Errors are stored in an errors object keyed by field name. Each field checks if its own key is in the errors object and applies a red border + message if so. Submission is blocked until all errors are resolved.
