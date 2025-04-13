import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './components/Home.jsx'

import WalrusData from './components/WalrusData.jsx'
import HeliumData from './components/HeliumData.jsx'
import AkashData from './components/AkashData.jsx'
import CompareData from './components/CompareData.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="walrus" element={<WalrusData />} />
          <Route path="helium" element={<HeliumData />} />
          <Route path="akash" element={<AkashData />} />
          <Route path="compare" element={<CompareData />} />
      
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
