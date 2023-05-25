import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import OrangTuaRead from './components/crud/orangtua/orangtua-read';
import OrangTuaCreate from './components/crud/orangtua/orangtua-create';
import OrangTuaUpdate from './components/crud/orangtua/orangtua-update';
import './components/css/login.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(storedIsLoggedIn);
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/orangtua-read" /> : <div className="login-wrapper"><Login setIsLoggedIn={setIsLoggedIn} /></div>}
        />
        <Route
          path="/orangtua-read"
          element={
            isLoggedIn ? (
              <OrangTuaRead handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace={true} state={{ from: '/orangtua-read' }} />
            )
          }
        />
        <Route
          path="/orangtua-create"
          element={
            isLoggedIn ? (
              <OrangTuaCreate handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace={true} state={{ from: '/orangtua-create' }} />
            )
          }
        />
        <Route
          path="/orangtua-update/:id"
          element={
            isLoggedIn ? (
              <OrangTuaUpdate handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace={true} state={{ from: '/orangtua-update/:id' }} />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;