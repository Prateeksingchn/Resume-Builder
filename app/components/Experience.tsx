'use client';

import React from 'react';
import { MdAdd, MdDelete, MdBusinessCenter, MdInfo } from 'react-icons/md';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export default function ExperienceSection({ experience, onChange }: ExperienceSectionProps) {
  const addExperience = () => {
    onChange([
      ...experience,
      {
        id: Date.now().toString(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeExperience = (id: string) => {
    onChange(experience.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onChange(
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div>
      {/* Section Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
        <p className="text-sm text-gray-500 mt-1">Add your relevant work experience</p>
      </div>

      {/* Writing Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 mb-6">
        <MdInfo className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Tips for writing effective job descriptions:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Use action verbs to start each bullet point</li>
            <li>Include quantifiable achievements and metrics</li>
            <li>Focus on your impact and contributions</li>
            <li>Keep descriptions concise and relevant</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div 
            key={exp.id} 
            className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 relative hover:shadow-md transition-shadow duration-200"
          >
            {/* Experience Entry Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <MdBusinessCenter className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Experience #{index + 1}</h3>
              </div>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg group"
              >
                <MdDelete className="w-5 h-5" />
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Google"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Position */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="Mountain View, CA"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Employment Type */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Employment Type
                </label>
                <select
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Select Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Dates */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="• Developed and maintained scalable web applications using React and Node.js
• Improved application performance by 40% through code optimization
• Led a team of 5 developers in delivering critical features
• Collaborated with product managers to define technical requirements"
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use bullet points (•) to list your achievements and responsibilities
              </p>
            </div>
          </div>
        ))}

        {/* Add Experience Button */}
        <button
          onClick={addExperience}
          className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 hover:bg-blue-50"
        >
          <MdAdd className="w-5 h-5" />
          Add Another Experience
        </button>
      </div>
    </div>
  );
}