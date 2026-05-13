"use client";

import { useMemo } from 'react';
import { allShowData, sortShowsByTimeline } from '../assets/upcomingShows';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './SectionTitle';
import ShowCard from './ShowCard';

interface ShowsSectionProps {
  referenceDateISO: string;
}

const showDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const ShowsSection = ({ referenceDateISO }: ShowsSectionProps) => {
  const [sectionRef, opacity, translateY] = useScrollAnimation();
  const showData = useMemo(() => sortShowsByTimeline(allShowData, referenceDateISO), [referenceDateISO]);

  return (
    <section 
      ref={sectionRef}
      id="shows" 
      className="py-12 sm:py-16 md:py-20 relative z-10" 
      style={{ 
        fontFamily: '"Barlow Condensed", system-ui, sans-serif',
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle>Upcoming Shows</SectionTitle>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center mb-12 sm:mb-16 font-light uppercase tracking-wider">
            Catch us live at these upcoming events
          </p>
          
          <div className="space-y-6 sm:space-y-8">
            {showData.upcomingShows.map((show, index) => (
              <ShowCard 
                key={`${show.venue}-${showDateKey(show.date)}-${index}`}
                venue={show.venue}
                location={show.location}
                date={show.date}
                time={show.time}
                link={show.link}
                otherBands={show.otherBands}
                isNextShow={index === 0}
                isPastShow={false}
              />
            ))}
            <p className="text-center text-gray-300 mt-8 sm:mt-12 text-lg sm:text-xl font-light uppercase tracking-wider">
              More shows coming soon. Stay tuned!
            </p>

            {showData.pastShows.length > 0 && (
              <>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center mt-12 sm:mt-16 mb-4 sm:mb-6 font-light uppercase tracking-wider">
                  Past Shows
                </p>
                {showData.pastShows.map((show, index) => (
                  <ShowCard
                    key={`past-${show.venue}-${showDateKey(show.date)}-${index}`}
                    venue={show.venue}
                    location={show.location}
                    date={show.date}
                    time={show.time}
                    link={show.link}
                    otherBands={show.otherBands}
                    isPastShow={true}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowsSection;

