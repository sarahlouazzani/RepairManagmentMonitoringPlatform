import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WORKFLOW } from '../../utils/graphqlQueries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './WorkflowList.css';

const WorkflowList = ({ ticketId }) => {
  const { loading, error, data } = useQuery(GET_WORKFLOW, {
    variables: { ticketId },
  });

  if (loading) return <div className="loading">Loading workflow...</div>;
  if (error) {
    toast.error('Failed to load workflow');
    return <div className="error">Error loading workflow: {error.message}</div>;
  }

  const workflows = data.workflow || [];

  return (
    <div className="workflow-list-container">
      <div className="workflow-header">
        <Link to={`/workflows/new/${ticketId}`} className="btn btn-sm btn-primary">
          Add Workflow Stage
        </Link>
      </div>

      {workflows.length === 0 ? (
        <div className="empty-state">
          <p>No workflow history yet. Add the first workflow stage!</p>
        </div>
      ) : (
        <div className="workflow-timeline">
          {workflows.map((workflow, index) => (
            <div key={workflow.id} className="workflow-item">
              <div className="workflow-marker">{index + 1}</div>
              <div className="workflow-content">
                <div className="workflow-status">
                  <strong>Status:</strong> {workflow.status}
                </div>
                <div className="workflow-timestamp">
                  <strong>Date:</strong>{' '}
                  {new Date(workflow.timestamp).toLocaleString()}
                </div>
                {workflow.comments && (
                  <div className="workflow-comments">
                    <strong>Comments:</strong> {workflow.comments}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkflowList;
