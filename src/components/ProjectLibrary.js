import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import FilterSection from './FilterSection';
import ProjectCard from './ProjectCard';

const ProjectLibrary = () => {
    const [projects, setProjects] = useState([]);
    const [filters, setFilters] = useState({
        jobRole: '',
        skillLevel: '',
        skills: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, [filters]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await getProjects(filters);
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="project-library">
            <FilterSection filters={filters} setFilters={setFilters} />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="projects-grid">
                    {projects.map(project => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectLibrary;