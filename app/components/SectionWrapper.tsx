'use client';

import React from 'react';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onAdd?: () => void;
}

export default function SectionWrapper({ 
  title, 
  children, 
  isOpen, 
  onToggle, 
  onAdd 
}: SectionWrapperProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center p-4">
        <div 
          className="flex items-center gap-3 cursor-pointer w-full"
          onClick={onToggle}
        >
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
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
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
} 