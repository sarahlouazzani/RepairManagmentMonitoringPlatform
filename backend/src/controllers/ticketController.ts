import type { Request, Response } from 'express';
import AppDataSource from '../config/database';
import Ticket from '../models/Ticket';
import Device from '../models/Device';

const ticketRepository = AppDataSource.getRepository(Ticket);
const deviceRepository = AppDataSource.getRepository(Device);

// Create Ticket
export const createTicket = async (req: Request, res: Response) => {
    const { device_id, status, description } = req.body;

    try {
        const device = await deviceRepository.findOneBy({ id: device_id });
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        const newTicket = ticketRepository.create({ device, status, description });
        await ticketRepository.save(newTicket);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Get All Tickets
export const getAllTickets = async (_req: Request, res: Response) => {
    try {
        const tickets = await ticketRepository.find({ relations: ['device'] });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Get Single Ticket
export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const ticket = await ticketRepository.findOne({ where: { id: parseInt(id!) }, relations: ['device'] });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Update Ticket
export const updateTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, description } = req.body;

    try {
        const ticket = await ticketRepository.findOneBy({ id: parseInt(id!) });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        ticket.status = status || ticket.status;
        ticket.description = description || ticket.description;

        await ticketRepository.save(ticket);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Delete Ticket
export const deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const ticket = await ticketRepository.findOneBy({ id: parseInt(id!) });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        await ticketRepository.remove(ticket);
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};