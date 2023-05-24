import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import OrangTuaRead from './components/crud/orangtua/orangtua-read';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(isLoggedIn);
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/orangtua-read"
          element={isLoggedIn ? <OrangTuaRead /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/orangtua-read" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;