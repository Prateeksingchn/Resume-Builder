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
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Modern Resume Builder
      </h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="section-card">
            <PersonalInfo
              data={personalInfo}
              onChange={setPersonalInfo}
            />
          </div>
          
          <div className="section-card">
            <ProfileSummary
              summary={profileSummary}
              onChange={setProfileSummary}
            />
          </div>
          
          <div className="section-card">
            <EducationSection
              education={education}
              onChange={setEducation}
            />
          </div>
          
          <div className="section-card">
            <ExperienceSection
              experience={experience}
              onChange={setExperience}
            />
          </div>

          <div className="section-card">
            <ProjectsSection
              projects={projects}
              onChange={setProjects}
            />
          </div>
          
          <div className="section-card">
            <SkillsSection
              skills={skills}
              onChange={setSkills}
            />
          </div>
          
          <div className="section-card">
            <CertificationsSection
              certifications={certifications}
              onChange={setCertifications}
            />
          </div>

          <div className="flex justify-center pt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Resume
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div>
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
    </main>
  );
}