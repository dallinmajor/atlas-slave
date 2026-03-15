import HeroSection from '../components/HeroSection';
import MusicSection from '../components/MusicSection';
import ShowsSection from '../components/ShowsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BackgroundOverlay from '../components/BackgroundOverlay';
import AboutIntro from './../components/AboutIntro';

const Home = () => {
  return (
    <div
      className="text-white relative"
      style={{
        backgroundImage: `url('/SSS01167 (1).jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
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
