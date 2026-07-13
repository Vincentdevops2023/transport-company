import React from 'react';
import { WHY_CHOOSE_US } from '../data/mockData';
import * as Icons from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-brand-black" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            Premium Transport Provider
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Why Cameroonians Choose <span className="text-brand-green dark:text-brand-gold">TRANSPOCAM</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light">
            We operate under a simple promise: to get you to your destination with absolute safety, complete comfort, and unmatched customer care.
          </p>
        </div>

        {/* Bento/Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            // Dynamically resolve Lucide icons from string keys
            const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;

            return (
              <div 
                key={item.id}
                className="group relative bg-white dark:bg-brand-charcoal p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Decorative background circle */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-brand-green/5 group-hover:bg-brand-gold/10 rounded-full transition-colors duration-300" />

                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green group-hover:bg-brand-gold group-hover:text-brand-black flex items-center justify-center transition-all duration-300 mb-5 shadow-inner">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Text content */}
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 text-lg mb-2">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* High-quality promotional banner */}
        <div className="mt-16 bg-gradient-to-br from-brand-green to-brand-green-dark text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-brand-green/20">
          {/* Abstract graphic */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight">
              Punctual Departures & Safe Drivers 24/7
            </h3>
            <p className="text-sm md:text-base opacity-90 font-light leading-relaxed">
              Our safety compliance unit audits driver fatigue, vehicle telematics, and braking parameters in real-time. With TRANSPOCAM, you travel with professional peace of mind.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 px-4 py-2 rounded-xl">
                <Icons.CheckCircle className="w-4 h-4 text-brand-gold" />
                No Standby Delays
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 px-4 py-2 rounded-xl">
                <Icons.CheckCircle className="w-4 h-4 text-brand-gold" />
                100% Licensed Operators
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 px-4 py-2 rounded-xl">
                <Icons.CheckCircle className="w-4 h-4 text-brand-gold" />
                Satellite GPS Monitored
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
