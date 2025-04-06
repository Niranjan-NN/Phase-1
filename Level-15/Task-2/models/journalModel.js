const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    tags: { type: [String], default: [] }
});

// Explicitly specify collection name as `personalJournal`
const Journal = mongoose.model('Journal', journalSchema, 'personalJournal');

module.exports = Journal;
