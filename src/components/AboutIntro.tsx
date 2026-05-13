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
            We began our journey as four passionate musicians hungry to create incredible music and provide unforgettable experiences for our fans. We are thrilled with the success of our first single, “Color In Grey,” and look forward to the next five songs we will be releasing this year. Rooted in alternative rock, with both pop and metal influences, our sound is a dynamic road full of highs and lows, with countless addictive melodies. Join us for the ride!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutIntro;
