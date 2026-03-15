import EmailSignup from './EmailSignup';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="h-screen pt-20 sm:pt-24 relative z-10 flex flex-col"
      style={{ minHeight: '100vh', maxHeight: '100vh' }}
    >
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 overflow-hidden">
        <div className="flex-shrink-0 text-center w-full mb-4 sm:mb-6 md:mb-8">
          <h1 
            className="text-[4rem] xs:text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-black leading-none tracking-tight uppercase select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" 
            style={{ 
              fontFamily: 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif', 
              fontWeight: 900, 
              letterSpacing: '-0.02em', 
              lineHeight: '0.85' 
            }}
          >
            ATLAS<br />
            <span style={{ marginTop: '-0.15em', display: 'block' }}>SLAVE</span>
          </h1>
        </div>
        <div className="flex-shrink-0 w-full">
          <EmailSignup />
        </div>
      </div>    </section>
  );
};

export default HeroSection;

