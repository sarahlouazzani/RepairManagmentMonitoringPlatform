import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_DEVICE, UPDATE_DEVICE, GET_DEVICE, GET_DEVICES } from '../../utils/graphqlQueries';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './DeviceForm.css';

const DeviceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    serial_number: '',
  });

  const { data: deviceData } = useQuery(GET_DEVICE, {
    variables: { id },
    skip: !isEditMode,
  });

  const [createDevice, { loading: creating }] = useMutation(CREATE_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
    onCompleted: () => {
      toast.success('Device created successfully!');
      navigate('/devices');
    },
    onError: (error) => {
      toast.error(`Failed to create device: ${error.message}`);
    },
  });

  const [updateDevice, { loading: updating }] = useMutation(UPDATE_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }],
    onCompleted: () => {
      toast.success('Device updated successfully!');
      navigate('/devices');
    },
    onError: (error) => {
      toast.error(`Failed to update device: ${error.message}`);
    },
  });

  useEffect(() => {
    if (deviceData?.device) {
      setFormData({
        name: deviceData.device.name,
        model: deviceData.device.model,
        serial_number: deviceData.device.serial_number,
      });
    }
  }, [deviceData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.model || !formData.serial_number) {
      toast.error('Please fill in all fields');
      return;
    }

    if (isEditMode) {
      await updateDevice({
        variables: {
          id,
          ...formData,
        },
      });
    } else {
      await createDevice({
        variables: formData,
      });
    }
  };

  return (
    <div className="device-form-container">
      <h2>{isEditMode ? 'Edit Device' : 'Create New Device'}</h2>
      <form onSubmit={handleSubmit} className="device-form">
        <div className="form-group">
          <label htmlFor="name">Device Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter device name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Enter device model"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="serial_number">Serial Number</label>
          <input
            type="text"
            id="serial_number"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            placeholder="Enter serial number"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={creating || updating}
          >
            {creating || updating ? 'Saving...' : isEditMode ? 'Update Device' : 'Create Device'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/devices')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceForm;
