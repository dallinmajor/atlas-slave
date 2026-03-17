import HeroSection from '../components/HeroSection';
import MusicSection from '../components/MusicSection';
import ShowsSection from '../components/ShowsSection';
import GallerySection from '../components/GallerySection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BackgroundOverlay from '../components/BackgroundOverlay';

const Home = () => {
  return (
    <div className="text-white relative page-background">
      <BackgroundOverlay maxViewportHeights={1} />
      <div className="absolute inset-0 z-[1] bg-black/45 pointer-events-none" />
      <HeroSection />
      <AboutSection />
      <MusicSection />
      <ShowsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
