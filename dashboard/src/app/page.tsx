'use client';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className=\"p-8 max-w-6xl mx-auto\">
      <h1 className=\"text-4xl font-bold mb-8\">Admin Dashboard - Samsung MDM</h1>
      <div className=\"grid grid-cols-2 gap-8\">
        <Link href=\"/stats\" className=\"p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600\">
          <h2 className=\"text-2xl\">Estadísticas</h2>
          <p>Tasa de éxito Payjoy México</p>
        </Link>
        <Link href=\"/reports\" className=\"p-6 bg-green-500 text-white rounded-lg hover:bg-green-600\">
          <h2 className=\"text-2xl\">Reportes</h2>
          <p>Reportes diarios México</p>
        </Link>
      </div>
      <div className=\"mt-8 p-6 bg-yellow-100 border-l-4 border-yellow-500\">
        <p><strong>Advertencia Legal:</strong> Cumplir leyes mexicanas. Ver <Link href=\"/legal\" className=\"underline\">docs/LEGAL-MEXICO.md</Link></p>
      </div>
    </div>
  );
}

