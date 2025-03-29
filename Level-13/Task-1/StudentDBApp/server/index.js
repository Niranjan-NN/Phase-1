const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
    subjects: { type: [String], required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true }
    }
});

const Student = mongoose.model('Student', studentSchema);

// Insert One Student
app.post('/api/students/insertOne', async (req, res) => {
    console.log('🟡 Incoming Data:', req.body);  // 👉 Check if data reaches server

    const formattedData = {
        ...req.body,
        subjects: req.body.subjects.map((subject) => subject.trim())
    };

    try {
        const newStudent = await Student.create(formattedData);
        console.log('✅ Student Created:', newStudent);
        res.status(201).json({ message: 'Student added successfully!', student: newStudent });
    } catch (error) {
        console.error('❌ Insert Error Details:', error); // 👉 More detailed error tracking
        res.status(500).json({ error: error.message });
    }
});


// Fetch All Students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
