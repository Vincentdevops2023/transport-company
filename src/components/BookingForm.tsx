import React, { useState, useEffect } from 'react';
import { CITIES, ROUTES, FLEET } from '../data/mockData';
import { Booking } from '../types';
import SeatSelector from './SeatSelector';
import { ArrowRight, Calendar, Users, Bus, User, Phone, Mail, CreditCard, ChevronRight, CheckCircle2, Ticket } from 'lucide-react';

interface BookingFormProps {
  onBookingComplete: (booking: Booking) => void;
  preSelectedRoute?: { departure: string; destination: string };
}

export default function BookingForm({ onBookingComplete, preSelectedRoute }: BookingFormProps) {
  const [step, setStep] = useState(1);
  
  // Form State
  const [departure, setDeparture] = useState(preSelectedRoute?.departure || 'Douala');
  const [destination, setDestination] = useState(preSelectedRoute?.destination || 'Yaoundé');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengersCount, setPassengersCount] = useState(1);
  const [selectedBusId, setSelectedBusId] = useState('executive');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+237 ');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'om' | 'card' | 'cash'>('momo');

  // Sync pre-selected route if it changes
  useEffect(() => {
    if (preSelectedRoute) {
      setDeparture(preSelectedRoute.departure);
      setDestination(preSelectedRoute.destination);
    }
  }, [preSelectedRoute]);

  // Set minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];

  // Find selected route pricing
  const activeRoute = ROUTES.find(
    r => r.departure === departure && r.destination === destination
  ) || ROUTES[0];

  const selectedBus = FLEET.find(b => b.id === selectedBusId) || FLEET[0];

  // Calculate dynamic fare
  const basePrice = activeRoute ? activeRoute.priceXAF : 5000;
  const busPremium = selectedBus.priceXAF;
  const oneWayPrice = (basePrice + busPremium) * passengersCount;
  const totalPrice = isRoundTrip ? oneWayPrice * 1.85 : oneWayPrice; // 15% discount on round-trip return leg!

  // Reset selected seats if passenger count or bus type changes
  useEffect(() => {
    setSelectedSeats([]);
  }, [passengersCount, selectedBusId, departure, destination]);

  const handleSeatToggle = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatNumber));
    } else if (selectedSeats.length < passengersCount) {
      setSelectedSeats(prev => [...prev, seatNumber].sort((a, b) => a - b));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!departureDate) {
        alert('Please select a departure date.');
        return;
      }
      if (departure === destination) {
        alert('Departure and Destination cities must be different.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (selectedSeats.length !== passengersCount) {
        alert(`Please select exactly ${passengersCount} seat(s) for your trip.`);
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || fullName.trim().length < 3) {
      alert('Please enter a valid full name.');
      return;
    }
    if (phone.trim() === '+237' || phone.trim().length < 8) {
      alert('Please enter a valid Cameroonian phone number.');
      return;
    }

    // Generate automatic booking reference: TPC-[Year]-[Random-String]
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const reference = `TPC-2026-${randomHex}`;

    const newBooking: Booking = {
      reference,
      fullName,
      phone,
      email: email || 'passenger@transpocam.com',
      departure,
      destination,
      departureDate,
      returnDate: isRoundTrip ? returnDate : undefined,
      passengers: passengersCount,
      busType: selectedBus.name,
      selectedSeats,
      paymentMethod,
      totalPrice,
      status: 'Pending Payment',
      bookingDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    onBookingComplete(newBooking);
  };

  const stepClasses = (activeStep: number) => {
    if (step === activeStep) {
      return 'bg-brand-green text-white border-brand-green';
    } else if (step > activeStep) {
      return 'bg-brand-green/20 text-brand-green border-brand-green';
    }
    return 'bg-slate-100 dark:bg-brand-gray text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800';
  };

  return (
    <div className="w-full bg-white dark:bg-brand-charcoal rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden" id="booking-section">
      {/* Dynamic Visual Stepper */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-brand-black/40 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="w-6 h-6 text-brand-green" />
          <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-100">
            Book Ticket Online
          </h3>
        </div>
        
        {/* Step Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs transition-all ${stepClasses(1)}`}>
              1
            </span>
            <span className="hidden sm:inline text-slate-500">Trip</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs transition-all ${stepClasses(2)}`}>
              2
            </span>
            <span className="hidden sm:inline text-slate-500">Seats</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs transition-all ${stepClasses(3)}`}>
              3
            </span>
            <span className="hidden sm:inline text-slate-500">Checkout</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* STEP 1: ROUTE & TRIP CONFIGURATION */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Departure Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Departure City
                </label>
                <div className="relative">
                  <select
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pr-10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium appearance-none"
                  >
                    {CITIES.map(city => (
                      <option key={`dep-${city}`} value={city}>{city}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
                  </div>
                </div>
              </div>

              {/* Destination Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Destination City
                </label>
                <div className="relative">
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pr-10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium appearance-none"
                  >
                    {CITIES.filter(city => city !== departure).map(city => (
                      <option key={`dest-${city}`} value={city}>{city}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
                  </div>
                </div>
              </div>

            </div>

            {/* Travel Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Departure Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={todayStr}
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium"
                  />
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Return Date (Optional)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={isRoundTrip}
                      onChange={(e) => setIsRoundTrip(e.target.checked)}
                      className="rounded border-slate-300 text-brand-green focus:ring-brand-green"
                    />
                    <span className="text-slate-500 font-semibold">Round-trip</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    min={departureDate || todayStr}
                    disabled={!isRoundTrip}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className={`w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium transition-opacity ${!isRoundTrip ? 'opacity-40 cursor-not-allowed' : ''}`}
                  />
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Passengers Count & Bus Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Number of Passengers
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={passengersCount}
                    onChange={(e) => setPassengersCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    className="w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium"
                  />
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 italic">*Max 10 passengers per booking transaction.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Coach Bus Class
                </label>
                <div className="relative">
                  <select
                    value={selectedBusId}
                    onChange={(e) => setSelectedBusId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium appearance-none"
                  >
                    {FLEET.map(b => (
                      <option key={`bus-opt-${b.id}`} value={b.id}>
                        {b.name} {b.priceXAF > 0 ? `(+${b.priceXAF.toLocaleString()} XAF)` : b.priceXAF < 0 ? `(Discount ${Math.abs(b.priceXAF).toLocaleString()} XAF)` : ''}
                      </option>
                    ))}
                  </select>
                  <Bus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Current Selected route summary */}
            <div className="p-5 bg-brand-green/5 dark:bg-brand-green/10 rounded-2xl border border-brand-green/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-brand-green uppercase tracking-wider">Estimated Fare</span>
                <p className="text-sm text-slate-500 dark:text-slate-300 mt-0.5">
                  Route: <span className="font-semibold text-slate-700 dark:text-slate-200">{departure} → {destination}</span> ({activeRoute?.duration || 'Duration unknown'})
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-brand-green dark:text-brand-green-light font-sans">
                  {totalPrice.toLocaleString()} XAF
                </span>
                <p className="text-[10px] text-slate-400">
                  {passengersCount} Ticket{passengersCount > 1 ? 's' : ''} {isRoundTrip ? '(Round-Trip Included)' : '(One-Way)'}
                </p>
              </div>
            </div>

            {/* Next Step Button */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-display font-bold p-4 rounded-2xl transition-all duration-200 shadow-lg shadow-brand-green/20 hover:shadow-brand-green/30 active:scale-98 cursor-pointer text-center flex items-center justify-center gap-2"
            >
              Select Cabin Seat <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: INTERACTIVE SEAT SELECTION */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 dark:bg-brand-black/20 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping" />
              <p>
                Traveling on <strong>{departureDate}</strong> from <strong>{departure} → {destination}</strong> via <strong>{selectedBus.name}</strong>.
              </p>
            </div>

            {/* Embedding Seat Selector */}
            <SeatSelector
              busType={selectedBusId}
              capacity={selectedBus.capacity}
              selectedSeats={selectedSeats}
              passengersCount={passengersCount}
              onSeatToggle={handleSeatToggle}
              seedString={`${departure}-${destination}-${departureDate}-${selectedBusId}`}
            />

            {/* Summary and Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-1/3 bg-slate-100 dark:bg-brand-gray hover:bg-slate-200 dark:hover:bg-brand-gray/80 text-slate-700 dark:text-slate-300 font-display font-semibold p-4 rounded-2xl transition-all duration-200 cursor-pointer text-center"
              >
                Go Back
              </button>
              
              <button
                type="button"
                disabled={selectedSeats.length !== passengersCount}
                onClick={handleNextStep}
                className={`w-2/3 font-display font-bold p-4 rounded-2xl transition-all duration-200 text-center flex items-center justify-center gap-2 ${
                  selectedSeats.length === passengersCount
                    ? 'bg-brand-green hover:bg-brand-green-dark text-white shadow-lg shadow-brand-green/20 cursor-pointer active:scale-98'
                    : 'bg-slate-200 dark:bg-brand-gray text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT DETAILS & SECURE MOBILE MONEY CHECKOUT */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-slate-800 dark:text-slate-200 text-lg border-b border-slate-100 dark:border-slate-800 pb-2">
                Passenger Contact & Payment
              </h4>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Passenger Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your registered ID card name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Mobile Money / Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+237 6XX XX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-mono font-medium"
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 italic">We will send your boarding reference via SMS.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="nshombtc@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-brand-gray border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none font-medium"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 italic">For digital PDF receipt download.</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Select Secure Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {/* MTN MoMo */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      paymentMethod === 'momo'
                        ? 'border-brand-gold bg-brand-gold/10 text-slate-900 dark:text-brand-gold font-bold shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-gray text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                      {paymentMethod === 'momo' && <span className="w-2 h-2 rounded-full bg-brand-gold-dark" />}
                    </span>
                    <span className="text-xs uppercase tracking-wider">MTN MoMo</span>
                    <span className="text-[9px] text-slate-400 font-semibold leading-none mt-0.5">Mobile Money</span>
                  </button>

                  {/* Orange Money */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('om')}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      paymentMethod === 'om'
                        ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-gray text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                      {paymentMethod === 'om' && <span className="w-2 h-2 rounded-full bg-orange-500" />}
                    </span>
                    <span className="text-xs uppercase tracking-wider">Orange OM</span>
                    <span className="text-[9px] text-slate-400 font-semibold leading-none mt-0.5">Orange Money</span>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-brand-green bg-brand-green/10 text-brand-green font-bold shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-gray text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                      {paymentMethod === 'card' && <span className="w-2 h-2 rounded-full bg-brand-green" />}
                    </span>
                    <span className="text-xs uppercase tracking-wider">Visa / Card</span>
                    <span className="text-[9px] text-slate-400 font-semibold leading-none mt-0.5">Credit/Debit</span>
                  </button>

                  {/* Cash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      paymentMethod === 'cash'
                        ? 'border-slate-700 bg-slate-100 dark:bg-brand-gray text-slate-800 dark:text-white font-bold shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-gray text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                      {paymentMethod === 'cash' && <span className="w-2 h-2 rounded-full bg-slate-600" />}
                    </span>
                    <span className="text-xs uppercase tracking-wider">Pay Cash</span>
                    <span className="text-[9px] text-slate-400 font-semibold leading-none mt-0.5">At Terminal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Review Summary */}
            <div className="bg-slate-50 dark:bg-brand-black/20 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 text-sm space-y-2">
              <h5 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                Review Ticket Selection
              </h5>
              <div className="flex justify-between">
                <span className="text-slate-500">Route & Coach:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{departure} → {destination} ({selectedBus.name})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Seats:</span>
                <span className="font-bold text-brand-gold-dark font-mono">{selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travel Date:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{departureDate} {isRoundTrip ? `(Return: ${returnDate})` : ''}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between items-center text-base font-bold">
                <span className="text-slate-800 dark:text-slate-100">Total Price:</span>
                <span className="text-brand-green text-xl">{totalPrice.toLocaleString()} XAF</span>
              </div>
            </div>

            {/* Back & Submit buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-1/3 bg-slate-100 dark:bg-brand-gray hover:bg-slate-200 dark:hover:bg-brand-gray/80 text-slate-700 dark:text-slate-300 font-display font-semibold p-4 rounded-2xl transition-all duration-200 cursor-pointer text-center"
              >
                Go Back
              </button>
              
              <button
                type="submit"
                className="w-2/3 bg-brand-green hover:bg-brand-green-dark text-white font-display font-extrabold p-4 rounded-2xl transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-lg shadow-brand-green/25 active:scale-98 cursor-pointer"
              >
                Generate E-Ticket <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
