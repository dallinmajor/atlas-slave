import BackgroundOverlay from '../src/components/BackgroundOverlay';
import AboutSection from '../src/components/AboutSection';
import ContactSection from '../src/components/ContactSection';
import Footer from '../src/components/Footer';
import GallerySection from '../src/components/GallerySection';
import HeroSection from '../src/components/HeroSection';
import MusicSection from '../src/components/MusicSection';
import ShowsSection from '../src/components/ShowsSection';
import EmailSignup from '../src/components/EmailSignup';

export default function Page() {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return (
    <main className="text-white relative page-background min-h-screen">
      <BackgroundOverlay maxViewportHeights={1} />
      <div className="absolute inset-0 z-[1] bg-black/60 pointer-events-none" />
      <HeroSection />
      <EmailSignup />
      <AboutSection />
      <MusicSection />
      <ShowsSection referenceDateISO={today} />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}