import GallerySection from '../components/GallerySection';
import Footer from '../components/Footer';
import BackgroundOverlay from '../components/BackgroundOverlay';

const Gallery = () => {
  return (
    <div
      className="text-white relative"
      style={{
        backgroundImage: `url('/SSS01167 (1).jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <BackgroundOverlay />
      <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Gallery;
