import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { galleryItems } from '../assets/gallery.ts';
import SectionTitle from './SectionTitle';

const GallerySection = () => {
  const [sectionRef, opacity, translateY] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10"
      style={{
        fontFamily: '"Barlow Condensed", system-ui, sans-serif',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div className="container mx-auto px-4 mt-[60px]">
        <SectionTitle>Gallery</SectionTitle>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {galleryItems.map((photo, index) => (
              <div
                key={`${photo.src}-${index}`}
                className="group relative w-fit overflow-hidden rounded-lg border border-teal-500/30 bg-black/65 backdrop-blur-sm"
              >
                <img
                  src={photo.src}
                  alt={photo.name}
                  className="h-56 sm:h-64 w-auto max-w-[88vw] sm:max-w-none object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
