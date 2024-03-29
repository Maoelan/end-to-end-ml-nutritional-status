import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import Login from "./components/login";
import Dashboard from "./components/dashboard";
import OrangTuaRead from "./components/crud/orangtua/orangtua-read";
import OrangTuaCreate from "./components/crud/orangtua/orangtua-create";
import OrangTuaUpdate from "./components/crud/orangtua/orangtua-update";
import AnakRead from "./components/crud/anak/anak-read";
import AnakCreate from "./components/crud/anak/anak-create";
import AnakUpdate from "./components/crud/anak/anak-update";
import GiziRead from "./components/crud/gizi/gizi-read";
import GiziCreate from "./components/crud/gizi/gizi-create";
import GiziUpdate from "./components/crud/gizi/gizi-update";
import LabelCreate from "./components/crud/label/label-create";
import Trains from "./components/train/trains";
import Perbandingan from "./components/perbandingan/perbandingan";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(storedIsLoggedIn);
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    return <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <div className="login-wrapper">
                <Login setIsLoggedIn={setIsLoggedIn} />
              </div>
            )
          }
        />
        <Route
          path="/orangtua-read"
          element={
            isLoggedIn ? (
              <OrangTuaRead handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/orangtua-read" }}
              />
            )
          }
        />
        <Route
          path="/orangtua-create"
          element={
            isLoggedIn ? (
              <OrangTuaCreate handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/orangtua-create" }}
              />
            )
          }
        />
        <Route
          path="/orangtua-update/:id"
          element={
            isLoggedIn ? (
              <OrangTuaUpdate handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/orangtua-update/:id" }}
              />
            )
          }
        />

        <Route
          path="/anak-read"
          element={
            isLoggedIn ? (
              <AnakRead handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/anak-read" }}
              />
            )
          }
        />

        <Route
          path="/anak-create"
          element={
            isLoggedIn ? (
              <AnakCreate handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/anak-create" }}
              />
            )
          }
        />
        <Route
          path="/anak-update/:id"
          element={
            isLoggedIn ? (
              <AnakUpdate handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/anak-update/:id" }}
              />
            )
          }
        />

        <Route
          path="/gizi-read"
          element={
            isLoggedIn ? (
              <GiziRead handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/gizi-read" }}
              />
            )
          }
        />
        <Route
          path="/gizi-create"
          element={
            isLoggedIn ? (
              <GiziCreate handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/gizi-create" }}
              />
            )
          }
        />
        <Route
          path="/gizi-update/:id"
          element={
            isLoggedIn ? (
              <GiziUpdate handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/gizi-update/:id" }}
              />
            )
          }
        />
        <Route
          path="/label-create"
          element={
            isLoggedIn ? (
              <LabelCreate handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/label-create" }}
              />
            )
          }
        />
        <Route
          path="/train"
          element={
            isLoggedIn ? (
              <Trains handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace={true} state={{ from: "/train" }} />
            )
          }
        />
        <Route
          path="/perbandingan"
          element={
            isLoggedIn ? (
              <Perbandingan handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/perbandingan" }}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard handleLogout={handleLogout} />
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: "/dashboard" }}
              />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
