import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import Login from "./pages/login";
import User from "./pages/user";
import HomeScreen from "./pages/Index";
import DashboardPage from "./pages/Dashboard";

function App() {
  function ProtectedRoute({ children }) {
    const userLogin = localStorage.getItem("userLogin");

    if (!userLogin) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }

  return (
    <Router>
      {/* NAVBAR */}

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
