import express, { Request, Response } from 'express';
import Incident from '../models/incident';

interface IncidentRequestBody {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { title, description, severity } = req.body;

  if (!title || !description || !severity) {
    res.status(400).json({ error: 'Missing required fields' });
    return ;
  }

  if (!['Low', 'Medium', 'High'].includes(severity)) {
     res.status(400).json({ error: 'Invalid severity level' });
     return;
  }

  try {
    const newIncident = new Incident({ title, description, severity });
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      res.status(404).json({ error: 'Incident not found' });
      return;
    }
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id); 
    if (!incident) {
      res.status(404).json({ error: 'Incident not found' });
      return;
    }
    res.status(200).json({ message: `Incident ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
