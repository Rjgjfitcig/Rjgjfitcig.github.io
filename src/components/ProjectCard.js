import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <div className="project-info">
        <span className="badge role">{project.jobRole}</span>
        <span className="badge level">{project.skillLevel}</span>
      </div>
      <p>{project.description}</p>
      <div className="project-stats">
        <span>XP: {project.totalXP}</span>
        <span>Duration: {project.estimatedDuration}h</span>
      </div>
      <div className="skills">
        {project.requiredSkills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
      <Link to={`/project/${project._id}`} className="start-button">
        Start Project
      </Link>
    </div>
  );
};

export default ProjectCard;