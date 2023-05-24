import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import OrangtuaRead from './components/crud/orangtua/orangtua-read';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/orangtua-read" element={<OrangtuaRead />} />
      </Routes>
    </Router>
  );
}

export default App;