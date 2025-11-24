import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./app.css";
import Login from "./pages/Login";
import User from "./pages/user";
import HomeScreen from "./pages/Index";
import DashboardPage from "./pages/Dashboard";
import StockIn from "./pages/Stockin";
import StockOut from "./pages/StockOut"; 

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
        <Route path="/stockin" element={<StockIn />} />
        <Route path="/stockout" element={<StockOut />} />
      </Routes>
    </Router>
  );
}

export default App;