'use client';

import React from 'react';

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
        <button
          onClick={addCertification}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Certification
        </button>
      </div>
      {certifications.map((cert) => (
        <div key={cert.id} className="p-4 border rounded-lg space-y-4 relative">
          <button
            onClick={() => removeCertification(cert.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={cert.name}
              onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
              placeholder="Certification Name"
              className="input-field"
            />
            <input
              type="text"
              value={cert.issuer}
              onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
              placeholder="Issuing Organization"
              className="input-field"
            />
            <input
              type="month"
              value={cert.date}
              onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
              placeholder="Date Earned"
              className="input-field"
            />
            <input
              type="url"
              value={cert.url}
              onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
              placeholder="Certification URL (optional)"
              className="input-field"
            />
          </div>
        </div>
      ))}
    </div>
  );
}