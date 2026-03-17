interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = '' }: SectionTitleProps) => {
  return (
    <h1 
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 sm:mb-12 text-center tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] ${className}`}
      style={{ fontWeight: 900, letterSpacing: '0.04em', fontFamily: '"Bebas Neue", system-ui, sans-serif' }}
    >
      {children}
    </h1>
  );
};

export default SectionTitle;

