import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, Ticket, ShieldCheck, HelpCircle, MessageSquare } from 'lucide-react';
import { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  onCheckTicket: (ref: string) => void;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ theme, toggleTheme, onCheckTicket, onTabChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckTicketOpen, setIsCheckTicketOpen] = useState(false);
  const [ticketRefQuery, setTicketRefQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    
    // If we're on a custom ticket page, let's switch back to general home page first
    onTabChange('home');

    setTimeout(() => {
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
    }, 100);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketRefQuery.trim()) return;
    
    // Normalize format
    const query = ticketRefQuery.trim().toUpperCase();
    if (!query.startsWith('TPC-')) {
      setSearchError('Invalid reference code. Codes start with "TPC-2026-"');
      return;
    }

    onCheckTicket(query);
    setIsCheckTicketOpen(false);
    setIsMobileMenuOpen(false);
    setTicketRefQuery('');
    setSearchError('');
  };

  const navLinks = [
    { label: 'Home', id: 'home-hero' },
    { label: 'Book Ticket', id: 'booking-section' },
    { label: 'Routes & Prices', id: 'routes-section' },
    { label: 'Fleet', id: 'fleet-section' },
    { label: 'Services', id: 'services-section' },
    { label: 'Testimonials', id: 'testimonials-section' },
    { label: 'FAQ', id: 'faq-section' },
    { label: 'Contact', id: 'contact-section' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-brand-black/95 shadow-md py-3 border-b border-slate-100 dark:border-slate-900' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Brand */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleLinkClick('home-hero')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-green to-brand-green-light flex items-center justify-center text-white font-extrabold text-base shadow-md group-hover:scale-105 transition-all">
                T
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-tight text-slate-800 dark:text-white flex items-center">
                  TRANSPOCAM
                </span>
                <span className="text-[10px] text-brand-green dark:text-brand-gold font-bold tracking-widest block uppercase -mt-1 leading-none">
                  Moving Cameroon Forward
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-slate-600 dark:text-slate-300 hover:text-brand-green dark:hover:text-brand-gold font-sans font-medium text-sm transition-all py-1 border-b-2 border-transparent hover:border-brand-green dark:hover:border-brand-gold cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Live Support WhatsApp button */}
              <a
                href="https://wa.me/237679279415?text=Hello%20TRANSPOCAM%20Support%2C%20I%20would%20like%20to%20inquire%20about%20your%20services..."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-brand-green dark:hover:text-brand-gold text-sm font-semibold p-2.5 rounded-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-brand-green dark:hover:border-brand-gold cursor-pointer bg-slate-50/50 dark:bg-brand-gray/20"
                title="Direct Live WhatsApp Support"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green"></span>
                </span>
                <MessageSquare className="w-4 h-4" />
                <span>Live Support</span>
              </a>

              {/* Check ticket button */}
              <button
                onClick={() => setIsCheckTicketOpen(true)}
                className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-brand-green dark:hover:text-brand-gold text-sm font-semibold p-2.5 rounded-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-brand-green dark:hover:border-brand-gold cursor-pointer"
                title="Verify your booking"
              >
                <Search className="w-4 h-4" />
                Check Ticket
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-gray transition-colors cursor-pointer"
                aria-label="Toggle visual theme"
              >
                {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
              </button>

              {/* Booking Shortcut button */}
              <button
                onClick={() => handleLinkClick('booking-section')}
                className="bg-brand-green hover:bg-brand-green-dark text-white font-display font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-brand-green/15 cursor-pointer active:scale-95"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Action & Theme Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setIsCheckTicketOpen(true)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                title="Check Ticket"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-brand-gray text-slate-700 dark:text-slate-300 cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Menu Slide Down */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-brand-black/95 border-b border-slate-200 dark:border-slate-800 shadow-xl transition-all absolute left-0 w-full px-4 py-6 space-y-4">
            <div className="flex flex-col gap-2.5">
              {navLinks.map(link => (
                <button
                  key={`mob-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left py-2 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-gray rounded-xl font-medium text-sm transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <a
                href="https://wa.me/237679279415?text=Hello%20TRANSPOCAM%20Support%2C%20I%20would%20like%20to%20inquire%20about%20your%20services..."
                target="_blank"
                rel="noreferrer"
                className="w-full text-center bg-brand-green/10 border border-brand-green/20 p-3 rounded-xl text-brand-green text-sm font-bold flex items-center justify-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                </span>
                <MessageSquare className="w-4 h-4" /> Live WhatsApp Support
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCheckTicketOpen(true);
                }}
                className="w-full text-center border border-slate-200 dark:border-slate-800 p-3 rounded-xl text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Verify E-Ticket
              </button>
              <button
                onClick={() => handleLinkClick('booking-section')}
                className="w-full text-center bg-brand-green hover:bg-brand-green-dark text-white p-3 rounded-xl text-sm font-bold shadow-md shadow-brand-green/20"
              >
                Book Tickets Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* CHECK TICKET MODAL */}
      {isCheckTicketOpen && (
        <div className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-brand-charcoal rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100 dark:border-slate-800/80 relative overflow-hidden">
            <button
              onClick={() => {
                setIsCheckTicketOpen(false);
                setSearchError('');
              }}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-brand-gray cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Ticket className="w-6 h-6 text-brand-green" />
              <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                Retrieve Your Boarding Pass
              </h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Enter the unique booking reference generated during checkout (e.g., <span className="font-mono font-bold">TPC-2026-X8Z9K</span>) to display, print, or download your official e-ticket.
            </p>

            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  Ticket Reference Code
                </label>
                <input
                  type="text"
                  placeholder="TPC-2026-XXXXX"
                  value={ticketRefQuery}
                  onChange={(e) => {
                    setTicketRefQuery(e.target.value);
                    setSearchError('');
                  }}
                  className="w-full font-mono font-bold text-slate-800 dark:text-white placeholder-slate-400 bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none uppercase tracking-widest text-center"
                  required
                />
                {searchError && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    {searchError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-display font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-brand-green/25 hover:shadow-lg active:scale-98 cursor-pointer"
              >
                Search Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
