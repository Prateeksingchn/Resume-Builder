'use client';

import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';

interface PersonalInfoData {
  name: string;
  designation: string;
  email: string;
  phone: string;
  portfolio: string;
  github: string;
  twitter: string;
  linkedin: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
}

export default function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SectionWrapper
      title="Personal Information"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <div className="grid grid-cols-1 gap-4">
        {/* Name and Designation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              placeholder="John Doe"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              value={data.designation}
              onChange={(e) => onChange({ ...data, designation: e.target.value })}
              placeholder="Full Stack Developer"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              placeholder="+1 234 567 8900"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Portfolio and Social Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Portfolio Website
              </label>
              <input
                type="url"
                value={data.portfolio}
                onChange={(e) => onChange({ ...data, portfolio: e.target.value })}
                placeholder="https://yourportfolio.com"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="url"
                value={data.github}
                onChange={(e) => onChange({ ...data, github: e.target.value })}
                placeholder="https://github.com/username"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                value={data.linkedin}
                onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <input
                type="url"
                value={data.twitter}
                onChange={(e) => onChange({ ...data, twitter: e.target.value })}
                placeholder="https://twitter.com/username"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}