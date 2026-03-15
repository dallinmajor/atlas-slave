import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './SectionTitle';

const ContactSection = () => {
  const [sectionRef, opacity, translateY] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="min-h-screen py-12 sm:py-16 md:py-20 relative z-10" 
      style={{ 
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle>Contact Us</SectionTitle>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center mb-12 sm:mb-16 font-light uppercase tracking-wider">
            Get in touch with us for bookings, collaborations, or just to say hello!
          </p>
          
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 shadow-2xl">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-base font-bold mb-3 uppercase tracking-wider text-white" style={{ fontWeight: 700 }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
            
            {submitted && (
              <p className="text-teal-400 text-center text-base sm:text-lg font-medium uppercase tracking-wider">
                Thanks for your message! We'll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

