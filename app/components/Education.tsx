'use client';

import React from 'react';
import { MdAdd, MdDelete, MdSchool } from 'react-icons/md';
import { HiAcademicCap } from 'react-icons/hi';
import { format } from 'date-fns';
import { FaRegCalendarAlt } from 'react-icons/fa';

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export default function EducationSection({ education, onChange }: EducationSectionProps) {
  const addEducation = () => {
    onChange([
      ...education,
      {
        id: Date.now().toString(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
      },
    ]);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div>
      {/* Section Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Education</h2>
        <p className="text-sm text-gray-500 mt-1">Add your educational background and qualifications</p>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div 
            key={edu.id} 
            className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 relative hover:shadow-md transition-shadow duration-200"
          >
            {/* Education Entry Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <HiAcademicCap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Education #{index + 1}</h3>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg group"
              >
                <MdDelete className="w-5 h-5" />
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* School Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  School/University <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  placeholder="Harvard University"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Degree */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Field of Study */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Field of Study <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  placeholder="Computer Science"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* GPA */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  GPA <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="7.5/10.0"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Date Range */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRegCalendarAlt className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-600 appearance-none"
                    style={{
                      backgroundImage: 'none' // Removes default calendar icon
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Select start month and year</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  End Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRegCalendarAlt className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-600 appearance-none"
                    style={{
                      backgroundImage: 'none' // Removes default calendar icon
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Select end month and year</p>
              </div>
            </div>
          </div>
        ))}

        {/* Add Education Button */}
        <button
          onClick={addEducation}
          className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 hover:bg-blue-50"
        >
          <MdAdd className="w-5 h-5" />
          Add Another Education
        </button>
      </div>
    </div>
  );
}