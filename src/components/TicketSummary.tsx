import React, { useState } from 'react';
import { Booking } from '../types';
import { Download, Printer, CheckCircle, RefreshCw, CreditCard, ArrowRight, MapPin, Calendar, Users, Armchair, Bus, Phone, Mail } from 'lucide-react';

interface TicketSummaryProps {
  booking: Booking;
  onNewBooking: () => void;
}

export default function TicketSummary({ booking, onNewBooking }: TicketSummaryProps) {
  const [paymentStep, setPaymentStep] = useState<'pending' | 'authenticating' | 'completed'>('pending');
  const [momoPin, setMomoPin] = useState('');
  const [momoError, setMomoError] = useState('');

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (booking.paymentMethod === 'momo' || booking.paymentMethod === 'om') {
      setPaymentStep('authenticating');
      setTimeout(() => {
        setPaymentStep('completed');
        booking.status = 'Confirmed';
      }, 3000);
    } else {
      setPaymentStep('completed');
      booking.status = 'Confirmed';
    }
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-brand-charcoal rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
      
      {/* Top bar indicating status */}
      <div className={`p-6 text-center text-white ${
        paymentStep === 'completed' 
          ? 'bg-gradient-to-r from-brand-green to-brand-green-light' 
          : 'bg-gradient-to-r from-amber-500 to-brand-gold-dark text-slate-900'
      }`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          {paymentStep === 'completed' ? (
            <CheckCircle className="w-8 h-8 text-white animate-bounce" />
          ) : (
            <RefreshCw className="w-8 h-8 animate-spin" />
          )}
          <h3 className="font-display font-extrabold text-2xl tracking-tight">
            {paymentStep === 'completed' ? 'Booking Confirmed!' : 'Awaiting Mobile Money Payment'}
          </h3>
        </div>
        <p className="text-sm opacity-90">
          {paymentStep === 'completed' 
            ? 'Your seats are secured! Download or print your official e-ticket below.' 
            : `Please authorize the payment prompt sent to your mobile phone: ${booking.phone}`}
        </p>
      </div>

      <div className="p-8">
        
        {/* PAYMENT FLOW PENDING */}
        {paymentStep === 'pending' && (
          <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="font-display font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-brand-green" />
              Cameroon Mobile Payment Gateway
            </h4>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              You selected <span className="font-bold uppercase text-brand-green">{booking.paymentMethod === 'momo' ? 'MTN Mobile Money (MoMo)' : 'Orange Money (OM)'}</span>.
              A push notification has been sent to <span className="font-semibold">{booking.phone}</span>. Please enter your MoMo/OM reference PIN or click the authorization below to simulate the transaction.
            </p>

            <form onSubmit={handleSimulatePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
                  Confirm 4-Digit Security PIN (Simulation)
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    pattern="\d{4}"
                    placeholder="••••"
                    value={momoPin}
                    onChange={(e) => {
                      setMomoPin(e.target.value.replace(/\D/g, ''));
                      setMomoError('');
                    }}
                    required
                    className="w-32 text-center text-xl tracking-widest font-mono p-3 bg-white dark:bg-brand-gray border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent dark:text-white"
                  />
                  <button
                    type="submit"
                    className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white font-display font-semibold px-6 rounded-xl transition-all duration-200 shadow-md shadow-brand-green/20 hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    Authorize {booking.totalPrice.toLocaleString()} XAF
                  </button>
                </div>
                {momoError && <p className="text-red-500 text-xs mt-1.5">{momoError}</p>}
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 italic">
                  *This is a fully functional offline simulation. No real money will be charged.
                </p>
              </div>
            </form>
          </div>
        )}

        {paymentStep === 'authenticating' && (
          <div className="mb-8 p-12 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <RefreshCw className="w-12 h-12 text-brand-gold animate-spin mb-4" />
            <h4 className="font-display font-bold text-slate-800 dark:text-slate-100 text-lg">
              Processing Secure Network Handshake
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
              Connecting with the Cameroon telecom operator to verify funds. Please wait...
            </p>
          </div>
        )}

        {/* OFFICIAL E-TICKET (PRINTABLE BOARDING PASS) */}
        <div id="printable-boarding-pass" className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-6 bg-slate-50/50 dark:bg-brand-charcoal relative overflow-hidden shadow-inner">
          
          {/* Side Circle Notches (Classic ticket shape) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-6 bg-white dark:bg-brand-charcoal rounded-full border-r-2 border-slate-300 dark:border-slate-700" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-6 h-6 bg-white dark:bg-brand-charcoal rounded-full border-l-2 border-slate-300 dark:border-slate-700" />

          {/* Ticket Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-dashed border-slate-300 dark:border-slate-700">
            <div>
              <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Official E-Ticket
              </span>
              <h4 className="font-display font-extrabold text-2xl text-slate-800 dark:text-slate-100 mt-1.5 flex items-center gap-2">
                TRANSPOCAM
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">Moving Cameroon Forward</p>
            </div>
            
            <div className="text-right sm:text-right">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block uppercase tracking-wider">
                Booking Reference
              </span>
              <span className="text-xl font-mono font-bold text-brand-gold-dark dark:text-brand-gold tracking-wider">
                {booking.reference}
              </span>
            </div>
          </div>

          {/* Journey Layout */}
          <div className="py-6 border-b border-dashed border-slate-300 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              
              {/* Departure */}
              <div className="flex items-start gap-3">
                <div className="p-3 bg-brand-green/10 text-brand-green rounded-xl mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Departure City</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{booking.departure}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Bonaberi Terminal</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-full flex items-center gap-1">
                  <div className="h-[2px] bg-slate-300 dark:bg-slate-700 flex-1 border-dashed" />
                  <ArrowRight className="w-5 h-5 text-brand-gold" />
                  <div className="h-[2px] bg-slate-300 dark:bg-slate-700 flex-1 border-dashed" />
                </div>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                  Express Route
                </span>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-3 md:justify-end md:text-right">
                <div className="md:order-1">
                  <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Destination</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{booking.destination}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Central Hub Terminal</span>
                </div>
                <div className="p-3 bg-brand-gold/10 text-brand-gold-dark rounded-xl mt-1 md:order-2">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

            </div>
          </div>

          {/* Meta Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-dashed border-slate-300 dark:border-slate-700 text-sm">
            <div>
              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Departure Date</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {booking.departureDate}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Bus Coach Type</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Bus className="w-4 h-4 text-slate-400" />
                {booking.busType}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Selected Seats</span>
              <span className="font-semibold text-brand-gold-dark dark:text-brand-gold flex items-center gap-1.5 font-mono text-base">
                <Armchair className="w-4 h-4" />
                {booking.selectedSeats.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Total Passengers</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                {booking.passengers} Passenger{booking.passengers > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Passenger Contact Info & Pricing */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6">
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Passenger Details</span>
              <h5 className="font-display font-bold text-slate-800 dark:text-slate-200">{booking.fullName}</h5>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {booking.phone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {booking.email}</span>
              </div>
            </div>

            <div className="bg-slate-200/50 dark:bg-brand-gray p-4 rounded-2xl text-right min-w-[200px] border border-slate-300/30">
              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Total Paid Fare</span>
              <span className="text-2xl font-extrabold text-brand-green dark:text-brand-green-light">
                {booking.totalPrice.toLocaleString()} <span className="text-xs font-bold text-slate-600 dark:text-slate-400">XAF</span>
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1 italic">Taxes & Insurance Included</span>
            </div>
          </div>

          {/* Ticket Footer barcode/QR mock */}
          <div className="mt-8 pt-6 border-t border-dashed border-slate-300 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              {/* QR Code Placeholder using styled HTML/CSS */}
              <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-300 flex flex-wrap items-center justify-center content-center relative">
                {/* Simulated QR block layout */}
                <div className="grid grid-cols-4 gap-0.5 w-12 h-12">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2.5 h-2.5 rounded-sm ${
                        (i % 3 === 0 || i % 5 === 1 || i === 0 || i === 3 || i === 12 || i === 15) 
                          ? 'bg-slate-800' 
                          : 'bg-slate-100'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                  ETICKET-{booking.reference}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Scan at Bonaberi boarding gate.
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                Thank you for traveling with TRANSPOCAM.
              </p>
              <p className="text-xs font-bold text-brand-green dark:text-brand-green-light uppercase mt-1">
                Moving Cameroon Forward
              </p>
            </div>
          </div>

        </div>

        {/* Print/Download controls */}
        <div className="mt-8 flex flex-wrap justify-center sm:justify-between items-center gap-4">
          <button
            onClick={onNewBooking}
            className="text-slate-600 dark:text-slate-300 hover:text-brand-green font-display font-medium text-sm flex items-center gap-1 cursor-pointer"
          >
            ← Book Another Ticket
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={triggerPrint}
              className="p-3 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-gray rounded-xl transition-colors duration-200 flex items-center gap-2 text-sm font-semibold cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Ticket
            </button>
            <button
              onClick={() => {
                // Simulate e-ticket PDF download
                alert(`E-Ticket TRANSPOCAM-${booking.reference} download started successfully!`);
              }}
              className="p-3 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl shadow-md shadow-brand-green/20 transition-all duration-200 flex items-center gap-2 text-sm font-semibold cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
