'use client';

import React, { useState } from 'react';
import { MdAdd, MdClose, MdInfo } from 'react-icons/md';
import { FaTools } from 'react-icons/fa';

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
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // Predefined categories with icons and colors
  const predefinedCategories = [
    { name: 'Programming Languages', color: 'bg-blue-100 text-blue-600' },
    { name: 'Frontend Development', color: 'bg-purple-100 text-purple-600' },
    { name: 'Backend Development', color: 'bg-green-100 text-green-600' },
    { name: 'Databases', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Cloud Services', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'DevOps Tools', color: 'bg-red-100 text-red-600' },
    { name: 'Version Control', color: 'bg-gray-100 text-gray-600' },
    { name: 'Testing', color: 'bg-pink-100 text-pink-600' },
    { name: 'UI/UX Design', color: 'bg-teal-100 text-teal-600' },
    { name: 'Mobile Development', color: 'bg-orange-100 text-orange-600' },
    { name: 'Languages', color: 'bg-cyan-100 text-cyan-600' },
    { name: 'Frameworks', color: 'bg-lime-100 text-lime-600' },
    { name: 'Tools & IDEs', color: 'bg-violet-100 text-violet-600' },
    { name: 'Other', color: 'bg-gray-100 text-gray-600' },
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
    <div>
      {/* Section Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
        <p className="text-sm text-gray-500 mt-1">Add your technical and professional skills</p>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 mb-6">
        <MdInfo className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Tips for adding skills:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Group similar skills under appropriate categories</li>
            <li>Include both technical and soft skills</li>
            <li>Add relevant tools and technologies</li>
            <li>Keep skills concise and specific</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        {/* Add Skills Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="space-y-4">
            {/* Category Selection */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Skill Category <span className="text-red-500">*</span>
              </label>
              <CategorySelect
                selectedCategory={selectedCategory}
                onSelect={(value) => {
                  if (value === 'custom') {
                    setShowCustomCategory(true);
                    setSelectedCategory('');
                  } else {
                    setShowCustomCategory(false);
                    setSelectedCategory(value);
                  }
                }}
                customCategory={customCategory}
                onCustomChange={setCustomCategory}
                showCustomCategory={showCustomCategory}
                categories={predefinedCategories}
              />
            </div>

            {/* Skill Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Skill Name <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill (e.g., React, Python, AWS)"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill();
                    }
                  }}
                />
                <button
                  onClick={addSkill}
                  disabled={!newSkill.trim() || !selectedCategory}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <MdAdd className="w-5 h-5" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Display Skills */}
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const categoryConfig = predefinedCategories.find(c => c.name === category) || { color: 'bg-gray-100 text-gray-600' };
            
            return (
              <div key={category} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-2 rounded-lg ${categoryConfig.color}`}>
                    <FaTools className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-gray-900">{category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg group hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm text-gray-700">{skill.name}</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const CategorySelect = ({ 
  selectedCategory, 
  onSelect, 
  customCategory, 
  onCustomChange, 
  showCustomCategory,
  categories  // Add this prop
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
      >
        <span className="text-gray-700">
          {showCustomCategory 
            ? customCategory || "Enter custom category" 
            : selectedCategory || "Select Category"}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-auto">
          <div className="px-2 py-1.5 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="py-1">
            {categories.map(({ name, color }) => (
              <button
                key={name}
                onClick={() => {
                  onSelect(name);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 ${
                  selectedCategory === name ? 'bg-blue-50' : ''
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${color.replace('bg-', 'bg-')}`} />
                <span className="text-gray-700">{name}</span>
              </button>
            ))}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={() => {
                  onSelect('custom');
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-blue-600"
              >
                <MdAdd className="w-4 h-4" />
                <span>Add Custom Category</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showCustomCategory && (
        <input
          type="text"
          value={customCategory}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Enter custom category"
          className="mt-2 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
        />
      )}
    </div>
  );
};