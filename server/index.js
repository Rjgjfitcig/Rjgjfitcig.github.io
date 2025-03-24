const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb+srv://yourtypenot17:XXZgZOkVH3jdkXMH@cluster0.f7lp2.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

const Project = require('./models/Project');

app.get('/api/projects', async (req, res) => {
    try {
        const { jobRole, skillLevel } = req.query;
        const query = {};
        if (jobRole) query.jobRole = jobRole;
        if (skillLevel) query.skillLevel = skillLevel;
        const projects = await Project.find(query);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add before the * route handler

app.post('/api/projects/:id/submit', async (req, res) => {
    try {
        const { notes, files } = req.body;
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        // Here you would handle file uploads and submission storage
        res.json({ message: 'Project submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});