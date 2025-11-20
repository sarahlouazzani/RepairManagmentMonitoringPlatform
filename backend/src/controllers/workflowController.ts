import type { Request, Response } from 'express';
import AppDataSource from '../config/database';
import Workflow from '../models/Workflow';
import Ticket from '../models/Ticket';

const workflowRepository = AppDataSource.getRepository(Workflow);
const ticketRepository = AppDataSource.getRepository(Ticket);

// Create Workflow
export const createWorkflow = async (req: Request, res: Response) => {
    const { ticket_id, status, comments } = req.body;

    try {
        const ticket = await ticketRepository.findOneBy({ id: ticket_id });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const newWorkflow = workflowRepository.create({ ticket, status, comments });
        await workflowRepository.save(newWorkflow);
        res.status(201).json(newWorkflow);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Get Workflow History
export const getWorkflowHistory = async (req: Request, res: Response) => {
    const { ticketId } = req.params;

    try {
        const workflows = await workflowRepository.find({ where: { ticket: { id: parseInt(ticketId!) } }, order: { timestamp: 'ASC' } });
        res.status(200).json(workflows);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};