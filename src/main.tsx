import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Diagnostic Console Interception
const originalLog = console.log;
const originalError = console.error;
(window as any).__debugLogs = [];

console.log = (...args) => {
  (window as any).__debugLogs.push({ type: 'log', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), time: new Date().toLocaleTimeString() });
  originalLog.apply(console, args);
};

console.error = (...args) => {
  (window as any).__debugLogs.push({ type: 'error', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), time: new Date().toLocaleTimeString() });
  originalError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
