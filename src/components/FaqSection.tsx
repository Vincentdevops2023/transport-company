import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white dark:bg-brand-charcoal" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            FAQ Section
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Frequently Asked <span className="text-brand-green dark:text-brand-gold">Questions</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
            Got questions about your upcoming trip with TRANSPOCAM? Browse our answers below or contact our hotline directly.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div 
                key={faq.id}
                className="bg-slate-50 dark:bg-brand-black/40 rounded-2xl border border-slate-200/50 dark:border-slate-800 overflow-hidden transition-all duration-200"
              >
                
                {/* Accordion trigger */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-brand-black/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-green shrink-0" />
                    <span className="text-sm sm:text-base font-display font-bold leading-tight">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-green' : ''}`} />
                </button>

                {/* Accordion Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-60 border-t border-slate-200/50 dark:border-slate-800' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {faq.answer}
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
