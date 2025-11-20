import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-label">Username:</span>
            <span className="profile-value">{user.username}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{user.email}</span>
          </div>
        </div>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
