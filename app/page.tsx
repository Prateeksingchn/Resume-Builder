'use client';

import React, { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProfileSummary from './components/ProfileSummary';
import EducationSection from './components/Education';
import ExperienceSection from './components/Experience';
import SkillsSection from './components/Skills';
import CertificationsSection from './components/Certifications';
import ProjectsSection from './components/Projects';
import ResumePreview from './components/ResumePreview';

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    portfolio: '',
    github: '',
    twitter: '',
    linkedin: '',
  });

  const [profileSummary, setProfileSummary] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sans">
            Professional Resume Builder
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Create a standout resume in minutes with our intuitive builder
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6 py-8">
            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                <PersonalInfo data={personalInfo} onChange={setPersonalInfo} />
              </div>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Summary</h2>
                <ProfileSummary summary={profileSummary} onChange={setProfileSummary} />
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
                <EducationSection education={education} onChange={setEducation} />
              </div>
            </div>

            {/* Experience Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
                <ExperienceSection experience={experience} onChange={setExperience} />
              </div>
            </div>

            {/* Projects Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
                <ProjectsSection projects={projects} onChange={setProjects} />
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                <SkillsSection skills={skills} onChange={setSkills} />
              </div>
            </div>

            {/* Certifications Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
                <CertificationsSection certifications={certifications} onChange={setCertifications} />
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center pt-6 pb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3">
                <span className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px] rounded-xl" />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 group-hover:transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-lg">Download Resume</span>
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="py-8">
            <ResumePreview
              personalInfo={personalInfo}
              profileSummary={profileSummary}
              education={education}
              experience={experience}
              skills={skills}
              certifications={certifications}
              projects={projects}
            />
          </div>
        </div>
      </div>
    </main>
  );
}