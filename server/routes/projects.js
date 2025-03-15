const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
    try {
        const { jobRole, skillLevel, skills } = req.query;
        let query = {};

        if (jobRole) query.jobRole = jobRole;
        if (skillLevel) query.skillLevel = skillLevel;
        if (skills) query.requiredSkills = { $in: skills.split(',') };

        const projects = await Project.find(query);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;