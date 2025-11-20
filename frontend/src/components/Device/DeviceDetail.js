import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DEVICE, DELETE_DEVICE, GET_DEVICES } from '../../utils/graphqlQueries';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './DeviceDetail.css';

const DeviceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_DEVICE, {
    variables: { id },
  });

  const [deleteDevice, { loading: deleting }] = useMutation(DELETE_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
    onCompleted: () => {
      toast.success('Device deleted successfully!');
      navigate('/devices');
    },
    onError: (error) => {
      toast.error(`Failed to delete device: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      deleteDevice({ variables: { id } });
    }
  };

  if (loading) return <div className="loading">Loading device details...</div>;
  if (error) {
    toast.error('Failed to load device details');
    return <div className="error">Error: {error.message}</div>;
  }

  const device = data.device;

  if (!device) {
    return <div className="error">Device not found</div>;
  }

  return (
    <div className="device-detail-container">
      <div className="detail-header">
        <h2>Device Details</h2>
        <div className="detail-actions">
          <Link to={`/devices/edit/${id}`} className="btn btn-primary">
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="device-detail-card">
        <div className="detail-row">
          <span className="detail-label">ID:</span>
          <span className="detail-value">{device.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{device.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Model:</span>
          <span className="detail-value">{device.model}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Serial Number:</span>
          <span className="detail-value">{device.serial_number}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Created At:</span>
          <span className="detail-value">
            {new Date(device.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="back-link">
        <Link to="/devices" className="btn btn-secondary">
          Back to Devices
        </Link>
      </div>
    </div>
  );
};

export default DeviceDetail;
