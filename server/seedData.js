const mongoose = require('mongoose');
const Project = require('./models/Project');

const sampleProjects = [
    {
        title: "Build an E-commerce Platform",
        description: "Create a full-stack e-commerce website with user authentication and payment integration. You'll learn to build secure user authentication, manage product catalogs, implement shopping cart functionality, and integrate payment gateways.",
        jobRole: "Full Stack Developer",
        skillLevel: "intermediate",
        requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB"],
        totalXP: 1000,
        estimatedDuration: 40,
        milestones: [
            {
                title: "User Authentication",
                description: "Build a secure authentication system using JWT tokens",
                requiredXP: 200,
                tasks: [
                    {
                        title: "Setup Authentication",
                        description: "Implement JWT-based authentication with secure password hashing",
                        timeLimit: 120,
                        xpReward: 100
                    }
                ]
            }
        ]
    },
    {
        title: "Social Media Dashboard",
        description: "Build a responsive dashboard for social media analytics",
        jobRole: "Frontend Developer",
        skillLevel: "beginner",
        requiredSkills: ["HTML", "CSS", "JavaScript", "React"],
        totalXP: 800,
        estimatedDuration: 30,
        milestones: [
            {
                title: "Dashboard Layout",
                description: "Create responsive grid layout",
                requiredXP: 150,
                tasks: [
                    {
                        title: "Design Implementation",
                        description: "Convert design to responsive HTML/CSS",
                        timeLimit: 90,
                        xpReward: 75
                    }
                ]
            }
        ]
    },
    {
        title: "API Gateway Service",
        description: "Develop a scalable API gateway with rate limiting and caching",
        jobRole: "Backend Developer",
        skillLevel: "advanced",
        requiredSkills: ["Node.js", "Redis", "Docker", "Microservices"],
        totalXP: 1200,
        estimatedDuration: 50,
        milestones: [
            {
                title: "Core Gateway Setup",
                description: "Implement basic routing and middleware",
                requiredXP: 300,
                tasks: [
                    {
                        title: "Route Configuration",
                        description: "Set up dynamic route handling",
                        timeLimit: 150,
                        xpReward: 150
                    }
                ]
            }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://yourtypenot17:XXZgZOkVH3jdkXMH@cluster0.f7lp2.mongodb.net/test');
        await Project.deleteMany({});
        await Project.insertMany(sampleProjects);
        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();