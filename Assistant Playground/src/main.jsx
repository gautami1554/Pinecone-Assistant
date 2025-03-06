import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
);
//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.jsx'
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Removing StrictMode temporarily
//createRoot(document.getElementById('root')).render(

  //<MuiThemeProvider>
    //<App />
  //</MuiThemeProvider>,
//);
