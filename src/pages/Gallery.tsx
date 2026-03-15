import GallerySection from '../components/GallerySection';
import Footer from '../components/Footer';
import BackgroundOverlay from '../components/BackgroundOverlay';

const Gallery = () => {
  return (
    <div className="text-white relative page-background">
      <BackgroundOverlay />
      <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Gallery;
