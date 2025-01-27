import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Toaster} from 'react-hot-toast';
import { AuthContextProvider } from './context/authcontext.jsx'


createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <BrowserRouter>
    <Toaster
      position="top-center" 
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
      }}
    />
    <App />
  </BrowserRouter>
</AuthContextProvider>
)
