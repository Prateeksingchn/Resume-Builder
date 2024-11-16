'use client';

import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe, FaMapMarkerAlt, FaLink } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  sourceCode?: string;
  techStack?: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  coursework?: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface PreviewProps {
  personalInfo: {
    name: string;
    designation: string;
    email: string;
    phone: string;
    location: string;
    portfolio: string;
    github: string;
    twitter: string;
    linkedin: string;
  };
  profileSummary: string;
  education: Education[];
  experience: Experience[];
  skills: any[];
  certifications: any[];
  projects: Project[];
}

export default function ResumePreview({
  personalInfo,
  profileSummary,
  education,
  experience,
  skills,
  certifications,
  projects,
}: PreviewProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <main className="bg-white rounded-lg shadow-lg p-8 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto font-['Arial']">
      <header className="text-center mb-4">
        <h1 className="text-[26px] font-semibold text-gray-900 tracking-wide">
          {personalInfo.name || 'Your Name'}
        </h1>
        {personalInfo.designation && (
          <h2 className="text-[15px] text-gray-700 font-medium tracking-wide">
            {personalInfo.designation}
          </h2>
        )}
        
        {/* Contact Info */}
        <div className="flex justify-center items-center gap-3 mt-1 text-[12px] flex-wrap">
          {personalInfo.phone && (
            <a 
              href={`tel:${personalInfo.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-1"
            >
              <MdPhone className="w-3 h-3" />
              {personalInfo.phone}
            </a>
          )}
          {personalInfo.email && (
            <a 
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-1 text-black hover:text-gray-600"
            >
              <MdEmail className="w-4 h-4" />
              {personalInfo.email}
            </a>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1 text-black">
              <FaMapMarkerAlt className="w-4 h-4" />
              {personalInfo.location}
            </span>
          )}
        </div>
        <div className="flex justify-center gap-4 mt-1 text-[12px]">
          {personalInfo.twitter && (
            <a 
              href={personalInfo.twitter}
              className="flex items-center gap-1 text-black hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-3 h-3" />
              <span className="border-b border-black">Twitter</span>
            </a>
          )}
          {personalInfo.linkedin && (
            <a 
              href={personalInfo.linkedin}
              className="flex items-center gap-1 text-black hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-4 h-4" />
              <span className="border-b border-black">LinkedIn</span>
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github}
              className="flex items-center gap-1 text-black hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-4 h-4" />
              <span className="border-b border-black">GitHub</span>
            </a>
          )}
          {personalInfo.portfolio && (
            <a 
              href={personalInfo.portfolio}
              className="flex items-center gap-1 text-black hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe className="w-4 h-4" />
              <span className="border-b border-black">Portfolio</span>
            </a>
          )}
        </div>
      </header>

      <section className="mb-2">
        <h2 className="text-[14px] font-normal border-b border-gray-300 mb-1">Profile Summary</h2>
        <p className="text-[12px] text-gray-700 leading-4">
          {profileSummary}
        </p>
      </section>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-normal border-b border-gray-300 mb-1">Experience</h2>
          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id} className="text-[12px]">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[13px] font-medium">{exp.position}</div>
                    <div className="text-[12px]">{exp.company} - {exp.location}</div>
                  </div>
                  <div className="text-[12px] text-gray-600">
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </div>
                </div>
                <ul className="list-disc pl-4 mt-0.5 space-y-0.5 leading-4">
                  {exp.description.split('\n').filter(Boolean).map((desc, index) => (
                    <li key={index} className="text-gray-700">{desc.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-normal border-b border-gray-300 mb-1">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="text-[12px] grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <div className="font-semibold text-gray-900">{edu.school}</div>
                  <div className="font-medium text-gray-800">
                    {edu.degree} {edu.field && `• ${edu.field}`}
                    {edu.gpa && <span className="text-gray-700"> (GPA: {edu.gpa})</span>}
                  </div>
                  {edu.location && (
                    <div className="text-gray-700">
                      {edu.location}
                    </div>
                  )}
                  {edu.coursework && (
                    <div className="text-gray-700 mt-0.5 leading-4">
                      <span className="font-medium">Relevant Coursework: </span>
                      {edu.coursework}
                    </div>
                  )}
                </div>
                <div className="text-right text-gray-600 whitespace-nowrap">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-normal border-b border-gray-300 mb-1">Projects</h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="text-[12px]">
                {/* Project Name and Links - First Line */}
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold">{proj.name}</span>
                  {proj.url && (
                    <a 
                      href={proj.url}
                      className="text-black hover:text-gray-600 inline-flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                  <span className="text-gray-400">|</span>
                  {proj.sourceCode && (
                    <a 
                      href={proj.sourceCode}
                      className="text-black hover:text-gray-600 inline-flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="w-3 h-3" />
                      <span>Source</span>
                    </a>
                  )}
                </div>

                {/* Tech Stack - Always on Second Line */}
                {proj.techStack && (
                  <div className="text-gray-700 mb-0.5 leading-4">
                    {proj.techStack}
                  </div>
                )}
                
                {/* Project Description */}
                <ul className="list-disc ml-4 space-y-0.5 leading-4">
                  {proj.description.split('\n')
                    .filter(line => line.trim())
                    .map((desc, index) => (
                      <li key={index} className="text-gray-700">{desc.trim()}</li>
                    ))
                  }
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-semibold border-b border-gray-300 mb-1">Skills</h2>
          <div className="space-y-0.5">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) {
                  acc[skill.category] = [];
                }
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof skills>)
            ).map(([category, categorySkills]) => (
              <div key={category} className="text-[12px] leading-4">
                <span className="font-medium">{category}:</span>{' '}
                <span className="text-gray-700">
                  {categorySkills.map((skill, index) => (
                    <span key={skill.id}>
                      {skill.name}
                      {index < categorySkills.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-semibold border-b border-gray-300 mb-1">Certifications</h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-[12px]">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">
                      {cert.url ? (
                        <a 
                          href={cert.url}
                          className="text-black hover:text-gray-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                    </div>
                    <div className="text-gray-600">{cert.issuer}</div>
                  </div>
                  <div className="text-gray-600">
                    {formatDate(cert.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}