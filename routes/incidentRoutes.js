const express = require('express');
const router = express.Router();
const Incident = require('../models/incident');

// Get all incidents
router.get('/', async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create new incident
router.post('/', async (req, res) => {
    const { title, description, severity } = req.body;

    if (!title || !description || !severity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['Low', 'Medium', 'High'].includes(severity)) {
        return res.status(400).json({ error: 'Invalid severity level' });
    }

    try {
        const newIncident = new Incident({ title, description, severity });
        await newIncident.save();
        res.status(201).json(newIncident);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single incident by ID
router.get('/:id', async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(200).json(incident);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete incident by ID
router.delete('/:id', async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id); // pass in params
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(200).json({ message: `Incident ${req.params.id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
