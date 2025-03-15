const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    jobRole: { type: String, required: true },
    skillLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    requiredSkills: [String],
    milestones: [{
        title: String,
        tasks: [{
            description: String,
            timeLimit: Number,
            xpReward: Number
        }]
    }],
    totalXP: Number,
    estimatedDuration: Number
});

module.exports = mongoose.model('Project', projectSchema);