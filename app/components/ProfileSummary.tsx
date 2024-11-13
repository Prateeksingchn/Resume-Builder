'use client';

import React from 'react';

interface ProfileSummaryProps {
  summary: string;
  onChange: (summary: string) => void;
}

export default function ProfileSummary({ summary, onChange }: ProfileSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Profile Summary</h2>
      </div>
      
      <div>
        <textarea
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a brief summary of your professional background and key strengths. For example:

• Results-driven Full Stack Developer with 3+ years of experience
• Expertise in building scalable web applications using modern technologies
• Strong background in problem-solving and delivering high-quality solutions
• Passionate about creating user-friendly and efficient applications"
          rows={6}
          className="w-full p-2 border rounded font-mono"
        />
      </div>
    </div>
  );
} 