'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComplianceNotice from '@/components/mdm/ComplianceNotice';
import PayjoyDetector from '@/components/mdm/PayjoyDetector';
import DeviceStatus from '@/components/mdm/DeviceStatus';
import LogConsole from '@/components/mdm/LogConsole';
import ActionButtons from '@/components/mdm/ActionButtons';

export default function MDMDashboard() {
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [logs, setLogs] = useState<{ timestamp: string; message: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [complianceAccepted, setComplianceAccepted] = useState(false);

  const addLog = (message: string) => setLogs(p => [...p, { timestamp: new Date().toLocaleTimeString(), message }]);

  const handleDiagnose = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/mdm/diagnose');
      setDeviceInfo(res.data);
      addLog(`Dispositivo: ${res.data.brand} ${res.data.model} | Samsung: ${res.data.is_samsung ? 'Sí' : 'No'} | MDM: ${res.data.mdm_type}`);
    } catch (e) { addLog(`Error: ${(e as Error).message}`); }
    setLoading(false);
  };

  const handlePayjoyRemove = async (pkg: string) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/mdm/payjoy-remove', { package: pkg });
      addLog(`Payjoy Remove: Backup OK: ${res.data.backup.success}, Remove: ${res.data.remove.success}, Verify: ${res.data.verify.success}`);
    } catch (e) { addLog(`Error Payjoy: ${(e as Error).message}`); }
    setLoading(false);
  };

  const handleAIFix = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/mdm/ai-fix', { device_info: JSON.stringify(deviceInfo) });
      res.data.results.forEach((r: any) => addLog(`AI CMD: ${r.command} - Success: ${r.result.success}`));
    } catch (e) { addLog(`Error AI: ${(e as Error).message}`); }
    setLoading(false);
  };

  const handleBackup = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/mdm/backup');
      addLog(`Backup: ${res.data.success ? 'OK' : 'Failed - ' + res.data.error}`);
    } catch (e) { addLog(`Error Backup: ${(e as Error).message}`); }
    setLoading(false);
  };

  if (!complianceAccepted) {
    return <ComplianceNotice onAccept={() => setComplianceAccepted(true)} />;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-red-600">🔓 Samsung MDM / Payjoy Remover - México</h1>
      <PayjoyDetector deviceInfo={deviceInfo} onRemove={handlePayjoyRemove} />
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-1"><DeviceStatus deviceInfo={deviceInfo} loading={loading} /></div>
        <div className="col-span-2"><LogConsole logs={logs} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={handleDiagnose} disabled={loading} className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50">
          Diagnóstico
        </button>
        <button onClick={handleBackup} disabled={loading} className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 disabled:opacity-50">
          Backup Datos
        </button>
        <button onClick={handleAIFix} disabled={loading || !deviceInfo} className="bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 disabled:opacity-50 col-span-2">
          AI Fix (Gemini)
        </button>
      </div>
    </div>
  );
}

