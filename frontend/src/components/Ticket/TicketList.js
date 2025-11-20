import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TICKETS } from '../../utils/graphqlQueries';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './TicketList.css';

const TicketList = () => {
  const { loading, error, data } = useQuery(GET_TICKETS);

  if (loading) return <div className="loading">Loading tickets...</div>;
  if (error) {
    toast.error('Failed to load tickets');
    return <div className="error">Error loading tickets: {error.message}</div>;
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
    <div className="ticket-list-container">
      <div className="list-header">
        <h2>Tickets</h2>
        <Link to="/tickets/new" className="btn btn-primary">
          Create New Ticket
        </Link>
      </div>

      {data.tickets.length === 0 ? (
        <div className="empty-state">
          <p>No tickets found. Create your first ticket!</p>
        </div>
      ) : (
        <div className="ticket-table-container">
          <table className="ticket-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Device ID</th>
                <th>Status</th>
                <th>Description</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.device_id}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="ticket-description">{ticket.description}</td>
                  <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                  <td>{new Date(ticket.updated_at).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/tickets/${ticket.id}`} className="btn btn-sm btn-secondary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketList;
