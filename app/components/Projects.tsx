'use client';

import React from 'react';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { MdAdd, MdDelete, MdCode, MdInfo } from 'react-icons/md';

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
    <div>
      {/* Section Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
        <p className="text-sm text-gray-500 mt-1">Showcase your best technical projects</p>
      </div>

      {/* Writing Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 mb-6">
        <MdInfo className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Tips for showcasing projects:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Focus on significant technical challenges you solved</li>
            <li>Include metrics and impact where possible</li>
            <li>List the key technologies used</li>
            <li>Add live demo links when available</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        {projects.map((proj, index) => (
          <div 
            key={proj.id} 
            className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 relative hover:shadow-md transition-shadow duration-200"
          >
            {/* Project Entry Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <MdCode className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Project #{index + 1}</h3>
              </div>
              <button
                onClick={() => removeProject(proj.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg group"
              >
                <MdDelete className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  placeholder="e.g., E-commerce Platform"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Technologies Used <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={proj.techStack}
                  onChange={(e) => updateProject(proj.id, 'techStack', e.target.value)}
                  placeholder="e.g., React, Node.js, MongoDB, Express"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
                <p className="text-xs text-gray-500">Separate technologies with commas</p>
              </div>

              {/* Project Description */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  placeholder="• Developed a full-stack e-commerce platform with user authentication
• Implemented secure payment processing using Stripe
• Integrated real-time inventory management system
• Achieved 30% improvement in page load times"
                  rows={6}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 font-mono text-sm"
                />
                <p className="text-xs text-gray-500">Use bullet points (•) to highlight key features and achievements</p>
              </div>

              {/* Project Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Live Demo URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGlobe className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={proj.url}
                      onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                      placeholder="https://your-project.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Source Code URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGithub className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={proj.sourceCode}
                      onChange={(e) => updateProject(proj.id, 'sourceCode', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Project Button */}
        <button
          onClick={addProject}
          className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 hover:bg-blue-50"
        >
          <MdAdd className="w-5 h-5" />
          Add Another Project
        </button>
      </div>
    </div>
  );
} 