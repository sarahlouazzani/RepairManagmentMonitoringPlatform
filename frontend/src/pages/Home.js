import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to PGSR System</h1>
        <p className="home-subtitle">
          Device and Ticket Management System with Workflow Tracking
        </p>
        
        <div className="home-actions">
          {isAuthenticated ? (
            <>
              <Link to="/devices" className="btn btn-primary btn-lg">
                Manage Devices
              </Link>
              <Link to="/tickets" className="btn btn-secondary btn-lg">
                View Tickets
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-lg">
                Login
              </Link>
              <Link to="/signup" className="btn btn-secondary btn-lg">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <h3>Device Management</h3>
          <p>Track and manage all your devices with detailed information and serial numbers.</p>
        </div>
        <div className="feature-card">
          <h3>Ticket System</h3>
          <p>Create and manage support tickets for devices with status tracking.</p>
        </div>
        <div className="feature-card">
          <h3>Workflow Tracking</h3>
          <p>Monitor ticket progress with comprehensive workflow history and comments.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
