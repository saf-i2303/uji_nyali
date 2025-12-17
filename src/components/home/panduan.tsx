"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CreditCard,
  AlertCircle,
  Clock,
  Calendar,
  Info,
  AlertTriangle,
  Phone,
  Bookmark,
  FileText,
  Check,
  CheckCircle2,
} from "lucide-react";

// Color constant biar konsisten
const COLOR = "#281A14";

export default function PanduanPeminjaman() {
  const [lateDays, setLateDays] = useState(0);

  const lateFeePerDay = 1000;
  const calcFee = (days : any) => Math.max(0, days) * lateFeePerDay;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
          <InfoCard icon={<BookOpen />} label="Maks. Buku" value="2 Buku" />
          <InfoCard icon={<Calendar />} label="Masa Pinjam" value="7 Hari" />
          <InfoCard icon={<CreditCard />} label="Identitas" value="Kartu Identitas" />
          <InfoCard icon={<AlertCircle />} label="Denda" value="Rp 1.000/hari" />
        </div>

        {/* Ringkasan */}
        <Section title="Ringkasan Cepat" number="i">
          <ul className="space-y-3">
            {[
              "Ajukan pinjaman melalui website perpustakaan sekolah",
              "Setelah disetujui, ambil buku dengan menunjukkan kartu identitas sekolah",
              "Masa peminjaman 7 hari, dapat diperpanjang kapan saja",
              "Kembalikan tepat waktu untuk menghindari denda keterlambatan",
            ].map((item, i) => (
              <ListItem key={i} text={item} />
            ))}
          </ul>
        </Section>

        {/* Cara Meminjam */}
        <Section title="Cara Meminjam Buku" number="1">
          <Steps
            steps={[
              "Cari buku di katalog web berdasarkan judul, pengarang, atau kategori",
              "Klik tombol Pinjam dan pilih tanggal pengambilan yang diinginkan",
              "Verifikasi menggunakan kartu identitas yang terdaftar",
              "Tunggu persetujuan dari petugas perpustakaan",
              "Terima notifikasi persetujuan melalui email/WA/aplikasi",
              "Ambil buku di perpustakaan dengan menunjukkan kartu identitas",
            ]}
          />
        </Section>

        {/* Jam Operasional */}
        <Section title="Jam Operasional & Identitas" number="2">
          <OperationalAndIdentity />
        </Section>

        {/* Lama Peminjaman */}
        <Section title="Lama Peminjaman & Denda" number="3">
          <LoanAndFine lateDays={lateDays} setLateDays={setLateDays} calcFee={calcFee} />
        </Section>

        {/* Cara Mengembalikan */}
        <Section title="Cara Mengembalikan Buku" number="4">
          <ReturnSteps
            steps={[
              "Datang ke meja pengembalian sesuai jam operasional",
              "Serahkan buku beserta kartu identitas sekolah",
              "Petugas akan memeriksa kondisi buku",
              "Jika rusak/hilang, wajib mengganti atau membayar",
            ]}
          />
        </Section>

        {/* Tips */}
        <Section title="Tips & Rekomendasi" number="5">
          <Tips />
        </Section>

        <Footer />
      </div>
    </main>
  );
}



function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-8 h-8 text-[#281A14]" />
          <h1 className="text-3xl font-bold text-[#281A14]">
            Panduan Peminjaman Buku
          </h1>
        </div>

        <p className="text-[#281A14] opacity-70">
          Tata cara meminjam dan mengembalikan buku perpustakaan sekolah
        </p>

        <div className="flex items-center gap-2 mt-4 text-sm text-[#281A14] opacity-70">
          <Clock className="w-5 h-5" />
          <span>Senin – Sabtu, 07:00 – 15:00</span>
        </div>
      </div>
    </header>
  );
}

