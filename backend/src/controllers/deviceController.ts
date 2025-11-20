import type { Request, Response } from 'express';
import AppDataSource from '../config/database';
import Device from '../models/Device';

const deviceRepository = AppDataSource.getRepository(Device);

// Create Device
export const createDevice = async (req: Request, res: Response) => {
    const { name, model, serial_number } = req.body;

    try {
        const newDevice = deviceRepository.create({ name, model, serial_number });
        await deviceRepository.save(newDevice);
        res.status(201).json(newDevice);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Get All Devices
export const getAllDevices = async (_req: Request, res: Response) => {
    try {
        const devices = await deviceRepository.find();
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Update Device
export const updateDevice = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, model, serial_number } = req.body;

    try {
        const device = await deviceRepository.findOneBy({ id: parseInt(id!) });
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        device.name = name || device.name;
        device.model = model || device.model;
        device.serial_number = serial_number || device.serial_number;

        await deviceRepository.save(device);
        res.status(200).json(device);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Delete Device
export const deleteDevice = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const device = await deviceRepository.findOneBy({ id: parseInt(id!) });
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        await deviceRepository.remove(device);
        res.status(200).json({ message: 'Device deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};