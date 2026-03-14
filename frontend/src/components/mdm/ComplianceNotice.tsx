'use client';
import React from 'react';

interface ComplianceNoticeProps {
  onAccept: () => void;
}

export default function ComplianceNotice({ onAccept }: ComplianceNoticeProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Advertencia Legal Importante</h2>
        <p className="mb-4">
          Este herramienta es para <strong>propósitos legítimos y educativos</strong>. Solo use en dispositivos propios con autorización.
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-1">
          <li>Propiedad legítima del dispositivo</li>
          <li>Autorización explícita del propietario</li>
          <li>Cumplimiento leyes mexicanas (LFPDPPP)</li>
          <li>Payjoy México - uso responsable</li>
        </ul>
        <div className="flex gap-4">
          <button 
            onClick={onAccept}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Acepto y Continúo
          </button>
        </div>
      </div>
    </div>
  );
}

