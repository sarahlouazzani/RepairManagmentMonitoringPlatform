import express from 'express';
import { createDevice, getAllDevices, updateDevice, deleteDevice } from '../controllers/deviceController';

const router = express.Router();

// Create Device
router.post('/', createDevice);

// Get All Devices
router.get('/', getAllDevices);

// Update Device
router.put('/:id', updateDevice);

// Delete Device
router.delete('/:id', deleteDevice);

export default router;