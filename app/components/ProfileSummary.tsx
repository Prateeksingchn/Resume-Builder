'use client';

import React, { useState } from 'react';
import { Info, Copy, ChevronDown, Check } from 'lucide-react';

interface ProfileSummaryProps {
  summary: string;
  onChange: (summary: string) => void;
}

export default function ProfileSummary({ summary, onChange }: ProfileSummaryProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border-b border-gray-200 pb-5 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Profile Summary</h2>
        <p className="text-sm text-gray-500 mt-2">Write a compelling summary of your professional background</p>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-2">Writing Tips:</p>
            <ul className="list-disc ml-4 space-y-1.5">
              <li>Keep it concise (3-4 sentences)</li>
              <li>Highlight your years of experience and key achievements</li>
              <li>Mention your specialization and industry focus</li>
              <li>Include relevant skills and technologies</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              {summary.length}/500 characters
            </span>
          </div>
          
          <textarea
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Example: Results-driven Full Stack Developer with 3+ years of experience in building scalable web applications. Specialized in React, Node.js, and cloud technologies. Proven track record of delivering high-quality solutions and optimizing application performance. Passionate about creating user-friendly interfaces and solving complex technical challenges."
            rows={6}
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 transition-all duration-200 px-4 py-3 rounded-xl border border-gray-200"
          >
            <span>View Example Summaries</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="mt-4 space-y-4">
              {[
                {
                  title: "Senior Full Stack Developer",
                  content: "Innovative Full Stack Developer with 5+ years of experience in developing and maintaining web applications. Proven expertise in React, Node.js, and AWS cloud services, having successfully delivered 20+ projects for clients across fintech and e-commerce sectors. Demonstrated ability to improve application performance by 40% through optimization techniques and best practices. Passionate about creating scalable solutions and mentoring junior developers."
                },
                {
                  title: "Frontend Specialist",
                  content: "Detail-oriented Frontend Developer with 3 years of experience crafting responsive and accessible web interfaces. Specialized in React, TypeScript, and modern CSS frameworks, with a strong focus on component-driven development and design systems. Reduced bundle sizes by 35% through code splitting and lazy loading techniques. Advocate for web accessibility standards and mobile-first design principles."
                },
                {
                  title: "Backend Developer",
                  content: "Results-driven Backend Developer with 4+ years specializing in distributed systems and microservices architecture. Expert in Node.js, Python, and Go, with extensive experience in AWS and Docker containerization. Successfully implemented CI/CD pipelines that reduced deployment time by 60%. Strong background in database optimization and API design, serving applications with 1M+ daily active users."
                },
                {
                  title: "Junior Developer",
                  content: "Motivated Software Developer with 1 year of professional experience and a strong foundation in computer science. Proficient in JavaScript, React, and Node.js, demonstrated through successful completion of multiple full-stack projects. Quick learner who has contributed to improving test coverage by 40% in current role. Eager to grow and take on challenging projects while learning from experienced developers."
                },
                {
                  title: "DevOps Engineer",
                  content: "DevOps Engineer with 4 years of experience streamlining development workflows and managing cloud infrastructure. Expert in AWS, Kubernetes, and Terraform, with a track record of implementing robust CI/CD pipelines. Reduced infrastructure costs by 45% through optimization and automation. Strong advocate for DevSecOps practices and infrastructure as code methodologies."
                }
              ].map((example, index) => (
                <div 
                  key={index} 
                  className="text-sm bg-gray-50 p-5 rounded-xl border border-gray-200 relative hover:border-gray-300 transition-colors duration-200"
                >
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => handleCopy(example.content, index)}
                      className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-gray-200 hover:border-blue-500"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="text-xs font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-xs font-medium">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="font-medium text-gray-900 mb-3 pr-28">{example.title}</div>
                  <div className="text-gray-600 leading-relaxed">{example.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}