'use client';

import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

interface PersonalInfoData {
  name: string;
  designation: string;
  email: string;
  phone: string;
  location: string;
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
  return (
    <div>
      {/* Section Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
        <p className="text-sm text-gray-500 mt-1">Add your personal details to create a standout resume</p>
      </div>

      <div className="space-y-8">
        {/* Basic Info Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => onChange({ ...data, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Designation Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Current Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.designation}
                onChange={(e) => onChange({ ...data, designation: e.target.value })}
                placeholder="Full Stack Developer"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => onChange({ ...data, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => onChange({ ...data, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLocationOn className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => onChange({ ...data, location: e.target.value })}
                  placeholder="City, Country"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Social Links</h3>
            <span className="text-xs text-gray-500">Optional</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Portfolio Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Portfolio Website</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGlobe className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={data.portfolio}
                  onChange={(e) => onChange({ ...data, portfolio: e.target.value })}
                  placeholder="https://yourportfolio.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* GitHub Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">GitHub Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGithub className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={data.github}
                  onChange={(e) => onChange({ ...data, github: e.target.value })}
                  placeholder="https://github.com/username"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* LinkedIn Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLinkedin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={data.linkedin}
                  onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Twitter Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Twitter Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTwitter className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={data.twitter}
                  onChange={(e) => onChange({ ...data, twitter: e.target.value })}
                  placeholder="https://twitter.com/username"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}