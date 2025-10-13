import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css"; // tailwindCss
import Home from './Pages/Home' // Home
import Login from './Pages/Login' // Login

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home /> */}
    <Login />
  </StrictMode>,
)
