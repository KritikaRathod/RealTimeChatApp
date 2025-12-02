import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

export const serverurl = "http://localhost:8000";

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>   
 <App />
 </BrowserRouter>
 
  
)
