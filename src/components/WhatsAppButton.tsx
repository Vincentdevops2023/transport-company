import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('Hello TRANSPOCAM, I would like to inquire about booking a ticket...');

  const phoneNumber = '+237679279415';

  const handleRedirect = () => {
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      
      {/* Mini Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white dark:bg-brand-charcoal rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-[fade-in_0.2s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-green to-brand-green-dark p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-gold"></span>
              </span>
              <div>
                <h4 className="font-display font-bold text-sm">TRANSPOCAM Dispatch</h4>
                <p className="text-[10px] opacity-80 font-light">Typically replies in under 5 minutes</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 bg-slate-50 dark:bg-brand-black/20 text-xs h-36 overflow-y-auto no-scrollbar">
            <div className="bg-white dark:bg-brand-gray p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-slate-100 dark:border-slate-800/80">
              <p className="text-slate-600 dark:text-slate-300">
                Lidda, welcome to TRANSPOCAM! Moving Cameroon Forward. How can our travel agents assist you today? 🇨🇲
              </p>
              <span className="text-[9px] text-slate-400 block mt-1 text-right">Just now</span>
            </div>
          </div>

          {/* Textarea submit */}
          <div className="p-3 bg-white dark:bg-brand-charcoal border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <textarea
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 resize-none bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-800 dark:text-white outline-none focus:ring-1 focus:ring-brand-green focus:border-transparent"
              placeholder="Type your message..."
            />
            <button
              onClick={handleRedirect}
              className="p-2.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl transition-all active:scale-95 cursor-pointer"
              title="Start WhatsApp chat"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-brand-green to-brand-green-light hover:from-brand-green-light hover:to-brand-green text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group relative border border-white/10"
        title="Chat with us on WhatsApp"
      >
        <span className="animate-ping absolute inset-0 rounded-full bg-brand-green/30 group-hover:bg-brand-green/10" />
        <MessageSquare className="w-6 h-6 relative z-10" />
        
        {/* Unread badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow">
            1
          </span>
        )}
      </button>

    </div>
  );
}
