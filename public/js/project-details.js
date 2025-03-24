document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetails();
    setupFormHandlers();
});

async function loadProjectDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        if (!projectId) {
            showError('Invalid project ID');
            return;
        }

        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch project details');
        
        const project = await response.json();
        displayProjectDetails(project);
        displayMilestones(project.milestones);
    } catch (error) {
        console.error('Error:', error);
        showError('Error loading project details');
    }
}

function displayProjectDetails(project) {
    const detailsContainer = document.getElementById('project-details');
    detailsContainer.innerHTML = `
        <h1>${project.title}</h1>
        <p class="project-description">${project.description}</p>
        <div class="project-meta">
            <span class="badge role">${project.jobRole}</span>
            <span class="badge level">${project.skillLevel}</span>
        </div>
        <div class="skills">
            ${project.requiredSkills.map(skill => 
                `<span class="badge skill">${skill}</span>`
            ).join('')}
        </div>
        <div class="project-stats">
            <span>Total XP: ${project.totalXP}</span>
            <span>Duration: ${project.estimatedDuration} hours</span>
        </div>
    `;
}

function displayMilestones(milestones) {
    const milestonesContainer = document.getElementById('milestones-container');
    milestonesContainer.innerHTML = `
        <h2>Project Milestones</h2>
        ${milestones.map((milestone, index) => `
            <div class="milestone-card">
                <h3>${milestone.title}</h3>
                <p>${milestone.description}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="task-list">
                    ${milestone.tasks.map(task => `
                        <div class="task-item">
                            <h4>${task.title}</h4>
                            <p>${task.description}</p>
                            <div class="task-meta">
                                <span>Time Limit: ${task.timeLimit} minutes</span>
                                <span>XP Reward: ${task.xpReward}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    `;

    // Add animation to progress bars
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(fill => {
            fill.style.width = '100%';
        });
    }, 300);
}

function setupFormHandlers() {
    const fileInput = document.querySelector('.file-input');
    const selectedFilesDiv = document.getElementById('selected-files');
    const form = document.getElementById('submission-form');

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        selectedFilesDiv.innerHTML = files.map(file => `
            <div class="selected-file">
                <span>${file.name}</span>
                <span class="remove-file">×</span>
            </div>
        `).join('');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const notes = document.getElementById('notes').value;
        const files = fileInput.files;

        try {
            // Here you would implement the actual file upload
            alert('Project submitted successfully!');
            form.reset();
            selectedFilesDiv.innerHTML = '';
        } catch (error) {
            showError('Error submitting project');
        }
    });
}

function showError(message) {
    const container = document.querySelector('.container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    container.insertBefore(errorDiv, container.firstChild);
}