import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DEVICES } from '../../utils/graphqlQueries';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './DeviceList.css';

const DeviceList = () => {
  const { loading, error, data, refetch } = useQuery(GET_DEVICES);

  if (loading) return <div className="loading">Loading devices...</div>;
  if (error) {
    toast.error('Failed to load devices');
    return <div className="error">Error loading devices: {error.message}</div>;
  }

  return (
    <div className="device-list-container">
      <div className="list-header">
        <h2>Devices</h2>
        <Link to="/devices/new" className="btn btn-primary">
          Add New Device
        </Link>
      </div>

      {data.devices.length === 0 ? (
        <div className="empty-state">
          <p>No devices found. Create your first device!</p>
        </div>
      ) : (
        <div className="device-grid">
          {data.devices.map((device) => (
            <div key={device.id} className="device-card">
              <h3>{device.name}</h3>
              <p className="device-model"><strong>Model:</strong> {device.model}</p>
              <p className="device-serial"><strong>Serial:</strong> {device.serial_number}</p>
              <p className="device-date">
                <strong>Created:</strong> {new Date(device.created_at).toLocaleDateString()}
              </p>
              <div className="card-actions">
                <Link to={`/devices/${device.id}`} className="btn btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceList;
