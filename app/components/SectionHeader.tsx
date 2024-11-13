'use client';

import React from 'react';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  onAdd?: () => void;
}

export default function SectionHeader({ title, isOpen, onToggle, onAdd }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaPlus className="w-3 h-3" />
          <span>Add</span>
        </button>
      )}
    </div>
  );
} 