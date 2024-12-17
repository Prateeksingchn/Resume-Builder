'use client';

import React, { useState, useEffect } from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProfileSummary from './components/ProfileSummary';
import EducationSection from './components/Education';
import ExperienceSection from './components/Experience';
import SkillsSection from './components/Skills';
import CertificationsSection from './components/Certifications';
import ProjectsSection from './components/Projects';
import ResumePreview from './components/ResumePreview';
import { HiChevronRight, HiDownload, HiUser, HiDocumentText, HiBriefcase, HiAcademicCap, HiCode, HiCollection, HiBadgeCheck } from 'react-icons/hi';
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

  // Update the handleDownloadPDF function
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const element = document.getElementById('resume-preview');
    
    if (!element) {
      setIsDownloading(false);
      return;
    }
  
    try {
      // Create a deep clone of the resume preview
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Create a container with exact A4 dimensions
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.appendChild(clone);
      
      // Set exact A4 dimensions and styles
      Object.assign(clone.style, {
        width: '210mm',
        minHeight: '297mm',
        margin: '0',
        padding: '10mm',
        boxSizing: 'border-box',
        border: 'none',
        backgroundColor: 'white',
        transform: 'none',
        position: 'relative'
      });
  
      // Fix icon alignment
      const icons = clone.querySelectorAll('.react-icons');
      icons.forEach(icon => {
        Object.assign((icon as HTMLElement).style, {
          display: 'inline-flex',
          verticalAlign: 'middle',
          alignItems: 'center',
          marginRight: '4px'
        });
      });
  
      // Ensure links with icons are properly aligned
      const iconLinks = clone.querySelectorAll('a');
      iconLinks.forEach(link => {
        Object.assign((link as HTMLElement).style, {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        });
      });
  
      // Copy all styles
      const styleSheets = document.styleSheets;
      let styles = '';
      for (let i = 0; i < styleSheets.length; i++) {
        try {
          const rules = styleSheets[i].cssRules || styleSheets[i].rules;
          for (let j = 0; j < rules.length; j++) {
            styles += rules[j].cssText + '\n';
          }
        } catch (e) {
          console.warn('Could not access stylesheet rules');
        }
      }
  
      // Create and append a style element with additional fixes
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        ${styles}
        @page {
          size: A4;
          margin: 0;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .react-icons {
          display: inline-flex !important;
          vertical-align: middle !important;
          align-items: center !important;
          margin-right: 4px !important;
        }
        a {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          text-decoration: none !important;
        }
        svg {
          width: 1em !important;
          height: 1em !important;
        }
      `;
      clone.appendChild(styleElement);
  
      // Append to document
      document.body.appendChild(container);
  
      // Force all fonts to load
      await document.fonts.ready;
  
      // Generate PDF with better settings for multi-page support
      const pdf = await html2pdf().set({
        margin: 0,
        filename: `${personalInfo.name || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          scale: 4,
          useCORS: true,
          letterRendering: true,
          logging: true,
          scrollY: 0,
          windowWidth: clone.offsetWidth,
          windowHeight: clone.offsetHeight
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
          enableLinks: true,
          pagebreak: { 
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break'
          }
        }
      }).from(clone).save();
  
      // Cleanup
      document.body.removeChild(container);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

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
            <div className="sticky top-24 overflow-hidden bg-gray-100 rounded-lg p-4">
                <div 
                    className="transform scale-[0.6] origin-top-left"
                    style={{
                        width: 'fit-content',
                        minHeight: 'fit-content',
                        marginLeft: '50px',
                        position: 'relative',
                        top: '0',
                    }}
                >
                    <div 
                        id="resume-preview" 
                        className="bg-white shadow-xl border border-gray-200"
                        style={{
                            width: '210mm',
                            minHeight: '297mm',
                            padding: '10mm',
                            boxSizing: 'border-box',
                            backgroundColor: 'white',
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
  );
}