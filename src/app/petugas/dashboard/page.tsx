import PetugasStats from "@/components/petugas/PetugasStats";
import PetugasCharts from "@/components/petugas/PetugasCharts";
import PetugasRecent from "@/components/petugas/PetugasRecent";
import PetugasDemografi from "@/components/petugas/PetugasDemografi";

export default function PetugasDashboardPage() {
  return (
    <div className="p-6 space-y-6 w-full">
      
      {/* Bagian Card Statistik 4 Box */}
      <PetugasStats />

      {/* Bagian Bar Chart */}
      <PetugasCharts />

      {/* Bagian Tabel & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PetugasRecent />
        <PetugasDemografi />
      </div>

    </div>
  );
}
