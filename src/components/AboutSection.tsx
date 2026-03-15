import { useScrollAnimation } from '../hooks/useScrollAnimation';
import AboutIntro from './AboutIntro';
import MemberListItem, { type MemberListItemProps } from './MemberListItem';

const membersList: MemberListItemProps[] = [
  {
    name: 'Dallin Major',
    instrument: 'Vocals + Guitar',
    description: 'Dallin believes in ghosts the same way he believes in Bigfoot; just in case. Known for his wild guitar solos and gritty vocals, he’s been a familiar sound in the Provo music scene for more than 5 years. He hopes to expand that recognition to the world!',
    imageSrc: '/SSS01469.jpg',
  },
  {
    name: 'Chris Burt',
    instrument: 'Drums',
    description: 'Chris has made a living playing drums the last decade, becoming a staple of the Utah music scene. He is constantly asking the question: “Why have one genre when you could have them all? Atlas Slave is where he’s cashed in all his musical experience.',
    imageSrc: '/SSS01249.jpg',
  },
  {
    name: 'Matt Gonzales',
    instrument: 'Guitar',
    description: "Known for his love of food and laughter, Matt is always looking for an excuse to go to Chili's. His take on gentle chords and shredding solos has lead him to become a key member of Atlas Slave. This wide range of emotion has found its way into Atlas Slave and he's excited for everyone to hear and feel it. From grassroots venues to the Eccles, Matt plays music for the people.",
    imageSrc: '/SSS01289.jpg',

  },
  {
    name: 'Levi Wunderlich',
    instrument: 'Bass',
    description: 'Levi Wunderlich is a producer, singer-songwriter, and instrumentalist holding down the bass in the band, Atlas Slave. For the past 4 years, he’s worked professionally in music playing shows all over the U.S.. He’s played for many different artists and bands including Ryan Shupe and The Rubber Band, Alex Sharpe (from Celtic Woman) Alex Boye, The Grimm, and many others. He’s received several songwriting awards and considerations and enjoys collaborating on songs that feel emotionally true and sonically rich. ',
    imageSrc: '/SSS01301.jpg',
  },
];

const AboutSection = () => {
  const [sectionRef, opacity, translateY] = useScrollAnimation();

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10" 
      style={{ 
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <AboutIntro />
          <div className="flex flex-col gap-6 sm:gap-8">
            {membersList.map((member, index) => (
              <div
                key={member.name} 
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <MemberListItem
                  {...member}
                  imageOnRight={index % 2 === 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

