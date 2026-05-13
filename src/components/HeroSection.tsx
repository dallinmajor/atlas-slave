const HeroSection = () => {
  return (
    <section
      id="home"
      className="pt-24 sm:pt-28 md:pt-32 relative z-10 flex flex-col"
    >
      {/* Fork Fest Message */}
      <div className="text-center mb-6 sm:mb-8">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          style={{
            fontFamily: '"Barlow Condensed", system-ui, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.01em'
          }}
        >
          We're Playing Fork Fest This Year!
        </h2>
        <p className="text-base sm:text-lg text-gray-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          Don't miss us at one of the biggest festivals around.
        </p>
      </div>

      {/* Get Tickets Button */}
      <div className="mb-8 sm:mb-10 flex justify-center">
        <a
          href="https://forkfest.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base bg-teal-600 hover:bg-teal-500 text-white font-black uppercase tracking-wider rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-500/50"
          style={{ fontWeight: 900 }}
        >
          Get Tickets
        </a>
      </div>
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4">
        {/* FORKFEST Image */}
        <div className="mb-6 sm:mb-8 md:mb-10 max-w-2xl w-full">
          <img
            src="/FORKFEST.jpg"
            alt="Fork Fest"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Band Name */}
        {/* <div className="flex-shrink-0 text-center w-full">
          <h1 
            className="text-[3rem] xs:text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-none tracking-tight uppercase select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" 
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
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;

