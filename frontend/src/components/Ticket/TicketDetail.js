import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_TICKET,
  DELETE_TICKET,
  GET_TICKETS,
  GET_WORKFLOW,
} from '../../utils/graphqlQueries';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import WorkflowList from '../Workflow/WorkflowList';
import './TicketDetail.css';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_TICKET, {
    variables: { id },
  });

  const [deleteTicket, { loading: deleting }] = useMutation(DELETE_TICKET, {
    refetchQueries: [{ query: GET_TICKETS }],
    onCompleted: () => {
      toast.success('Ticket deleted successfully!');
      navigate('/tickets');
    },
    onError: (error) => {
      toast.error(`Failed to delete ticket: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteTicket({ variables: { id } });
    }
  };

  if (loading) return <div className="loading">Loading ticket details...</div>;
  if (error) {
    toast.error('Failed to load ticket details');
    return <div className="error">Error: {error.message}</div>;
  }

  const ticket = data.ticket;

  if (!ticket) {
    return <div className="error">Ticket not found</div>;
  }

  const getStatusClass = (status) => {
    const statusMap = {
      open: 'status-open',
      'in-progress': 'status-progress',
      resolved: 'status-resolved',
      closed: 'status-closed',
    };
    return statusMap[status.toLowerCase()] || 'status-default';
  };

  return (
    <div className="ticket-detail-container">
      <div className="detail-header">
        <h2>Ticket Details</h2>
        <div className="detail-actions">
          <Link to={`/tickets/edit/${id}`} className="btn btn-primary">
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

      <div className="ticket-detail-card">
        <div className="detail-row">
          <span className="detail-label">ID:</span>
          <span className="detail-value">{ticket.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Device ID:</span>
          <span className="detail-value">{ticket.device_id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span className={`status-badge ${getStatusClass(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Description:</span>
          <span className="detail-value">{ticket.description}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Created At:</span>
          <span className="detail-value">
            {new Date(ticket.created_at).toLocaleString()}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Updated At:</span>
          <span className="detail-value">
            {new Date(ticket.updated_at).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="workflow-section">
        <h3>Workflow History</h3>
        <WorkflowList ticketId={id} />
      </div>

      <div className="back-link">
        <Link to="/tickets" className="btn btn-secondary">
          Back to Tickets
        </Link>
      </div>
    </div>
  );
};

export default TicketDetail;
