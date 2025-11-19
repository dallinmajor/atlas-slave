import { useState } from 'react';

const Home = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setContactSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setContactSubmitted(false), 3000);
  };

  const membersList = [
    {
      name: 'Dallin Major',
      instrument: 'Vocals + Guitar',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Chris Burt',
      instrument: 'Drums',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Matt Gonzales',
      instrument: 'Guitar',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Levi Wunderlich',
      instrument: 'Bass',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div 
      className="text-white relative"
      style={{
        backgroundImage: `url('/greek_background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Teal-green gradient overlay - spans entire page */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 40, 50, 0.75) 25%, rgba(0, 80, 90, 0.65) 50%, rgba(0, 120, 130, 0.55) 75%, rgba(0, 150, 160, 0.45) 100%)',
          minHeight: '100%'
        }}
      />
      
      {/* Home Section */}
      <section 
        id="home"
        className="min-h-screen pt-24 relative z-10"
      >
        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section - A24 Style */}
          <div className="flex justify-center px-4 pt-4 sm:pt-6 md:pt-8 mb-8 sm:mb-12 md:mb-16">
            <div className="text-center w-full">
              <h1 className="text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[18rem] xl:text-[24rem] font-black leading-none tracking-tight uppercase select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: '0.85' }}>
                ATLAS<br /><span style={{ marginTop: '-0.15em', display: 'block' }}>SLAVE</span>
              </h1>
            </div>
          </div>

          {/* Email Signup Form */}
          <div className="container mx-auto px-4 pb-12 sm:pb-16 md:pb-20" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-center tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Stay Updated</h2>
              <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-light">
                Sign up for our email list to get the latest news, music releases, and show dates.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg bg-black/60 backdrop-blur-sm text-white placeholder-gray-400 border border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all font-light"
                    style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}
                  />
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-teal-600 hover:bg-teal-500 text-white font-black uppercase tracking-wider rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-500/50"
                    style={{ fontWeight: 900 }}
                  >
                    Sign Up
                  </button>
                </div>
                {submitted && (
                  <p className="text-teal-400 text-sm text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Thanks for signing up! Check your email.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 sm:mb-12 text-center tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
            About Us
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 shadow-2xl">
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 font-light" style={{ lineHeight: '1.8' }}>
                Welcome to Atlas Slave. We are a band passionate about creating music that resonates 
                with our audience and tells our story through sound.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 font-light" style={{ lineHeight: '1.8' }}>
                Formed with a shared vision and love for music, we've been crafting our unique sound 
                and connecting with fans around the world. Our journey is just beginning, and we're 
                excited to share it with you.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-light" style={{ lineHeight: '1.8' }}>
                Stay connected with us through our music, live shows, and social media. Thank you for 
                being part of our musical journey.
              </p>
            </div>
            
            {/* Band Members Section */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 sm:mb-12 text-center tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              Band Members
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {membersList.map((member) => (
                <div key={member.name} className="bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 sm:p-8 text-center hover:border-teal-400/50 transition-all duration-300 shadow-xl">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-teal-500/20 to-gray-700 rounded-full mx-auto mb-4 sm:mb-6 border-2 border-teal-500/30"></div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white uppercase tracking-wide" style={{ fontWeight: 700 }}>{member.name}</h3>
                  <p className="text-sm sm:text-base text-teal-300 font-medium uppercase tracking-wider">{member.instrument}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 sm:mb-12 text-center tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
            Music
          </h1>
          <div className="max-w-5xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center mb-12 sm:mb-16 font-light uppercase tracking-wider">
              Check out our latest releases and streaming links
            </p>
            
            {/* Placeholder for music content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              <div className="bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 sm:p-8 md:p-10 hover:border-teal-400/50 transition-all duration-300 shadow-2xl group">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-white uppercase tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Latest Album</h2>
                <p className="text-base sm:text-lg text-gray-300 font-light">Album artwork and details will go here</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 sm:p-8 md:p-10 hover:border-teal-400/50 transition-all duration-300 shadow-2xl group">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-white uppercase tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Latest Single</h2>
                <p className="text-base sm:text-lg text-gray-300 font-light">Single artwork and details will go here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shows Section */}
      <section id="shows" className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 sm:mb-12 text-center tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
            Upcoming Shows
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center mb-12 sm:mb-16 font-light uppercase tracking-wider">
              Catch us live at these upcoming events
            </p>
            
            {/* Placeholder for shows */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 sm:p-8 md:p-10 hover:border-teal-400/50 transition-all duration-300 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 text-white uppercase tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Venue Name</h2>
                    <p className="text-base sm:text-lg text-teal-300 font-medium uppercase tracking-wider">City, State</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-1" style={{ fontWeight: 900 }}>Date TBD</p>
                    <p className="text-base sm:text-lg text-gray-300 font-light uppercase tracking-wider">Time TBD</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-300 mt-8 sm:mt-12 text-lg sm:text-xl font-light uppercase tracking-wider">
                More shows coming soon. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 sm:mb-12 text-center tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
            Contact Us
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center mb-12 sm:mb-16 font-light uppercase tracking-wider">
              Get in touch with us for bookings, collaborations, or just to say hello!
            </p>
            
            <form onSubmit={handleContactSubmit} className="bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 shadow-2xl">
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-bold mb-3 uppercase tracking-wider text-white" style={{ fontWeight: 700 }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg bg-black/60 backdrop-blur-sm text-white border border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all font-light"
                  style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}
                />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-sm sm:text-base font-bold mb-3 uppercase tracking-wider text-white" style={{ fontWeight: 700 }}>
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg bg-black/60 backdrop-blur-sm text-white border border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all font-light"
                  style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm sm:text-base font-bold mb-3 uppercase tracking-wider text-white" style={{ fontWeight: 700 }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleContactChange}
                  required
                  rows={6}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg bg-black/60 backdrop-blur-sm text-white border border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 resize-none transition-all font-light"
                  style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg bg-teal-600 hover:bg-teal-500 text-white font-black uppercase tracking-wider rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-500/50"
                style={{ fontWeight: 900 }}
              >
                Send Message
              </button>
              
              {contactSubmitted && (
                <p className="text-teal-400 text-center text-base sm:text-lg font-medium uppercase tracking-wider">Thanks for your message! We'll get back to you soon.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-teal-500/20 bg-black/40 backdrop-blur-sm" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-xs sm:text-sm text-gray-300 font-light uppercase tracking-wider">
                  © {new Date().getFullYear()} Atlas Slave. All rights reserved.
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <a 
                  href="https://www.tiktok.com/@atlasslaveband" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-xs sm:text-sm font-medium uppercase tracking-wider"
                >
                  TikTok
                </a>
                <a 
                  href="https://www.instagram.com/atlasslaveband/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-xs sm:text-sm font-medium uppercase tracking-wider"
                >
                  Instagram
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-400 transition-colors text-xs sm:text-sm font-medium uppercase tracking-wider"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
