'use client';

import React from 'react';
import { MdInfoOutline } from 'react-icons/md';

interface ProfileSummaryProps {
  summary: string;
  onChange: (summary: string) => void;
}

export default function ProfileSummary({ summary, onChange }: ProfileSummaryProps) {
  return (
    <div>
      <div className="border-b pb-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Summary</h2>
        <p className="text-sm text-gray-500 mt-1">Write a compelling summary of your professional background</p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
          <MdInfoOutline className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Writing Tips:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Keep it concise (3-4 sentences)</li>
              <li>Highlight your years of experience and key achievements</li>
              <li>Mention your specialization and industry focus</li>
              <li>Include relevant skills and technologies</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <span className="text-xs text-gray-500">
              {summary.length}/500 characters
            </span>
          </div>
          
          <textarea
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Example: Results-driven Full Stack Developer with 3+ years of experience in building scalable web applications. Specialized in React, Node.js, and cloud technologies. Proven track record of delivering high-quality solutions and optimizing application performance. Passionate about creating user-friendly interfaces and solving complex technical challenges."
            rows={6}
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="mt-4">
          <details className="group">
            <summary className="text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
              <span className="flex items-center gap-2">
                View Example Summary
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
              Innovative Full Stack Developer with 5+ years of experience in developing and maintaining web applications. 
              Proven expertise in React, Node.js, and AWS cloud services, having successfully delivered 20+ projects for 
              clients across fintech and e-commerce sectors. Demonstrated ability to improve application performance by 
              40% through optimization techniques and best practices. Passionate about creating scalable solutions and 
              mentoring junior developers.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
} 