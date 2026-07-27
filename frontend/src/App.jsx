import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Ticket, Scan, LayoutDashboard, Bus } from 'lucide-react';
import Passenger from './pages/Passenger';
import Conductor from './pages/Conductor';
import Admin from './pages/Admin';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <header>
        <div className="brand-badge">
          <Bus size={14} /> Indian Transit Tech
        </div>
        <h1>YatraQR System</h1>
        <p>Instant Bus Ticketing & Conductor QR Validator</p>
      </header>

      <nav className="nav-tabs">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive || location.pathname === '' ? 'nav-tab active' : 'nav-tab'}
        >
          <Ticket size={18} /> Passenger
        </NavLink>
        <NavLink 
          to="/conductor" 
          className={({ isActive }) => isActive ? 'nav-tab active' : 'nav-tab'}
        >
          <Scan size={18} /> Conductor
        </NavLink>
        <NavLink 
          to="/admin" 
          className={({ isActive }) => isActive ? 'nav-tab active' : 'nav-tab'}
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
      </nav>

      <main className="glass-card">
        <Routes>
          <Route path="/" element={<Passenger />} />
          <Route path="/conductor" element={<Conductor />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
