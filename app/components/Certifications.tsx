'use client';

import React from 'react';
import { MdAdd, MdDelete, MdInfo, MdVerified, MdLink } from 'react-icons/md';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export default function CertificationsSection({ certifications, onChange }: CertificationsSectionProps) {
  const addCertification = () => {
    onChange([
      ...certifications,
      {
        id: Date.now().toString(),
        name: '',
        issuer: '',
        date: '',
        url: '',
      },
    ]);
  };

  const removeCertification = (id: string) => {
    onChange(certifications.filter((cert) => cert.id !== id));
  };

  const updateCertification = (id: string, field: string, value: string) => {
    onChange(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  return (
    <div>
      {/* Section Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
        <p className="text-sm text-gray-500 mt-1">Add your professional certifications and achievements</p>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 mb-6">
        <MdInfo className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Tips for adding certifications:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Include relevant industry certifications</li>
            <li>Add the exact certification name</li>
            <li>Provide verification links when available</li>
            <li>List certifications in reverse chronological order</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div 
            key={cert.id} 
            className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 relative hover:shadow-md transition-shadow duration-200"
          >
            {/* Certification Entry Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <MdVerified className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Certification #{index + 1}</h3>
              </div>
              <button
                onClick={() => removeCertification(cert.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg group"
              >
                <MdDelete className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certification Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Certification Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Issuing Organization */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Issuing Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  placeholder="e.g., Amazon Web Services"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Issue Date */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Issue Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Verification URL */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Verification URL <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLink className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={cert.url}
                    onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                    placeholder="https://verify.example.com/cert"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Certification Button */}
        <button
          onClick={addCertification}
          className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 hover:bg-blue-50"
        >
          <MdAdd className="w-5 h-5" />
          Add Another Certification
        </button>
      </div>
    </div>
  );
}