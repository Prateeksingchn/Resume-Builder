'use client';

import React, { useState, useEffect, useRef } from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProfileSummary from './components/ProfileSummary';
import EducationSection from './components/Education';
import ExperienceSection from './components/Experience';
import SkillsSection from './components/Skills';
import CertificationsSection from './components/Certifications';
import ProjectsSection from './components/Projects';
import ResumePreview from './components/ResumePreview';
import { HiChevronRight, HiDownload, HiUser, HiDocumentText, HiBriefcase, HiAcademicCap, HiCode, HiCollection, HiBadgeCheck } from 'react-icons/hi';
import { useReactToPrint } from 'react-to-print';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
// Remove the unused imports:
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// Navigation items with icons
const navigationItems = [
  { id: 'personal', name: 'Personal Info', icon: HiUser },
  { id: 'summary', name: 'Profile Summary', icon: HiDocumentText },
  { id: 'education', name: 'Education', icon: HiAcademicCap },
  { id: 'experience', name: 'Experience', icon: HiBriefcase },
  { id: 'projects', name: 'Projects', icon: HiCollection },
  { id: 'skills', name: 'Skills', icon: HiCode },
  { id: 'certifications', name: 'Certifications', icon: HiBadgeCheck },
];

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem('personalInfo');
    return saved ? JSON.parse(saved) : {
      name: '',
      designation: '',
      email: '',
      phone: '',
      location: '',
      portfolio: '',
      github: '',
      twitter: '',
      linkedin: '',
    };
  });

  const [profileSummary, setProfileSummary] = useState(() => {
    const saved = localStorage.getItem('profileSummary');
    return saved ? JSON.parse(saved) : '';
  });
  
  const [education, setEducation] = useState<any[]>(() => {
    const saved = localStorage.getItem('education');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [experience, setExperience] = useState<any[]>(() => {
    const saved = localStorage.getItem('experience');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [skills, setSkills] = useState<any[]>(() => {
    const saved = localStorage.getItem('skills');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [certifications, setCertifications] = useState<any[]>(() => {
    const saved = localStorage.getItem('certifications');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [projects, setProjects] = useState<any[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeSection, setActiveSection] = useState('personal');
  const [isDownloading, setIsDownloading] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);

  // Save data to local storage whenever any state changes
  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    localStorage.setItem('profileSummary', JSON.stringify(profileSummary));
    localStorage.setItem('education', JSON.stringify(education));
    localStorage.setItem('experience', JSON.stringify(experience));
    localStorage.setItem('skills', JSON.stringify(skills));
    localStorage.setItem('certifications', JSON.stringify(certifications));
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [personalInfo, profileSummary, education, experience, skills, certifications, projects]);

  // Calculate progress
  const calculateProgress = () => {
    const sections = {
      personal: Object.values(personalInfo).some(val => val !== ''),
      summary: profileSummary !== '',
      education: education.length > 0,
      experience: experience.length > 0,
      skills: skills.length > 0,
      projects: projects.length > 0,
      certifications: certifications.length > 0
    };
    
    const completedSections = Object.values(sections).filter(Boolean).length;
    return Math.round((completedSections / Object.keys(sections).length) * 100);
  };

  const progress = calculateProgress();

  const handleDownloadPDF = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${personalInfo.name || 'Resume'}.pdf`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .resume-container {
          width: 100% !important;
          height: 100% !important;
          transform: none !important;
        }
      }
    `,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Top Bar */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            <span className="text-sm text-gray-500">v1.0</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">ATS-Friendly Resumes</span>
          </div>
          <button 
            id="download-btn"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              isDownloading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold shadow-md`}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <HiDownload className="w-4 h-4" />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-4 py-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="col-span-2">
            <nav className="sticky top-24 space-y-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 space-y-4">
                  {/* Progress indicator */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-900">Progress</span>
                      <span className="text-blue-600 font-medium">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Navigation Items */}
                  <div className="space-y-1">
                    {navigationItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <a 
                          key={item.id}
                          href={`#${item.id}`}
                          className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeSection === item.id 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setActiveSection(item.id)}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                            activeSection === item.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {item.name}
                          <HiChevronRight className={`ml-auto transition-transform duration-200 ${
                            activeSection === item.id ? 'transform rotate-90' : ''
                          }`} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Middle Section - Form */}
          <div className="col-span-5">
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-200">
                <span className="font-medium text-gray-900">Resume Details</span>
                <HiChevronRight className="text-gray-400" />
                <span className="text-blue-600 font-medium">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </span>
              </div>

              {/* Form Sections */}
              <div className="space-y-6">
                {activeSection === 'personal' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 p-6">
                    <PersonalInfo data={personalInfo} onChange={setPersonalInfo} />
                  </div>
                )}
                
                {activeSection === 'summary' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 p-6">
                    <ProfileSummary summary={profileSummary} onChange={setProfileSummary} />
                  </div>
                )}
                
                {activeSection === 'experience' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 p-6">
                    <ExperienceSection experience={experience} onChange={setExperience} />
                  </div>
                )}
                
                {activeSection === 'education' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 p-6">
                    <EducationSection education={education} onChange={setEducation} />
                  </div>
                )}
                
                {activeSection === 'skills' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 p-6">
                    <SkillsSection skills={skills} onChange={setSkills} />
                  </div>
                )}
                
                {activeSection === 'projects' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 p-6">
                    <ProjectsSection projects={projects} onChange={setProjects} />
                  </div>
                )}
                
                {activeSection === 'certifications' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 p-6">
                    <CertificationsSection certifications={certifications} onChange={setCertifications} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Preview */}
          <div className="col-span-5">
            <div className="sticky top-24">
              <div className="bg-gray-100 rounded-lg p-4">
                {/* Download Button */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="w-full mb-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDownloading ? (
                    'Generating PDF...'
                  ) : (
                    <>
                      <HiDownload className="w-5 h-5" />
                      Download PDF
                    </>
                  )}
                </button>

                {/* Resume Preview */}
                <div 
                  className="resume-container"
                  style={{
                    transform: 'scale(0.7)',
                    transformOrigin: 'top left',
                    width: '210mm',
                    marginLeft: '50px'
                  }}
                >
                  <div 
                    ref={resumeRef}
                    id="resume-preview" 
                    className="bg-white shadow-xl"
                    style={{
                      width: '210mm',
                      minHeight: '297mm',
                      padding: '20mm',
                      boxSizing: 'border-box',
                    }}
                  >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}