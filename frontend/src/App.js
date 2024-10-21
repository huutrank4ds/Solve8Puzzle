import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import ShowStepPage from './pages/ShowStepPage/ShowStepPage';
import SolvePage from './pages/SolvePage/SolvePage';

function App() {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />      {/* Home page */}
          <Route path="/showstep" element={<ShowStepPage />} /> {/* About page */}
          <Route path="/solve" element={<SolvePage />} />  {/* Solve page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
