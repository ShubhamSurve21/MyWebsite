import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DarkModeProvider } from './context/DarkModeContext'
import { AIAssistantProvider } from './context/AIAssistantContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <AIAssistantProvider>
        <App />
      </AIAssistantProvider>
    </DarkModeProvider>
  </React.StrictMode>,
)