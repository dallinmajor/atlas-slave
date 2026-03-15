import HeroSection from '../components/HeroSection';
import MusicSection from '../components/MusicSection';
import ShowsSection from '../components/ShowsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BackgroundOverlay from '../components/BackgroundOverlay';
import AboutIntro from './../components/AboutIntro';

const Home = () => {
  return (
    <div className="text-white relative page-background">
      <BackgroundOverlay />
      <HeroSection />
      <AboutIntro className="container mx-auto px-4 max-w-4xl mt-[100px]" />
      <ShowsSection />
      <MusicSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
