import MyNavbar from "@/components/landing/navbar";
import HeroSection from "@/components/landing/Hero";
import AboutSection from "@/components/landing/about";
import LayananSection from "@/components/landing/layanan";
import PanduanSection from "@/components/landing/panduan";
import BeritaSection from "@/components/landing/berita";
import Akhir from "@/components/landing/akhir";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="w-full h-[150vh] bg-white">
      <MyNavbar />
        <HeroSection />
        <AboutSection />
        <LayananSection />
        <PanduanSection />
        <BeritaSection />
        <Akhir />
        <Footer />



          </main>
  );
}

