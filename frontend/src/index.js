import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardPatient from './pages/patient/DashboardPatient';
import DashboardKine from './pages/kine/DashboardKine';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/patient" element={<DashboardPatient />} />
        <Route path="/kine" element={<DashboardKine />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
