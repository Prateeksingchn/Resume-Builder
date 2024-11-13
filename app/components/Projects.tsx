'use client';

import React from 'react';
import { FaGithub, FaGlobe } from 'react-icons/fa';

interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  sourceCode?: string;
  techStack: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export default function ProjectsSection({ projects, onChange }: ProjectsSectionProps) {
  const addProject = () => {
    onChange([
      ...projects,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        url: '',
        sourceCode: '',
        techStack: '',
      },
    ]);
  };

  const updateProject = (id: string, field: string, value: string) => {
    onChange(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((proj) => proj.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button
          onClick={addProject}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </div>
      
      {projects.map((proj) => (
        <div key={proj.id} className="space-y-4 border-b pb-4">
          <div className="flex justify-end">
            <button
              onClick={() => removeProject(proj.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                placeholder="e.g., E-commerce Platform"
                className="w-full p-2 border rounded"
              />
            </div>
            
            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tech Stack
              </label>
              <input
                type="text"
                value={proj.techStack}
                onChange={(e) => updateProject(proj.id, 'techStack', e.target.value)}
                placeholder="e.g., React, Node.js, MongoDB, Express"
                className="w-full p-2 border rounded"
              />
            </div>
            
            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                value={proj.description}
                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                placeholder="Add your project highlights (press Enter for new bullet points):

• Developed a full-stack e-commerce platform with user authentication
• Implemented secure payment processing using Stripe
• Integrated real-time inventory management system
• Achieved 30% improvement in page load times"
                rows={8}
                className="w-full p-2 border rounded font-mono"
              />
            </div>
            
            {/* Project Links */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={proj.url}
                  onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                  placeholder="https://your-project.com"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source Code URL
                </label>
                <input
                  type="url"
                  value={proj.sourceCode}
                  onChange={(e) => updateProject(proj.id, 'sourceCode', e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 