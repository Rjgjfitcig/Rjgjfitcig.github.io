import React from 'react';
import './FilterSection.css';

const FilterSection = ({ filters, setFilters }) => {
  const jobRoles = ['Frontend Developer', 'Backend Developer', 'Full Stack', 'DevOps'];
  const skillLevels = ['beginner', 'intermediate', 'advanced'];
  const availableSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'DevOps'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="filter-section">
      <div className="filter-group">
        <label>Job Role:</label>
        <select
          value={filters.jobRole}
          onChange={(e) => handleFilterChange('jobRole', e.target.value)}
        >
          <option value="">All Roles</option>
          {jobRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Skill Level:</label>
        <select
          value={filters.skillLevel}
          onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
        >
          <option value="">All Levels</option>
          {skillLevels.map(level => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group skills-filter">
        <label>Skills:</label>
        <div className="skills-grid">
          {availableSkills.map(skill => (
            <label key={skill} className="skill-checkbox">
              <input
                type="checkbox"
                checked={filters.skills.includes(skill)}
                onChange={(e) => {
                  const newSkills = e.target.checked
                    ? [...filters.skills, skill]
                    : filters.skills.filter(s => s !== skill);
                  handleFilterChange('skills', newSkills);
                }}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;