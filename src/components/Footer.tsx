"use client";

import { useState, useEffect } from 'react';

const mediaLinks = [
  { name: 'TikTok', url: 'https://www.tiktok.com/@atlasslaveband' },
  { name: 'Instagram', url: 'https://www.instagram.com/atlasslaveband/' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
];

const Footer = () => {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative z-10 border-t border-teal-500/20 bg-black/40 backdrop-blur-sm" style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}>
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs sm:text-sm text-gray-300 font-light uppercase tracking-wider" suppressHydrationWarning>
                © {year} Atlas Slave. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              {mediaLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-xs sm:text-sm font-medium uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

