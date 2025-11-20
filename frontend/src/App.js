import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/Layout/Navbar';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

// Device Components
import DeviceList from './components/Device/DeviceList';
import DeviceForm from './components/Device/DeviceForm';
import DeviceDetail from './components/Device/DeviceDetail';

// Ticket Components
import TicketList from './components/Ticket/TicketList';
import TicketForm from './components/Ticket/TicketForm';
import TicketDetail from './components/Ticket/TicketDetail';

// Workflow Components
import WorkflowForm from './components/Workflow/WorkflowForm';

// Auth Components
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes - Devices */}
          <Route
            path="/devices"
            element={
              <ProtectedRoute>
                <DeviceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices/new"
            element={
              <ProtectedRoute>
                <DeviceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices/edit/:id"
            element={
              <ProtectedRoute>
                <DeviceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices/:id"
            element={
              <ProtectedRoute>
                <DeviceDetail />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Tickets */}
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <TicketList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/new"
            element={
              <ProtectedRoute>
                <TicketForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/edit/:id"
            element={
              <ProtectedRoute>
                <TicketForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <ProtectedRoute>
                <TicketDetail />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Workflows */}
          <Route
            path="/workflows/new/:ticketId"
            element={
              <ProtectedRoute>
                <WorkflowForm />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
