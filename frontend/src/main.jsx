import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import  {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { Context } from './usecontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Context>
  <App />

  </Context>
  </BrowserRouter>


)
