import { useState, useEffect, useRef } from 'react';
import { BrandButton, DesktopNavButton, MobileNavButton } from './NavButtons';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mediaDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const brandButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shows', label: 'Shows' },
    { id: 'music', label: 'Music' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
  ];

  const contactItem = { id: 'contact', label: 'Contact' };
  const isHomePage = location.pathname === '/';

  const scrollToHomeSection = (sectionId: string) => {
    const element = sectionId === 'home'
      ? document.body
      : document.getElementById(sectionId);

    if (!element) return;

    const offset = window.innerWidth < 640 ? 80 : 96;
    const elementPosition = sectionId === 'home'
      ? 0
      : element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    window.history.pushState(null, '', sectionId === 'home' ? '/' : `#${sectionId}`);
    setActiveSection(sectionId);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);

    if (sectionId === 'gallery') {
      navigate('/gallery');
      setActiveSection(sectionId);
      return;
    }

    if (sectionId === 'about') {
      navigate('/about');
      setActiveSection(sectionId);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        scrollToHomeSection(sectionId);
      }, 120);
      return;
    }

    scrollToHomeSection(sectionId);
  };

  const mediaLinks = [
    { name: 'TikTok', url: 'https://www.tiktok.com/@atlasslaveband' },
    { name: 'Instagram', url: 'https://www.instagram.com/atlasslaveband/' },
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
    const applyCompactNavbarStyles = () => {
      if (containerRef.current && innerRef.current) {
        const isMobileView = window.innerWidth < 640;
        containerRef.current.style.paddingTop = `${isMobileView ? 5 : 7}px`;
        containerRef.current.style.paddingBottom = `${isMobileView ? 5 : 7}px`;
        innerRef.current.style.height = `${isMobileView ? 36 : 44}px`;
      }

      if (brandButtonRef.current) {
        brandButtonRef.current.style.transform = 'scale(0.92)';
      }
    };

    if (!isHomePage) {
      setIsScrolled(true);
      applyCompactNavbarStyles();

      if (location.pathname === '/gallery') {
        setActiveSection('gallery');
      } else if (location.pathname === '/about') {
        setActiveSection('about');
      }

      return;
    }

    const handleResize = () => {
      // Trigger scroll handler to update styles on resize
      handleScroll();
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Morph navbar shape with a smooth eased curve instead of linear interpolation.
      const scrollTransitionDistance = 240;
      const rawProgress = Math.min(currentScrollY / scrollTransitionDistance, 1);
      const scrollProgress = rawProgress * rawProgress * (3 - 2 * rawProgress); // smoothstep
      const logoScale = 1 - 0.08 * scrollProgress;

      const initialPaddingYMobile = 12;
      const initialPaddingYDesktop = 16;
      const scrolledPaddingYMobile = 5;
      const scrolledPaddingYDesktop = 7;

      const initialHeightMobile = 56;
      const initialHeightDesktop = 64;
      const scrolledHeightMobile = 36;
      const scrolledHeightDesktop = 44;

      const paddingYMobile = initialPaddingYMobile - (initialPaddingYMobile - scrolledPaddingYMobile) * scrollProgress;
      const paddingYDesktop = initialPaddingYDesktop - (initialPaddingYDesktop - scrolledPaddingYDesktop) * scrollProgress;
      const heightMobile = initialHeightMobile - (initialHeightMobile - scrolledHeightMobile) * scrollProgress;
      const heightDesktop = initialHeightDesktop - (initialHeightDesktop - scrolledHeightDesktop) * scrollProgress;

      if (containerRef.current && innerRef.current) {
        const isMobileView = window.innerWidth < 640;
        containerRef.current.style.paddingTop = `${isMobileView ? paddingYMobile : paddingYDesktop}px`;
        containerRef.current.style.paddingBottom = `${isMobileView ? paddingYMobile : paddingYDesktop}px`;
        innerRef.current.style.height = `${isMobileView ? heightMobile : heightDesktop}px`;
      }

      if (brandButtonRef.current) {
        brandButtonRef.current.style.transform = `scale(${logoScale})`;
      }

      // Determine active section based on scroll position
      const sections = ['home', 'shows', 'music', 'contact'];
      const scrollPosition = currentScrollY + (window.innerWidth < 640 ? 120 : 150); // Responsive offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      // If at top, set to home
      if (currentScrollY < 100) {
        setActiveSection('home');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check hash on mount
    const hash = window.location.hash.slice(1);
    if (hash && ['shows', 'music', 'contact'].includes(hash)) {
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

    // Set initial padding and height values
    if (containerRef.current && innerRef.current) {
      const isMobileView = window.innerWidth < 640;
      containerRef.current.style.paddingTop = `${isMobileView ? 12 : 16}px`;
      containerRef.current.style.paddingBottom = `${isMobileView ? 12 : 16}px`;
      innerRef.current.style.height = `${isMobileView ? 56 : 64}px`;
    }

    if (brandButtonRef.current) {
      brandButtonRef.current.style.transform = 'scale(1)';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHomePage, location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? 'bg-black/90 backdrop-blur-md'
          : 'bg-transparent'
        }`}
      style={{ fontFamily: '"Inter", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif' }}
    >
      <div
        ref={containerRef}
        className="w-full px-4 sm:px-6 md:px-12"
      >
        <div
          ref={innerRef}
          className="flex items-center justify-between"
        >
          <BrandButton
            ref={brandButtonRef}
            onClick={() => scrollToSection('home')}
            className="origin-left transition-none"
          >
            Atlas Slave
          </BrandButton>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <DesktopNavButton
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                active={activeSection === item.id}
              >
                {item.label.toUpperCase()}
              </DesktopNavButton>
            ))}

            {/* Contact Link */}
            <DesktopNavButton
              onClick={() => scrollToSection(contactItem.id)}
              active={activeSection === contactItem.id}
            >
              {contactItem.label.toUpperCase()}
            </DesktopNavButton>

            {/* Media Dropdown */}
            <div className="relative" ref={mediaDropdownRef}>
              <DesktopNavButton
                onClick={() => setIsMediaOpen(!isMediaOpen)}
                active={isMediaOpen}
                className="flex items-center gap-2"
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
              </DesktopNavButton>

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
              <MobileNavButton
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                active={activeSection === item.id}
                showDivider={item.id !== navItems[navItems.length - 1].id}
              >
                {item.label.toUpperCase()}
              </MobileNavButton>
            ))}

            {/* Mobile Contact Link */}
            <MobileNavButton
              onClick={() => scrollToSection(contactItem.id)}
              active={activeSection === contactItem.id}
              showDivider={true}
            >
              {contactItem.label.toUpperCase()}
            </MobileNavButton>

            {/* Mobile Media Dropdown */}
            <div>
              <MobileNavButton
                onClick={() => setIsMediaOpen(!isMediaOpen)}
                className="flex items-center justify-between"
                showDivider={false}
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
              </MobileNavButton>
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

