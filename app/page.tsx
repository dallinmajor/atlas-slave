import BackgroundOverlay from '../src/components/BackgroundOverlay';
import AboutSection from '../src/components/AboutSection';
import ContactSection from '../src/components/ContactSection';
import Footer from '../src/components/Footer';
import GallerySection from '../src/components/GallerySection';
import HeroSection from '../src/components/HeroSection';
import MusicSection from '../src/components/MusicSection';
import ShowsSection from '../src/components/ShowsSection';

export default function Page() {
  const today = new Date().toISOString();
  return (
    <main className="text-white relative page-background min-h-screen">
      <BackgroundOverlay maxViewportHeights={1} />
      <div className="absolute inset-0 z-[1] bg-black/60 pointer-events-none" />
      <HeroSection />
      <AboutSection />
      <MusicSection />
      <ShowsSection referenceDateISO={today} />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}