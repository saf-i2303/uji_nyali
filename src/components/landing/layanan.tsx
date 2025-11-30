"use client";

import { BookOpen, Library, FileText } from "lucide-react";
import { useEffect, useState } from "react";

export default function LayananSection() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("layanan");
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Trigger animation saat section masuk viewport
      if (sectionTop < windowHeight * 0.7) {
        const scrollProgress = (windowHeight - sectionTop) / windowHeight;
        const newIndex = Math.floor(scrollProgress * 4);
        setActiveIndex(Math.min(newIndex, 2));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const layanan = [
    {
      title: "PENYEDIAAN KOLEKSI BACAAN",
      desc: "Perpustakaan menyediakan beragam koleksi buku pelajaran, fiksi, nonfiksi, referensi, hingga bahan pengembangan diri untuk mendukung proses belajar siswa.",
      icon: <BookOpen size={42} />,
      side: "left",
      number: "01"
    },
    {
      title: "RUANG BACA NYAMAN",
      desc: "Perpustakaan menghadirkan ruang baca yang tenang dan nyaman, dilengkapi meja belajar dan pencahayaan yang baik sehingga siswa dapat lebih fokus.",
      icon: <Library size={42} />,
      side: "right",
      number: "02"
    },
    {
      title: "LAYANAN PEMINJAMAN BUKU",
      desc: "Peminjaman dan pengembalian buku dilakukan tertata agar siswa dapat mengakses sumber belajar dengan mudah kapan pun dibutuhkan.",
      icon: <FileText size={42} />,
      side: "left",
      number: "03"
    },
  ];

  return (
    <section id="layanan" className="relative w-full py-24 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7C4F39] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7C4F39] rounded-full blur-3xl"></div>
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #281A14 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Headings */}
        <div 
          data-aos="fade-down"
          data-aos-duration="800"
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#281A14] mb-4">
            Layanan Perpustakaan
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Layanan perpustakaan yang mendukung literasi dan kenyamanan belajar siswa
          </p>

          {/* Decorative underline */}
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 bg-linear-to-r from-[#7C4F39] to-[#C7C7C7] rounded-full"></div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col gap-32">
          {layanan.map((item, i) => (
            <div
              key={i}
              data-aos={item.side === "left" ? "fade-right" : "fade-left"}
              data-aos-duration="1000"
              data-aos-delay={i * 200}
              className={`flex items-center gap-10 ${
                item.side === "left" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Number Badge - appears on opposite side */}
              <div 
                className={`hidden md:block text-8xl font-bold text-[#7C4F39]/10 absolute
                  ${item.side === "left" ? "right-10" : "left-10"}`}
                data-aos="fade"
                data-aos-duration="1000"
                data-aos-delay={i * 200 + 300}
              >
                {item.number}
              </div>

              {/* Icon Circle */}
              <div 
                className={`min-w-[120px] min-h-[120px] rounded-full bg-linear-to-br from-white to-gray-50 shadow-xl flex items-center justify-center 
                  transition-all duration-500 transform relative
                  ${activeIndex >= i 
                    ? "scale-100 opacity-100 shadow-2xl" 
                    : "scale-75 opacity-0"
                  }
                  hover:scale-110 hover:shadow-2xl hover:rotate-12`}
                style={{
                  transitionDelay: `${i * 0.3}s`
                }}
              >
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-[#7C4F39]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="text-[#7C4F39] animate-bounce-slow relative z-10">{item.icon}</div>
              </div>

              {/* Card */}
              <div 
                className={`bg-white shadow-md rounded-2xl p-6 max-w-sm border border-gray-100 relative overflow-hidden
                  transition-all duration-700 transform
                  ${activeIndex >= i 
                    ? "translate-x-0 opacity-100" 
                    : item.side === "left" 
                      ? "-translate-x-20 opacity-0" 
                      : "translate-x-20 opacity-0"
                  }
                  hover:shadow-xl hover:-translate-y-2`}
                style={{
                  transitionDelay: `${i * 0.3 + 0.2}s`
                }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#7C4F39]/5 rounded-bl-full"></div>
                
                {/* Number badge on mobile */}
                <div className="md:hidden text-xs font-bold text-[#7C4F39] bg-[#7C4F39]/10 rounded-full px-3 py-1 w-fit mb-3">
                  {item.number}
                </div>

                <h3 className="font-bold text-xl mb-3 text-[#281A14] relative z-10">{item.title}</h3>
                <p className="text-[#281A14] leading-relaxed text-justify relative z-10">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}