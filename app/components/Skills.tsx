'use client';

import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import SectionWrapper from './SectionWrapper';

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export default function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // Predefined categories
  const predefinedCategories = [
    'Programming Languages',
    'Frontend Development',
    'Backend Development',
    'Databases',
    'Cloud Services',
    'DevOps Tools',
    'Version Control',
    'Testing',
    'UI/UX Design',
    'Mobile Development',
    'Languages', // Human languages
    'Frameworks',
    'Tools & IDEs',
    'Other',
  ];

  const addSkill = () => {
    if (newSkill.trim()) {
      const category = showCustomCategory ? customCategory : selectedCategory;
      if (category) {
        onChange([
          ...skills,
          {
            id: Date.now().toString(),
            name: newSkill.trim(),
            category: category.trim(),
          },
        ]);
        setNewSkill('');
      }
    }
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter((skill) => skill.id !== id));
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <SectionWrapper
      title="Skills"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <select
              value={showCustomCategory ? 'custom' : selectedCategory}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setShowCustomCategory(true);
                  setSelectedCategory('');
                } else {
                  setShowCustomCategory(false);
                  setSelectedCategory(e.target.value);
                }
              }}
              className="p-2 border rounded-md flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {predefinedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="custom">+ Add Custom Category</option>
            </select>

            {showCustomCategory && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter custom category"
                className="p-2 border rounded-md flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter skill (e.g., React, Python, AWS)"
              className="p-2 border rounded-md flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSkill();
                }
              }}
            />
            <button
              onClick={addSkill}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <FaTrash className="w-3 h-3" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Display grouped skills */}
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="space-y-2">
              <h3 className="font-semibold text-gray-700">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-md group"
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}