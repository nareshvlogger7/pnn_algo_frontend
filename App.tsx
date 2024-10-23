import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Dashboard from './Dashboard';
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;