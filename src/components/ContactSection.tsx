import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate real database receipt
    setSubmitted(true);
    setTimeout(() => {
      // Clean up fields
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 2000);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-brand-black" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            Get In Touch
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Contact Our National <span className="text-brand-green dark:text-brand-gold">Operations Center</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light">
            Have questions about group bookings, baggage allowances, cargo transport, or schedules? Reach out to our 24/7 dedicated support team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-brand-charcoal p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-brand-green/5 rounded-full" />
              
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Head Office
              </h3>

              <div className="space-y-5 relative z-10">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-2xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-semibold">Address</span>
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-semibold mt-0.5">
                      Bonaberi Terminal, Douala, Cameroon
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-2xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-semibold">Hotline</span>
                    <a 
                      href="tel:+237679279415" 
                      className="text-sm text-slate-700 dark:text-slate-200 hover:text-brand-green font-bold block mt-0.5"
                    >
                      +237 679 279 415
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-2xl shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-semibold">Email</span>
                    <a 
                      href="mailto:nshombtc@gmail.com" 
                      className="text-sm text-slate-700 dark:text-slate-200 hover:text-brand-green font-bold block mt-0.5 font-mono"
                    >
                      nshombtc@gmail.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-2xl shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-semibold">Working Hours</span>
                    <p className="text-sm text-brand-green dark:text-brand-gold font-bold mt-0.5 flex items-center gap-1.5">
                      Open 24 Hours (24/7)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Promo Box */}
            <div className="bg-gradient-to-br from-brand-charcoal to-brand-black p-6 rounded-3xl border border-white/5 text-white">
              <h4 className="font-display font-bold text-sm text-brand-gold flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                Live WhatsApp Chat
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 font-light leading-relaxed">
                Need immediate ticketing help on WhatsApp? Click the floating WhatsApp button on the bottom right to begin a chat with our dispatch agents instantly.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-8 bg-white dark:bg-brand-charcoal p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                  Message Transmitted Successfully!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm font-light">
                  Thank you for reaching out to TRANSPOCAM. Our support division will review your inquiry and follow up within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-slate-100 dark:bg-brand-gray hover:bg-slate-200 dark:hover:bg-brand-gray/80 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  Transmit an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-brand-black border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+237 6XX XX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-brand-black border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-mono font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nshombtc@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-brand-black border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Parcel Cargo inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-brand-black border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Inquiry Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter details of your travel or parcel cargo inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-brand-black border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-display font-extrabold p-4 rounded-2xl transition-all duration-200 shadow-md shadow-brand-green/20 hover:shadow-lg hover:shadow-brand-green/30 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  Transmit Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* EMBEDDED MAP PLACEHOLDER FOR BONABERI, DOUALA, CAMEROON */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 h-[380px] w-full">
          {/* Real iframe of Douala Map for high accuracy */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.167812543321!2d9.650893335503892!3d4.078491373507119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106113b28b78996b%3A0xe530c3095dc48b8!2sBonaberi%2C%20Douala!5e0!3m2!1sen!2scm!4v1715600000000!5m2!1sen!2scm" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer"
            title="TRANSPOCAM Head Office Terminal - Bonaberi, Douala, Cameroon"
          />
        </div>

      </div>
    </section>
  );
}
