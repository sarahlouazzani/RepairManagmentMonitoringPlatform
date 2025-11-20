import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_WORKFLOW, GET_WORKFLOW } from '../../utils/graphqlQueries';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './WorkflowForm.css';

const WorkflowForm = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    status: '',
    comments: '',
  });

  const [createWorkflow, { loading }] = useMutation(CREATE_WORKFLOW, {
    refetchQueries: [{ query: GET_WORKFLOW, variables: { ticketId } }],
    onCompleted: () => {
      toast.success('Workflow stage added successfully!');
      navigate(`/tickets/${ticketId}`);
    },
    onError: (error) => {
      toast.error(`Failed to add workflow stage: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.status) {
      toast.error('Please select a status');
      return;
    }

    await createWorkflow({
      variables: {
        ticket_id: ticketId,
        status: formData.status,
        comments: formData.comments || null,
      },
    });
  };

  return (
    <div className="workflow-form-container">
      <h2>Add Workflow Stage</h2>
      <p className="form-subtitle">Ticket ID: {ticketId}</p>

      <form onSubmit={handleSubmit} className="workflow-form">
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comments">Comments (Optional)</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Add any comments or notes..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Workflow Stage'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/tickets/${ticketId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkflowForm;
