import React from 'react';
import { FLEET } from '../data/mockData';
import { Armchair, CheckCircle, Bus } from 'lucide-react';

export default function Fleet() {
  const handleScrollToBooking = () => {
    const element = document.getElementById('booking-section');
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
    <section className="py-20 bg-white dark:bg-brand-charcoal" id="fleet-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            Our Elite Fleet
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Designed For Safety, Built For <span className="text-brand-green dark:text-brand-gold">Comfort</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light">
            Whether you want standard fast executive travel or the ultimate premium VIP experience with onboard hostesses, we have the perfect coach class for your journey.
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FLEET.map((vehicle) => {
            return (
              <div 
                key={vehicle.id}
                id={`fleet-card-${vehicle.id}`}
                className="bg-slate-50 dark:bg-brand-black rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-brand-green/20 transition-all duration-300"
              >
                
                {/* Image & badge overlay */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glass Card Name badge */}
                  <div className="absolute top-4 left-4 glass dark:glass-dark px-4 py-1.5 rounded-full flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs border border-white/30 uppercase tracking-widest shadow">
                    <Bus className="w-3.5 h-3.5 text-brand-green dark:text-brand-gold" />
                    {vehicle.name}
                  </div>

                  {/* Seating Capacity badge */}
                  <div className="absolute bottom-4 right-4 bg-brand-green text-white px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-md">
                    <Armchair className="w-3.5 h-3.5 text-brand-gold" />
                    {vehicle.capacity} Reclining Seats
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-display font-extrabold text-2xl text-slate-800 dark:text-slate-100 tracking-tight">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      {vehicle.description}
                    </p>
                    
                    {/* Features checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {vehicle.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-green dark:text-brand-gold shrink-0" />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Pricing and Booking Trigger */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-semibold">
                        Seat Class Addon
                      </span>
                      <span className="text-xl font-extrabold text-slate-800 dark:text-brand-gold">
                        {vehicle.priceXAF === 0 ? 'Standard Base Rate' : vehicle.priceXAF > 0 ? `+${vehicle.priceXAF.toLocaleString()} XAF` : `${vehicle.priceXAF.toLocaleString()} XAF`}
                      </span>
                    </div>

                    <button
                      onClick={handleScrollToBooking}
                      className="bg-brand-green hover:bg-brand-green-dark text-white font-display font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow hover:shadow-lg hover:shadow-brand-green/20 cursor-pointer"
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
