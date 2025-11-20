import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_TICKET,
  UPDATE_TICKET,
  GET_TICKET,
  GET_TICKETS,
  GET_DEVICES,
} from '../../utils/graphqlQueries';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './TicketForm.css';

const TicketForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    device_id: '',
    status: 'open',
    description: '',
  });

  const { data: devicesData } = useQuery(GET_DEVICES);
  const { data: ticketData } = useQuery(GET_TICKET, {
    variables: { id },
    skip: !isEditMode,
  });

  const [createTicket, { loading: creating }] = useMutation(CREATE_TICKET, {
    refetchQueries: [{ query: GET_TICKETS }],
    onCompleted: () => {
      toast.success('Ticket created successfully!');
      navigate('/tickets');
    },
    onError: (error) => {
      toast.error(`Failed to create ticket: ${error.message}`);
    },
  });

  const [updateTicket, { loading: updating }] = useMutation(UPDATE_TICKET, {
    refetchQueries: [{ query: GET_TICKETS }],
    onCompleted: () => {
      toast.success('Ticket updated successfully!');
      navigate('/tickets');
    },
    onError: (error) => {
      toast.error(`Failed to update ticket: ${error.message}`);
    },
  });

  useEffect(() => {
    if (ticketData?.ticket) {
      setFormData({
        device_id: ticketData.ticket.device_id,
        status: ticketData.ticket.status,
        description: ticketData.ticket.description,
      });
    }
  }, [ticketData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isEditMode) {
      await updateTicket({
        variables: {
          id,
          status: formData.status,
          description: formData.description,
        },
      });
    } else {
      if (!formData.device_id) {
        toast.error('Please select a device');
        return;
      }
      await createTicket({
        variables: formData,
      });
    }
  };

  return (
    <div className="ticket-form-container">
      <h2>{isEditMode ? 'Edit Ticket' : 'Create New Ticket'}</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        {!isEditMode && (
          <div className="form-group">
            <label htmlFor="device_id">Device</label>
            <select
              id="device_id"
              name="device_id"
              value={formData.device_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a device</option>
              {devicesData?.devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name} - {device.model}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter ticket description"
            rows="5"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={creating || updating}
          >
            {creating || updating ? 'Saving...' : isEditMode ? 'Update Ticket' : 'Create Ticket'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/tickets')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
