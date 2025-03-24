document.addEventListener('DOMContentLoaded', () => {
    loadActiveProjects();
    loadCompletedProjects();
    updateUserStats();
});

async function loadActiveProjects() {
    try {
        const response = await fetch('http://localhost:5000/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const projects = await response.json();
        const activeProjects = projects.slice(0, 2); // Simulating active projects
        displayProjects(activeProjects, 'active-projects-grid');
    } catch (error) {
        console.error('Error:', error);
        showError('Error loading active projects');
    }
}

async function loadCompletedProjects() {
    try {
        const response = await fetch('http://localhost:5000/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const projects = await response.json();
        const completedProjects = projects.slice(2, 4); // Simulating completed projects
        displayProjects(completedProjects, 'completed-projects-grid');
    } catch (error) {
        console.error('Error:', error);
        showError('Error loading completed projects');
    }
}

function displayProjects(projects, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-meta">
                <span class="badge role">${project.jobRole}</span>
                <span class="badge level">${project.skillLevel}</span>
            </div>
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${containerId.includes('completed') ? '100%' : '60%'}"></div>
                </div>
                <span>${containerId.includes('completed') ? 'Completed' : 'In Progress'}</span>
            </div>
            <a href="/project-details.html?id=${project._id}" class="view-btn">View Details</a>
        </div>
    `).join('');

    // Animate progress bars
    setTimeout(() => {
        container.querySelectorAll('.progress-fill').forEach(fill => {
            fill.style.transition = 'width 1s ease-out';
        });
    }, 100);
}

function updateUserStats() {
    // Add animations to stat cards
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.5s ease-out';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 300);
    });
}

function showError(message) {
    const container = document.querySelector('.container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    container.insertBefore(errorDiv, container.firstChild);
}