'use client';
import React from 'react';

interface PayjoyDetectorProps {
  deviceInfo: any;
  onRemove: (pkg: string) => void;
}

export default function PayjoyDetector({ deviceInfo, onRemove }: PayjoyDetectorProps) {
  if (!deviceInfo || !deviceInfo.mdm_detected?.length) return null;

  return (
    <div className="bg-orange-100 border border-orange-400 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-2 text-orange-800">🛑 Payjoy/Knox Detectado</h3>
      <p className="mb-4">Paquetes encontrados: {deviceInfo.mdm_detected.join(', ')}</p>
      <p className="text-sm text-orange-700 mb-4">
        Dispositivo Samsung: {deviceInfo.is_samsung ? 'Sí' : 'No'} | Tipo: {deviceInfo.mdm_type}
      </p>
      <button 
        onClick={() => onRemove(deviceInfo.mdm_detected[0])}
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
      >
        Eliminar Payjoy (México)
      </button>
    </div>
  );
}

