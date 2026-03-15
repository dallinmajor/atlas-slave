import { useState } from 'react';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 pb-4 sm:pb-6 md:pb-8" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
      <div className="max-w-md mx-auto">
        <h2 
          className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 md:mb-4 text-center tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
          style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
        >
          Stay Updated
        </h2>
        <p className="text-sm sm:text-base text-gray-200 mb-3 sm:mb-4 md:mb-6 text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-light">
          Sign up for our email list to get the latest news, music releases, and show dates.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 text-sm sm:text-base rounded-lg bg-black/60 backdrop-blur-sm text-white placeholder-gray-400 border border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all font-light"
              style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}
            />
            <button
              type="submit"
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base bg-teal-600 hover:bg-teal-500 text-white font-black uppercase tracking-wider rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-500/50"
              style={{ fontWeight: 900 }}
            >
              Sign Up
            </button>
          </div>
          {submitted && (
            <p className="text-teal-400 text-sm text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Thanks for signing up! Check your email.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailSignup;

