import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import OrangTuaRead from './components/crud/orangtua/orangtua-read';

function App() {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/orangtua-read"
          element={isAuthenticated ? <OrangTuaRead /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/orangtua-read" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;