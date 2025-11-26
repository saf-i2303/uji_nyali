import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";

export default function PetugasRecent() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Peminjaman Terbaru</h2>

      <Table className="min-w-full">
        {/* TABLE HEADER */}
        <TableHeader>
          <TableRow className="border-b bg-gray-50 text-left">
            <TableCell isHeader className="p-3 font-semibold text-gray-700">
              Nama Siswa
            </TableCell>
            <TableCell isHeader className="p-3 font-semibold text-gray-700">
              Buku
            </TableCell>
            <TableCell isHeader className="p-3 font-semibold text-gray-700">
              Tanggal
            </TableCell>
            <TableCell isHeader className="p-3 font-semibold text-gray-700">
              Status
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* TABLE BODY */}
        <TableBody>
          {/* ROW 1 */}
          <TableRow className="border-b hover:bg-gray-50">
            <TableCell className="p-3">Aulia</TableCell>
            <TableCell className="p-3">Laskar Pelangi</TableCell>
            <TableCell className="p-3">20 Nov 2025</TableCell>
            <TableCell className="p-3 text-green-600 font-medium">
              Aktif
            </TableCell>
          </TableRow>

          {/* ROW 2 */}
          <TableRow className="border-b hover:bg-gray-50">
            <TableCell className="p-3">Rizky</TableCell>
            <TableCell className="p-3">Filosofi Teras</TableCell>
            <TableCell className="p-3">19 Nov 2025</TableCell>
            <TableCell className="p-3 text-yellow-600 font-medium">
              Pending
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
