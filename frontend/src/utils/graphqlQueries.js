import { gql } from '@apollo/client';

// Device Queries
export const GET_DEVICES = gql`
  query GetDevices {
    devices {
      id
      name
      model
      serial_number
      created_at
    }
  }
`;

export const GET_DEVICE = gql`
  query GetDevice($id: ID!) {
    device(id: $id) {
      id
      name
      model
      serial_number
      created_at
    }
  }
`;

// Device Mutations
export const CREATE_DEVICE = gql`
  mutation CreateDevice($name: String!, $model: String!, $serial_number: String!) {
    createDevice(name: $name, model: $model, serial_number: $serial_number) {
      id
      name
      model
      serial_number
      created_at
    }
  }
`;

export const UPDATE_DEVICE = gql`
  mutation UpdateDevice($id: ID!, $name: String, $model: String, $serial_number: String) {
    updateDevice(id: $id, name: $name, model: $model, serial_number: $serial_number) {
      id
      name
      model
      serial_number
      created_at
    }
  }
`;

export const DELETE_DEVICE = gql`
  mutation DeleteDevice($id: ID!) {
    deleteDevice(id: $id)
  }
`;

// Ticket Queries
export const GET_TICKETS = gql`
  query GetTickets {
    tickets {
      id
      device_id
      status
      description
      created_at
      updated_at
    }
  }
`;

export const GET_TICKET = gql`
  query GetTicket($id: ID!) {
    ticket(id: $id) {
      id
      device_id
      status
      description
      created_at
      updated_at
    }
  }
`;

// Ticket Mutations
export const CREATE_TICKET = gql`
  mutation CreateTicket($device_id: ID!, $status: String!, $description: String!) {
    createTicket(device_id: $device_id, status: $status, description: $description) {
      id
      device_id
      status
      description
      created_at
      updated_at
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation UpdateTicket($id: ID!, $status: String, $description: String) {
    updateTicket(id: $id, status: $status, description: $description) {
      id
      device_id
      status
      description
      created_at
      updated_at
    }
  }
`;

export const DELETE_TICKET = gql`
  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id)
  }
`;

// Workflow Queries
export const GET_WORKFLOW = gql`
  query GetWorkflow($ticketId: ID!) {
    workflow(ticketId: $ticketId) {
      id
      ticket_id
      status
      timestamp
      comments
    }
  }
`;

// Workflow Mutations
export const CREATE_WORKFLOW = gql`
  mutation CreateWorkflow($ticket_id: ID!, $status: String!, $comments: String) {
    createWorkflow(ticket_id: $ticket_id, status: $status, comments: $comments) {
      id
      ticket_id
      status
      timestamp
      comments
    }
  }
`;
