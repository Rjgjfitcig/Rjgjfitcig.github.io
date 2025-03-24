document.addEventListener('DOMContentLoaded', () => {
    loadProjects();

    document.getElementById('jobRole').addEventListener('change', loadProjects);
    document.getElementById('skillLevel').addEventListener('change', loadProjects);
});

async function loadProjects() {
    try {
        const jobRole = document.getElementById('jobRole').value;
        const skillLevel = document.getElementById('skillLevel').value;
        
        const params = new URLSearchParams();
        if (jobRole) params.append('jobRole', jobRole);
        if (skillLevel) params.append('skillLevel', skillLevel);

        const response = await fetch(`http://localhost:5000/api/projects?${params}`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('projects-grid').innerHTML = 
            '<div class="error">Error loading projects</div>';
    }
}

function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-info">
            <span class="badge role">${project.jobRole}</span>
            <span class="badge level">${project.skillLevel}</span>
        </div>
        <div class="skills">
            ${project.requiredSkills.map(skill => 
                `<span class="badge skill">${skill}</span>`
            ).join('')}
        </div>
        <div class="project-meta">
            <span>XP: ${project.totalXP}</span>
            <span>Duration: ${project.estimatedDuration}h</span>
        </div>
        <a href="/project-details.html?id=${project._id}" class="view-btn">View Details</a>
    `;
    return card;
}