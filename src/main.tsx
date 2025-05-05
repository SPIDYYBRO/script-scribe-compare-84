
// Polyfills for older browsers
import 'core-js/stable';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle browser compatibility for mounting
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');
createRoot(rootElement).render(<App />);
