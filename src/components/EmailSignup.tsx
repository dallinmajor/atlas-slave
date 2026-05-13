"use client";

import { useState } from 'react';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return;
    }

    setModalEmail(trimmedEmail);
    setFirstName('');
    setLastName('');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: modalEmail.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Failed to submit signup.');
      }

      setIsModalOpen(false);
      setEmail('');
      setModalEmail('');
      setFirstName('');
      setLastName('');
    setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative z-10 container mx-auto pt-8 px-4 pb-4 sm:pb-6 md:pb-8" style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}>
        <div className="max-w-md mx-auto">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 md:mb-4 text-center tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
            style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            Stay Updated
          </h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4 md:mb-6 text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-light">
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
                style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCancel} />

          <div className="relative z-[101] w-full max-w-lg rounded-xl border border-teal-500/40 bg-black/85 p-5 sm:p-6 shadow-2xl">
            <h3
              className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: '"Bebas Neue", system-ui, sans-serif', letterSpacing: '0.03em' }}
            >
              Complete Sign Up
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-300">
              Add your details to finish signing up.
            </p>

            <form onSubmit={handleModalSubmit} className="mt-4 space-y-3">
              <input
                type="email"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full rounded-lg border border-teal-500/30 bg-black/50 px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                  className="w-full rounded-lg border border-teal-500/30 bg-black/50 px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                  className="w-full rounded-lg border border-teal-500/30 bg-black/50 px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-300">{errorMessage}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-500/40 px-4 py-2 text-sm font-bold uppercase tracking-wide text-gray-200 hover:border-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-black uppercase tracking-wide text-white hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailSignup;

