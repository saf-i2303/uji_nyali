import PetugasStats from "@/components/petugas/PetugasStats";
import PetugasCharts from "@/components/petugas/PetugasCharts";
import PetugasRecent from "@/components/petugas/PetugasRecent";
import PetugasDemografi from "@/components/petugas/PetugasDemografi";

export default function PetugasDashboardPage() {
  return (
    <div className="p-6">

      <PetugasStats />
    <PetugasCharts />
    <PetugasRecent />
    <PetugasDemografi />
    </div>
  );
}