function InfoCard({ icon , label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[#281A14]">
          {icon}
        </div>
        <span className="text-sm text-[#281A14] opacity-70">{label}</span>
      </div>
      <p className="text-2xl font-bold text-[#281A14]">{value}</p>
    </div>
  );
}

function Section({ title, number, children } : { title: string; number: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-8 mb-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#281A14] text-white rounded-lg flex items-center justify-center font-semibold text-sm shadow">
          {number}
        </div>
        <h2 className="text-2xl font-bold text-[#281A14]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-[#281A14]" />
      <span className="text-[#281A14] opacity-80">{text}</span>
    </li>
  );
}

function Steps({ steps }  : { steps: string[] }) {
  return (
    <div className="space-y-3">
      {steps.map((text, i) => (
        <Step key={i} number={i + 1} text={text} />
      ))}
    </div>
  );
}

function Step({ number, text }  : { number: number; text: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition">
      <div className="w-8 h-8 bg-[#281A14] text-white rounded-lg flex items-center justify-center font-semibold text-sm shadow">
        {number}
      </div>
      <p className="text-[#281A14] opacity-80">{text}</p>
    </div>
  );
}

function OperationalAndIdentity() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Jadwal */}
      <div>
        <h3 className="font-semibold text-[#281A14] mb-4">Jadwal Perpustakaan</h3>
        <div className="space-y-2 text-sm">
          <InfoRow  label ="Hari Operasional" value="Senin – Sabtu" />
          <InfoRow label="Jam Buka" value="07:00 – 15:00" />
          <InfoRow label="Istirahat Petugas" value="11:30 – 13:00" />
          <InfoRow label="Hari Minggu" value="Libur" badge />
        </div>

        <InfoBubble text="💡 Hindari jam istirahat untuk pelayanan lebih cepat" />
      </div>

      {/* Identitas */}
      <div>
        <h3 className="font-semibold text-[#281A14] mb-4">Syarat Identitas</h3>
        <div className="space-y-3">
          {[
            "Kartu identitas sekolah yang masih aktif",
            "Terdaftar dalam sistem perpustakaan",
            "Tidak ada tunggakan denda",
            "Berlaku untuk semua warga sekolah",
          ].map((text, i) => (
            <CheckItem key={i} text={text} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, badge } : { label: string; value: string; badge?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-[#281A14] opacity-70">{label}</span>

      {badge ? (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
          {value}
        </span>
      ) : (
        <span className="font-semibold text-[#281A14]">{value}</span>
      )}
    </div>
  );
}

function InfoBubble({ text } : { text: string }) {
  return (
    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
      {text}
    </div>
  );
}

function CheckItem({ text } : { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-[#281A14] text-white rounded flex items-center justify-center shadow">
        <Check className="w-4 h-4" />
      </div>
      <span className="text-[#281A14] opacity-80">{text}</span>
    </div>
  );
}

function LoanAndFine({ lateDays, setLateDays, calcFee } : { lateDays: number; setLateDays: (days: number) => void; calcFee: (days: number) => number }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <StatBox label="Durasi Peminjaman" value="7 Hari" />
        <StatBox label="Perpanjangan" value="Bebas" />
        <StatBox label="Maks. Buku" value="2 Buku" />
      </div>

      <div className="space-y-3 mb-6">
        <Alert type="info" text="Buku referensi umumnya tidak dapat dipinjam dan hanya dibaca di tempat" />
        <Alert type="warning" text="Denda Rp1.000 per hari mulai dari hari setelah tanggal jatuh tempo" />
        <Alert type="info" text="Perpanjangan dapat dilakukan berkali-kali selama buku tidak dipesan peminjam lain" />
      </div>

      <FineCalculator
        lateDays={lateDays}
        setLateDays={setLateDays}
        calcFee={calcFee}
      />
    </>
  );
}

function StatBox({ label, value } : { label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 shadow-sm">
      <p className="text-sm text-[#281A14] opacity-70 mb-2">{label}</p>
      <p className="text-3xl font-bold text-[#281A14]">{value}</p>
    </div>
  );
}

function Alert({ type, text }   : { type: "info" | "warning"; text: string }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };

  const icons = {
    info: <Info className="w-5 h-5 text-blue-700" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-700" />,
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-lg shadow-sm ${styles[type]}`}
    >
      {icons[type]}
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}

function FineCalculator({ lateDays, setLateDays, calcFee }  : { lateDays: number; setLateDays: (days: number) => void; calcFee: (days: number) => number }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
      <h4 className="font-semibold text-[#281A14] mb-4">Kalkulator Denda</h4>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-[#281A14]">Hari terlambat:</label>

          <input
            type="number"
            className="w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#281A14]"
            min={0}
            value={lateDays}
            onChange={(e) => setLateDays(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg">
          <span className="text-sm text-[#281A14] opacity-70">Total:</span>
          <span className="text-xl font-bold text-[#281A14]">
            Rp {calcFee(lateDays).toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}

function ReturnSteps({ steps }  : { steps: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {steps.map((text, i) => (
        <ReturnStep key={i} number={i + 1} text={text} />
      ))}
    </div>
  );
}

function ReturnStep({ number, text }  : { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition">
      <div className="w-7 h-7 bg-[#281A14] text-white rounded flex items-center justify-center font-semibold text-sm shadow">
        {number}
      </div>
      <p className="text-sm text-[#281A14] opacity-80">{text}</p>
    </div>
  );
}

function Tips() {
  const tipList = [
    { icon: <Calendar />, text: "Catat tanggal jatuh tempo di kalender" },
    { icon: <Phone />, text: "Hubungi petugas jika berhalangan" },
    { icon: <Bookmark />, text: "Gunakan pembatas buku" },
    { icon: <FileText />, text: "Simpan kartu identitas dengan baik" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tipList.map((tip, i) => (
        <TipItem key={i} icon={tip.icon} text={tip.text} />
      ))}
    </div>
  );
}

function TipItem({ icon, text } : { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition">
      <span className="text-[#281A14]">{icon}</span>
      <p className="text-sm text-[#281A14] opacity-80">{text}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-[#281A14] opacity-60">
      Kebijakan dapat berubah sewaktu-waktu. Hubungi petugas untuk informasi lebih lanjut.
    </footer>
  );
}
