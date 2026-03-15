import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import BackgroundOverlay from '../components/BackgroundOverlay';

const About = () => {
  return (
    <div className="text-white relative page-background">
      <BackgroundOverlay />
      <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
