'use client';

import React from 'react';

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <button
          onClick={addEducation}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Education
        </button>
      </div>
      {education.map((edu) => (
        <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={edu.school}
              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
              placeholder="School/University"
              className="input-field"
            />
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              placeholder="Degree"
              className="input-field"
            />
            <input
              type="text"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
              placeholder="Field of Study"
              className="input-field"
            />
            <input
              type="text"
              value={edu.gpa}
              onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
              placeholder="GPA (optional)"
              className="input-field"
            />
            <input
              type="month"
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
              placeholder="Start Date"
              className="input-field"
            />
            <input
              type="month"
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
              placeholder="End Date"
              className="input-field"
            />
          </div>
        </div>
      ))}
    </div>
  );
}