"use client";

import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaMapMarkerAlt,
  FaLink,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

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
  // State to hold the resume data
  const [resumeData, setResumeData] = useState<PreviewProps>({
    personalInfo,
    profileSummary,
    education,
    experience,
    skills,
    certifications,
    projects,
  });

  // Load data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setResumeData(parsedData); // Set the state with loaded data
    }
  }, []);

  // Save data to local storage whenever props change
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Update state when props change
  useEffect(() => {
    setResumeData({
      personalInfo,
      profileSummary,
      education,
      experience,
      skills,
      certifications,
      projects,
    });
  }, [
    personalInfo,
    profileSummary,
    education,
    experience,
    skills,
    certifications,
    projects,
  ]);

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="font-['Arial']" style={{ color: '#000' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {personalInfo.name}
        </h1>
        <p className="text-lg mb-3">
          {personalInfo.designation}
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-2">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <MdEmail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <MdPhone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <FaLinkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <FaGlobe className="w-4 h-4" />
              <span>Portfolio</span>
            </div>
          )}
        </div>
      </div>

      {/* Profile Summary - Adjusted margins */}
      <section className="mb-2">
        <h2 className="text-[14px] font-semibold border-b border-gray-300 pb-1 mb-1">
          Profile Summary
        </h2>
        <p className="text-[12px] text-gray-700 leading-4">
          {resumeData.profileSummary}
        </p>
      </section>

      {/* Experience Section - Adjusted spacing */}
      {resumeData.experience.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-semibold border-b border-gray-300 pb-1 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="text-[12px]">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="text-[13px] font-medium">
                      {exp.position}
                    </div>
                    <div className="text-[12px]">
                      {exp.company} - {exp.location}
                    </div>
                  </div>
                  <div className="text-[12px] text-gray-600">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </div>
                </div>
                <ul className="list-disc pl-4 mt-0.5 space-y-0.5 leading-4">
                  {exp.description
                    .split("\n")
                    .filter(Boolean)
                    .map((desc, index) => (
                      <li key={index} className="text-gray-700">
                        {desc.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {resumeData.education.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-semibold border-b border-gray-300 mb-1">
            Education
          </h2>
          <div className="space-y-2">
            {resumeData.education.map((edu) => (
              <div
                key={edu.id}
                className="text-[12px] grid grid-cols-[1fr_auto] gap-x-4"
              >
                <div>
                  <div className="font-semibold text-gray-900">
                    {edu.school}
                  </div>
                  <div className="font-medium text-gray-800">
                    {edu.degree} {edu.field && `• ${edu.field}`}
                    {edu.gpa && (
                      <span className="text-gray-700"> (GPA: {edu.gpa})</span>
                    )}
                  </div>
                  {edu.location && (
                    <div className="text-gray-700">{edu.location}</div>
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

      {/* Projects Section - Adjusted spacing */}
      {resumeData.projects.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-semibold border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          <div className="space-y-2">
            {resumeData.projects.map((proj) => (
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
                  {proj.description
                    .split("\n")
                    .filter((line) => line.trim())
                    .map((desc, index) => (
                      <li key={index} className="text-gray-700">
                        {desc.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section - Adjusted spacing */}
      {resumeData.skills.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-semibold border-b border-gray-300 pb-1 mb-2">
            Skills
          </h2>
          <div className="space-y-1">
            {Object.entries(
              resumeData.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) {
                  acc[skill.category] = [];
                }
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof resumeData.skills>)
            ).map(([category, categorySkills]) => (
              <div key={category} className="text-[12px] leading-4">
                <span className="font-medium">{category}:</span>{" "}
                <span className="text-gray-700">
                  {categorySkills.map((skill, index) => (
                    <span key={skill.id}>
                      {skill.name}
                      {index < categorySkills.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {resumeData.certifications.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[14px] font-semibold border-b border-gray-300 mb-1">
            Certifications
          </h2>
          <div className="space-y-1">
            {resumeData.certifications.map((cert) => (
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
                  <div className="text-gray-600">{formatDate(cert.date)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
