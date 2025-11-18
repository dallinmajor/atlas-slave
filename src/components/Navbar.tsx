import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mediaDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'music', label: 'Music' },
    { id: 'shows', label: 'Shows' },
  ];

  const contactItem = { id: 'contact', label: 'Contact' };

  const scrollToSection = (sectionId: string) => {
    const element = sectionId === 'home' 
      ? document.body 
      : document.getElementById(sectionId);
    
    if (element) {
      // Responsive offset based on screen size
      const offset = window.innerWidth < 640 ? 80 : 96; // Smaller offset on mobile
      const elementPosition = sectionId === 'home' 
        ? 0 
        : element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without scrolling
      window.history.pushState(null, '', sectionId === 'home' ? '/' : `#${sectionId}`);
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const mediaLinks = [
    { name: 'TikTok', url: 'https://www.tiktok.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },
    { name: 'YouTube', url: 'https://www.youtube.com' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(event.target as Node)) {
        setIsMediaOpen(false);
      }
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMediaOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMediaOpen, isMobileMenuOpen]);

  // Handle scroll to add background/border and detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'music', 'shows', 'contact'];
      const scrollPosition = scrollY + (window.innerWidth < 640 ? 120 : 150); // Responsive offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      // If at top, set to home
      if (scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check hash on mount
    const hash = window.location.hash.slice(1);
    if (hash && ['about', 'music', 'shows', 'contact'].includes(hash)) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = window.innerWidth < 640 ? 80 : 96; // Responsive offset
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setActiveSection(hash);
        }
      }, 100);
    }

    // Set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-teal-500/30' 
          : 'bg-transparent'
      }`}
      style={{ fontFamily: '"Inter", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif' }}
    >
      <div className={`w-full px-4 sm:px-6 md:px-12 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'py-2 sm:py-3' 
          : 'py-3 sm:py-4'
      }`}>
        <div 
          className={`flex items-center justify-between transition-all duration-700 ease-in-out ${
            isScrolled ? 'h-10 sm:h-12' : 'h-14 sm:h-16'
          }`}
        >
          <button
            onClick={() => scrollToSection('home')}
            className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight transition-all duration-300 hover:opacity-80 uppercase cursor-pointer px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border-2 border-teal-500/50 hover:border-teal-400"
            style={{ fontWeight: 900 }}
          >
            Atlas Slave
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-sm font-bold text-white uppercase tracking-wide transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-teal-400 border-b-2 border-teal-400'
                    : 'hover:text-teal-400'
                }`}
                style={{ fontWeight: 700 }}
              >
                {item.label.toUpperCase()}
              </button>
            ))}

            {/* Media Dropdown */}
            <div className="relative" ref={mediaDropdownRef}>
              <button
                onClick={() => setIsMediaOpen(!isMediaOpen)}
                className={`px-3 py-2 text-sm font-bold text-white uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                  isMediaOpen
                    ? 'text-teal-400'
                    : 'hover:text-teal-400'
                }`}
                style={{ fontWeight: 700 }}
              >
                MEDIA
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${isMediaOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMediaOpen && (
                <div className="absolute top-full mt-2 right-0 min-w-[160px] bg-black/95 border border-teal-500/30 shadow-xl overflow-hidden">
                  {mediaLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-sm font-bold text-white uppercase tracking-wide hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
                      style={{ fontWeight: 700 }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Link */}
            <button
              onClick={() => scrollToSection(contactItem.id)}
              className={`px-3 py-2 text-sm font-bold text-white uppercase tracking-wide transition-all duration-300 ${
                activeSection === contactItem.id
                  ? 'text-teal-400 border-b-2 border-teal-400'
                  : 'hover:text-teal-400'
              }`}
              style={{ fontWeight: 700 }}
            >
              {contactItem.label.toUpperCase()}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            ref={hamburgerButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden relative p-2 text-white hover:text-teal-400 transition-all duration-300"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-4 overflow-hidden transition-all duration-300 border border-teal-500/30 rounded-lg"
            style={{
              background: 'linear-gradient(to bottom, rgb(0, 0, 0) 0%, rgb(0, 40, 50) 25%, rgb(0, 80, 90) 50%, rgb(0, 120, 130) 75%, rgb(0, 150, 160) 100%)'
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left block px-6 py-4 text-sm font-bold text-white uppercase tracking-wide transition-colors border-b border-teal-500/20 last:border-b-0 ${
                  activeSection === item.id
                    ? 'bg-teal-500/20 text-teal-400'
                    : 'hover:bg-teal-500/10 hover:text-teal-400'
                }`}
                style={{ fontWeight: 700 }}
              >
                {item.label.toUpperCase()}
              </button>
            ))}

            {/* Mobile Media Dropdown */}
            <div className="border-b border-teal-500/20">
              <button
                onClick={() => setIsMediaOpen(!isMediaOpen)}
                className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-white uppercase tracking-wide hover:bg-teal-500/10 hover:text-teal-400 transition-colors"
                style={{ fontWeight: 700 }}
              >
                <span>MEDIA</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isMediaOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMediaOpen && (
                <div className="bg-black/50">
                  {mediaLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-10 py-3 text-sm font-bold text-white uppercase tracking-wide hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
                      style={{ fontWeight: 700 }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Contact Link */}
            <button
              onClick={() => scrollToSection(contactItem.id)}
              className={`w-full text-left block px-6 py-4 text-sm font-bold text-white uppercase tracking-wide transition-colors ${
                activeSection === contactItem.id
                  ? 'bg-teal-500/20 text-teal-400'
                  : 'hover:bg-teal-500/10 hover:text-teal-400'
              }`}
              style={{ fontWeight: 700 }}
            >
              {contactItem.label.toUpperCase()}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

