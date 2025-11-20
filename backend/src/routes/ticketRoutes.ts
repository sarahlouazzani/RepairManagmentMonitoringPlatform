import express from 'express';
import { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket } from '../controllers/ticketController';

const router = express.Router();

// Create Ticket
router.post('/', createTicket);

// Get All Tickets
router.get('/', getAllTickets);

// Get Single Ticket
router.get('/:id', getTicketById);

// Update Ticket
router.put('/:id', updateTicket);

// Delete Ticket
router.delete('/:id', deleteTicket);

export default router;