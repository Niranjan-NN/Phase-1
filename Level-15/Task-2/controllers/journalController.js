import Journal from '../models/journalModel.js';

// Create a new journal entry
export const createEntry = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const newEntry = new Journal({ title, content, tags });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error creating entry', error });
    }
};

// Get all journal entries or filter by title/date/tags
export const getEntries = async (req, res) => {
    try {
        const { title, date, tags } = req.query;
        let query = {};
        if (title) query.title = new RegExp(title, 'i');
        if (date) query.date = { $gte: new Date(date) };
        if (tags) query.tags = { $in: tags.split(',') };

        const entries = await Journal.find(query);
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entries', error });
    }
};

// Update a journal entry
export const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEntry = await Journal.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error updating entry', error });
    }
};

// Delete a journal entry
export const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await Journal.findByIdAndDelete(id);
        res.status(200).json({ message: 'Entry deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting entry', error });
    }
};
