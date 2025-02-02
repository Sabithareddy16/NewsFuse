// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import VerifyOTP from './pages/VerifyOTP';
import NewsByCategory from './pages/NewsByCategory';
// import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/news/:category" element={<NewsByCategory />} />
          {/* <Route path="/search" element={<SearchResults />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;