const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    jobRole: String,
    skillLevel: String,
    requiredSkills: [String],
    totalXP: Number,
    estimatedDuration: Number,
    milestones: [{
        title: String,
        description: String,
        requiredXP: Number,
        tasks: [{
            title: String,
            description: String,
            timeLimit: Number,
            xpReward: Number
        }]
    }]
});

module.exports = mongoose.model('Project', projectSchema, 'projects');