import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";  // ✅ Import Navbar

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />   {/* ✅ Always visible */}
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />   {/* ✅ explicit login route */}
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<Login />} />        {/* optional: catch-all */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
