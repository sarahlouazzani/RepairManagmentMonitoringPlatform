import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          PGSR System
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/devices" className="navbar-link">
                Devices
              </Link>
              <Link to="/tickets" className="navbar-link">
                Tickets
              </Link>
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
              <button onClick={logout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/signup" className="navbar-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
