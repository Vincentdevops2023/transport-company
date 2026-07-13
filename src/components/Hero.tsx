import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Award, Users } from 'lucide-react';
import heroImage from '../assets/images/hero_bus_cameroon_1783955736789.jpg';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const stats = [
    { value: '15,000+', label: 'Monthly Travelers' },
    { value: '12+', label: 'National Routes' },
    { value: '45+', label: 'Modern Fleet' },
    { value: '99.8%', label: 'Safety Record' }
  ];

  return (
    <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-brand-black" id="home-hero">
      
      {/* Background Image with custom CSS styling */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="TRANSPOCAM Luxury Bus on Cameroon Highway"
          className="w-full h-full object-cover object-center scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Layered Gradient overlays for high text-readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-8 text-left space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/20 border border-brand-green/30 text-brand-green-light font-semibold text-xs uppercase tracking-widest animate-pulse">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              Cameroon's Most Trusted Transit Brand
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Travel Across Cameroon With <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green-light via-brand-gold to-brand-gold-light text-glow-gold">Comfort, Safety & Speed</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              Book bus tickets online in minutes. Reliable intercity transport across Douala, Yaoundé, Buea, Bamenda, and more with affordable fares and excellent 24/7 customer service.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleScrollTo('booking-section')}
                className="bg-brand-green hover:bg-brand-green-light text-white font-display font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-brand-green/20 hover:shadow-brand-green/40 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 text-base"
              >
                Book Ticket Now
                <ArrowRight className="w-5 h-5 text-brand-gold" />
              </button>
              
              <button
                onClick={() => handleScrollTo('routes-section')}
                className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-white font-display font-bold px-8 py-4 rounded-2xl active:scale-95 transition-all duration-200 cursor-pointer text-base"
              >
                View Routes
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-md text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-brand-gold" />
                <span>24/7 Service</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-brand-green-light" />
                <span>Passenger Insurance</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-brand-gold" />
                <span>Premium Quality</span>
              </div>
            </div>

          </div>

          {/* Floating Booking Quick Summary Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="glass-dark p-6 rounded-3xl shadow-2xl space-y-4 border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Live Active Travel Network</span>
              </div>
              <h3 className="font-display font-bold text-white text-lg">Daily Bus Schedules</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                  <span className="text-slate-400">Douala → Yaoundé</span>
                  <span className="font-bold text-brand-gold-light">7:00 AM, 11:30 AM, 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                  <span className="text-slate-400">Douala → Buea</span>
                  <span className="font-bold text-brand-gold-light">Hourly Departures</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                  <span className="text-slate-400">Yaoundé → Garoua</span>
                  <span className="font-bold text-brand-gold-light">6:00 AM, 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Douala → Bamenda</span>
                  <span className="font-bold text-brand-gold-light">6:30 AM, 8:00 PM</span>
                </div>
              </div>

              <button
                onClick={() => handleScrollTo('booking-section')}
                className="w-full py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-bold rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase"
              >
                Instant Online Checkout
              </button>
            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="mt-16 bg-white/5 dark:bg-brand-charcoal/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/5 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <span className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-light text-glow-gold">
                {stat.value}
              </span>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold font-sans">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Decorative Custom Curve transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] text-white dark:text-brand-black fill-current">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" />
        </svg>
      </div>

    </header>
  );
}
