import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-brand-black" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            Real Reviews
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            What Our Passengers <span className="text-brand-green dark:text-brand-gold">Are Saying</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light">
            We measure our success by the satisfaction of our travelers. Read honest reviews from business travelers, students, and families across Cameroon.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => {
            return (
              <div 
                key={t.id}
                className="bg-white dark:bg-brand-charcoal p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Decorative Quote Icon */}
                <Quote className="w-12 h-12 text-slate-100 dark:text-slate-800 group-hover:text-brand-green/10 transition-colors duration-300 absolute right-6 top-6" />

                <div className="space-y-4 relative z-10">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light italic">
                    "{t.comment}"
                  </p>
                </div>

                {/* Profile Meta */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4.5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-brand-green"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {t.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      {t.role}
                    </p>
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
