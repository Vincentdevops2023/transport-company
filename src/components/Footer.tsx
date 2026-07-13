import React from 'react';
import { Bus, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  return (
    <footer className="bg-brand-black text-slate-400 font-sans border-t border-slate-900">
      
      {/* Top Footer widget section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand block */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleScrollTo('home-hero')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-green to-brand-green-light flex items-center justify-center text-white font-extrabold text-base shadow">
                T
              </div>
              <div>
                <span className="font-display font-black text-white text-lg tracking-tight">
                  TRANSPOCAM
                </span>
                <span className="text-[9px] text-brand-gold font-bold tracking-widest block uppercase -mt-0.5 leading-none">
                  Moving Cameroon Forward
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
              Cameroon's premium intercity transit provider. Connecting citizens across major cities with speed, comfort, unmatched hospitality, and absolute safety.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2.5 bg-slate-900 hover:bg-brand-green hover:text-white rounded-xl transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-slate-900 hover:bg-brand-green hover:text-white rounded-xl transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-slate-900 hover:bg-brand-green hover:text-white rounded-xl transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold">
              <button onClick={() => handleScrollTo('home-hero')} className="text-left hover:text-white transition-colors cursor-pointer flex items-center gap-1 group">
                Home <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => handleScrollTo('booking-section')} className="text-left hover:text-white transition-colors cursor-pointer flex items-center gap-1 group">
                Book Ticket <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => handleScrollTo('routes-section')} className="text-left hover:text-white transition-colors cursor-pointer flex items-center gap-1 group">
                Routes & Prices <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => handleScrollTo('fleet-section')} className="text-left hover:text-white transition-colors cursor-pointer flex items-center gap-1 group">
                Fleet Details <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Offerings list */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>Passenger Transport</li>
              <li>Parcel Express Cargo</li>
              <li>Door-to-Door Delivery</li>
              <li>Corporate Staff Shuttle</li>
              <li>VIP Shuttle Solutions</li>
            </ul>
          </div>

          {/* Contact support details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Support & Location
            </h4>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-green-light mt-0.5 shrink-0" />
                <span>Bonaberi Terminal, Douala, Cameroon</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <a href="tel:+237679279415" className="hover:text-white transition-colors font-semibold">
                  +237 679 279 415
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-green-light mt-0.5 shrink-0" />
                <a href="mailto:nshombtc@gmail.com" className="hover:text-white transition-colors font-mono">
                  nshombtc@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <span className="text-brand-gold font-bold">Open 24/7 (Always Available)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright line */}
      <div className="bg-brand-charcoal py-6 border-t border-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
          <p>© 2026 TRANSPOCAM. All Rights Reserved. Moving Cameroon Forward.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
