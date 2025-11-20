import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Device {
        id: ID!
        name: String!
        model: String!
        serial_number: String!
        created_at: String!
    }

    type Ticket {
        id: ID!
        device_id: String!
        status: String!
        description: String!
        created_at: String!
        updated_at: String!
    }

    type Workflow {
        id: ID!
        ticket_id: String!
        status: String!
        timestamp: String!
        comments: String
    }

    type Query {
        devices: [Device!]!
        device(id: ID!): Device
        tickets: [Ticket!]!
        ticket(id: ID!): Ticket
        workflow(ticketId: ID!): [Workflow!]!
    }

    type Mutation {
        createDevice(name: String!, model: String!, serial_number: String!): Device!
        updateDevice(id: ID!, name: String, model: String, serial_number: String): Device!
        deleteDevice(id: ID!): String!

        createTicket(device_id: ID!, status: String!, description: String!): Ticket!
        updateTicket(id: ID!, status: String, description: String): Ticket!
        deleteTicket(id: ID!): String!

        createWorkflow(ticket_id: ID!, status: String!, comments: String): Workflow!
    }
`;
