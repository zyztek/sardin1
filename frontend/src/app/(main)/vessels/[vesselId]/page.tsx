interface VesselDetailPageProps {
  params: {
    vesselId: string;
  };
}

export default function VesselDetailPage({ params }: VesselDetailPageProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Vessel Details</h1>
      <p>Vessel ID: {params.vesselId}</p>
      <p>Detailed information about the vessel.</p>
    </div>
  );
}
