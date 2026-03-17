import SectionTitle from './SectionTitle';

type AboutIntroProps = {
  className?: string;
  cardBottomSpacing?: boolean;
};

const AboutIntro = ({ className = '', cardBottomSpacing = true }: AboutIntroProps) => {
  return (
    <div className={className}>
      <SectionTitle>About Us</SectionTitle>
      <div
        className={`bg-black/65 backdrop-blur-sm border-2 border-teal-500/50 hover:border-teal-400 rounded-lg p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-teal-500/20 relative overflow-hidden group ${cardBottomSpacing ? 'mb-8 sm:mb-12' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:to-teal-500/10 transition-all duration-500 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 font-light group-hover:text-gray-100 transition-colors duration-300" style={{ lineHeight: '1.8' }}>
            Welcome to Atlas Slave. We are a band passionate about creating music that resonates
            with our audience and tells our story through sound.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 font-light group-hover:text-gray-100 transition-colors duration-300" style={{ lineHeight: '1.8' }}>
            Formed with a shared vision and love for music, we&apos;ve been crafting our unique sound
            and connecting with fans around the world. Our journey is just beginning, and we&apos;re
            excited to share it with you.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-light group-hover:text-gray-100 transition-colors duration-300" style={{ lineHeight: '1.8' }}>
            Stay connected with us through our music, live shows, and social media. Thank you for
            being part of our musical journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutIntro;
