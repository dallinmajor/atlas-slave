import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = () => {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(64);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // Responsive animation parameters based on screen size
      const isMobile = windowWidth < 640;
      const isTablet = windowWidth >= 640 && windowWidth < 1024;
      
      // Adjust start/end points based on screen size
      // Mobile: start earlier, end later (more forgiving)
      // Desktop: tighter animation window
      const startMultiplier = isMobile ? 0.9 : isTablet ? 0.85 : 0.8;
      const endMultiplier = isMobile ? 0.3 : isTablet ? 0.25 : 0.2;
      
      // Adjust translateY distance based on screen size
      const maxTranslateY = isMobile ? 32 : isTablet ? 48 : 64;
      
      // Use viewport height as base, but ensure minimum animation distance
      const minAnimationDistance = windowHeight * 0.3; // At least 30% of viewport
      const startPoint = windowHeight * startMultiplier;
      const endPoint = windowHeight * endMultiplier;
      // Ensure we have a reasonable animation distance
      const effectiveStartPoint = Math.max(startPoint, endPoint + minAnimationDistance);
      
      // Calculate progress (0 to 1)
      // When rect.top is at effectiveStartPoint, progress = 0
      // When rect.top is at endPoint, progress = 1
      const progress = Math.max(0, Math.min(1, (effectiveStartPoint - rect.top) / (effectiveStartPoint - endPoint)));
      
      // Calculate opacity and translateY based on progress
      const newOpacity = progress;
      const newTranslateY = maxTranslateY * (1 - progress); // Start at maxTranslateY, end at 0px
      
      setOpacity(newOpacity);
      setTranslateY(newTranslateY);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return [sectionRef, opacity, translateY] as const;
};

