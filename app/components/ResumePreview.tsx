'use client';

import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  sourceCode?: string;
  techStack?: string;
}

interface PreviewProps {
  personalInfo: any;
  profileSummary: string;
  education: any[];
  experience: any[];
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
    <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto font-sans">
      {/* Personal Information */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.designation && (
          <h2 className="text-lg text-gray-600 mt-1 mb-2">{personalInfo.designation}</h2>
        )}
        <div className="flex justify-center items-center gap-4 mt-2 text-sm flex-wrap">
          {personalInfo.phone && (
            <span className="flex items-center gap-1 text-black">
              <MdPhone className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1 text-black">
              <MdEmail className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
        </div>
        <div className="flex justify-center gap-4 mt-2 text-sm border-t border-gray-200 pt-2">
          {personalInfo.twitter && (
            <a 
              href={personalInfo.twitter}
              className="flex items-center gap-1 text-black hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-4 h-4" />
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
      </div>

      {/* Profile Summary */}
      <div className="mb-3">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Profile Summary</h2>
        <ul className="list-disc pl-5 space-y-0.5">
          {profileSummary.split('\n').filter(line => line.trim()).map((point, index) => (
            <li key={index} className="text-sm text-gray-700">{point.trim()}</li>
          ))}
        </ul>
      </div>

      {/* Experience Section */}
      {experience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-base font-semibold">{exp.position}</div>
                    <div>{exp.company} - {exp.location}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </div>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-0.5">
                  {exp.description.split('\n').filter(line => line.trim()).map((desc, index) => (
                    <li key={index} className="text-gray-700">{desc.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-base font-semibold">{edu.school}</div>
                    <div>{edu.degree} in {edu.field}</div>
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Projects</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{proj.name}</span>
                  {proj.url && (
                    <>
                      <a 
                        href={proj.url}
                        className="text-black hover:text-gray-600 inline-flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGlobe className="w-3 h-3" />
                      </a>
                    </>
                  )}
                  {proj.techStack && (
                    <>
                      <span className="text-gray-400 mx-1">|</span>
                      <span className="text-gray-700">
                        {proj.techStack}
                      </span>
                    </>
                  )}
                  {proj.sourceCode && (
                    <>
                      <a 
                        href={proj.sourceCode}
                        className="text-black hover:text-gray-600 inline-flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source Code
                      </a>
                    </>
                  )}
                </div>
                
                <ul className="list-disc ml-4 text-sm space-y-0.5">
                  {proj.description.split('\n').filter(line => line.trim()).map((desc, index) => (
                    <li key={index} className="text-gray-700">{desc.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Skills</h2>
          <div className="space-y-1">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) {
                  acc[skill.category] = [];
                }
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof skills>)
            ).map(([category, categorySkills]) => (
              <div key={category} className="text-sm">
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
        </div>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm">
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
                  <div className="text-sm text-gray-600">
                    {formatDate(cert.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}