const express = require('express');
const Journal = require('../models/journalModel.js');

const router = express.Router();

// Create a new journal entry
router.post('/', async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const journal = new Journal({ title, content, tags });
        await journal.save();
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create journal entry' });
    }
});

// Get all journal entries
router.get('/', async (req, res) => {
    try {
        const journals = await Journal.find();
        res.json(journals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch journal entries' });
    }
});

module.exports = router;
