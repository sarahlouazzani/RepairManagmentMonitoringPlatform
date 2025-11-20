import express from 'express';
import { createWorkflow, getWorkflowHistory } from '../controllers/workflowController';

const router = express.Router();

// Create Workflow
router.post('/', createWorkflow);

// Get Workflow History
router.get('/ticket/:ticketId', getWorkflowHistory);

export default router;