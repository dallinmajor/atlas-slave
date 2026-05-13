"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './SectionTitle';

const CONTACT_EMAIL = 'atlasslaveband@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/atlasslaveband/';

const ContactSection = () => {
  const [sectionRef, opacity, translateY] = useScrollAnimation();

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-12 sm:py-16 md:py-20 relative z-10" 
      style={{ 
        fontFamily: '"Barlow Condensed", system-ui, sans-serif',
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle>Contact Us</SectionTitle>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center mb-12 sm:mb-16 font-light uppercase tracking-wider">
            Reach out for bookings, collabs, or anything else.
          </p>

          <div className="bg-black/65 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 sm:p-8 md:p-10 space-y-5 shadow-2xl">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block rounded-lg border border-teal-500/30 bg-black/50 px-5 py-4 hover:border-teal-400 transition-colors"
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-teal-300 font-bold">Email Us</p>
              <p className="text-xl sm:text-2xl text-white font-black tracking-wide break-all">{CONTACT_EMAIL}</p>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-teal-400/45 bg-teal-500/15 px-5 py-4 hover:bg-teal-500/25 transition-colors"
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-teal-200 font-bold">Fastest Reply</p>
              <div className="mt-1 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 1 1-1.37-1.37 4 4 0 0 1 1.37 1.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <p className="text-xl sm:text-2xl text-white font-black tracking-wide">Instagram @atlasslaveband</p>
              </div>
              <p className="text-sm sm:text-base text-teal-200 mt-1 uppercase tracking-wider">DM us anytime</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

