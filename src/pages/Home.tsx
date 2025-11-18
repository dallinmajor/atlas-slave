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
          <div className="container mx-auto px-4 pb-12 sm:pb-16 md:pb-20">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Stay Updated</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                Sign up for our email list to get the latest news, music releases, and show dates.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/60 backdrop-blur-sm text-white placeholder-gray-400 border border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                  />
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors shadow-lg"
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
      <section id="about" className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center">About Us</h1>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Welcome to Atlas Slave. We are a band passionate about creating music that resonates 
                with our audience and tells our story through sound.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Formed with a shared vision and love for music, we've been crafting our unique sound 
                and connecting with fans around the world. Our journey is just beginning, and we're 
                excited to share it with you.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Stay connected with us through our music, live shows, and social media. Thank you for 
                being part of our musical journey.
              </p>
            </div>
            
            {/* Band Members Section */}
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Band Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {membersList.map((member) => (
                <div key={member.name} className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-700 rounded-full mx-auto mb-3 sm:mb-4"></div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{member.name}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{member.instrument}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center">Music</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-300 text-center mb-8 sm:mb-12">
              Check out our latest releases and streaming links
            </p>
            
            {/* Placeholder for music content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Latest Album</h2>
                <p className="text-sm sm:text-base text-gray-400">Album artwork and details will go here</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Latest Single</h2>
                <p className="text-sm sm:text-base text-gray-400">Single artwork and details will go here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shows Section */}
      <section id="shows" className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center">Upcoming Shows</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-300 text-center mb-8 sm:mb-12">
              Catch us live at these upcoming events
            </p>
            
            {/* Placeholder for shows */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">Venue Name</h2>
                    <p className="text-sm sm:text-base text-gray-400">City, State</p>
                  </div>
                  <div className="mt-3 sm:mt-4 md:mt-0 text-left md:text-right">
                    <p className="text-lg sm:text-xl font-semibold">Date TBD</p>
                    <p className="text-sm sm:text-base text-gray-400">Time TBD</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-400 mt-8">
                More shows coming soon. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center">Contact Us</h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-300 text-center mb-8 sm:mb-12">
              Get in touch with us for bookings, collaborations, or just to say hello!
            </p>
            
            <form onSubmit={handleContactSubmit} className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleContactChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleContactChange}
                  required
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm sm:text-base bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors"
              >
                Send Message
              </button>
              
              {contactSubmitted && (
                <p className="text-teal-400 text-center">Thanks for your message! We'll get back to you soon.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
