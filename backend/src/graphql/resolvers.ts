import AppDataSource from '../config/database';
import Device from '../models/Device';
import Ticket from '../models/Ticket';
import Workflow from '../models/Workflow';

const deviceRepository = AppDataSource.getRepository(Device);
const ticketRepository = AppDataSource.getRepository(Ticket);
const workflowRepository = AppDataSource.getRepository(Workflow);

export const resolvers = {
    Query: {
        devices: async () => {
            return await deviceRepository.find();
        },
        device: async (_: any, { id }: { id: number }) => {
            return await deviceRepository.findOneBy({ id });
        },
        tickets: async () => {
            const tickets = await ticketRepository.find({ relations: ['device'] });
            return tickets.map(ticket => ({
                ...ticket,
                device_id: ticket.device?.id || null,
            }));
        },
        ticket: async (_: any, { id }: { id: number }) => {
            const ticket = await ticketRepository.findOne({ where: { id }, relations: ['device'] });
            if (!ticket) return null;
            return {
                ...ticket,
                device_id: ticket.device?.id || null,
            };
        },
        workflow: async (_: any, { ticketId }: { ticketId: number }) => {
            const workflows = await workflowRepository.find({ 
                where: { ticket: { id: ticketId } }, 
                order: { timestamp: 'ASC' },
                relations: ['ticket']
            });
            return workflows.map(workflow => ({
                ...workflow,
                ticket_id: workflow.ticket?.id || null,
            }));
        },
    },
    Mutation: {
        createDevice: async (_: any, { name, model, serial_number }: { name: string; model: string; serial_number: string }) => {
            const newDevice = deviceRepository.create({ name, model, serial_number });
            return await deviceRepository.save(newDevice);
        },
        updateDevice: async (_: any, { id, name, model, serial_number }: { id: number; name?: string; model?: string; serial_number?: string }) => {
            const device = await deviceRepository.findOneBy({ id });
            if (!device) throw new Error('Device not found');

            device.name = name || device.name;
            device.model = model || device.model;
            device.serial_number = serial_number || device.serial_number;

            return await deviceRepository.save(device);
        },
        deleteDevice: async (_: any, { id }: { id: number }) => {
            const device = await deviceRepository.findOneBy({ id });
            if (!device) throw new Error('Device not found');

            await deviceRepository.remove(device);
            return 'Device deleted successfully';
        },
        createTicket: async (_: any, { device_id, status, description }: { device_id: number; status: string; description: string }) => {
            const device = await deviceRepository.findOneBy({ id: device_id });
            if (!device) throw new Error('Device not found');

            const newTicket = ticketRepository.create({ device, status, description });
            const savedTicket = await ticketRepository.save(newTicket);
            return {
                ...savedTicket,
                device_id: savedTicket.device?.id || device_id,
            };
        },
        updateTicket: async (_: any, { id, status, description }: { id: number; status?: string; description?: string }) => {
            const ticket = await ticketRepository.findOneBy({ id });
            if (!ticket) throw new Error('Ticket not found');

            ticket.status = status || ticket.status;
            ticket.description = description || ticket.description;

            return await ticketRepository.save(ticket);
        },
        deleteTicket: async (_: any, { id }: { id: number }) => {
            const ticket = await ticketRepository.findOneBy({ id });
            if (!ticket) throw new Error('Ticket not found');

            await ticketRepository.remove(ticket);
            return 'Ticket deleted successfully';
        },
        createWorkflow: async (_: any, { ticket_id, status, comments }: { ticket_id: number; status: string; comments?: string }) => {
            const ticket = await ticketRepository.findOneBy({ id: ticket_id });
            if (!ticket) throw new Error('Ticket not found');

            const newWorkflow = workflowRepository.create({ ticket, status, comments: comments || '' });
            const savedWorkflow = await workflowRepository.save(newWorkflow);
            return {
                ...savedWorkflow,
                ticket_id: savedWorkflow.ticket?.id || ticket_id,
            };
        },
    },
};