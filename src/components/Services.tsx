import React, { useState } from 'react';
import { 
  Bus, 
  Package, 
  Truck, 
  Briefcase, 
  Crown, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Calculator, 
  Info,
  ChevronRight,
  DollarSign,
  Search,
  FileText
} from 'lucide-react';
import ParcelTracking from './ParcelTracking';

interface Metric {
  label: string;
  value: string;
}

interface Step {
  step: string;
  title: string;
  text: string;
}

interface ServiceDetail {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  tagline: string;
  description: string;
  image: string;
  metrics: Metric[];
  features: string[];
  howItWorks: Step[];
  cta: {
    text: string;
    type: 'book' | 'whatsapp';
    textParam?: string;
  };
}

const DETAILED_SERVICES: ServiceDetail[] = [
  {
    id: 'passenger',
    title: 'Passenger Transport',
    icon: Bus,
    tagline: 'Cameroon\'s Gold Standard for Safe & Punctual Intercity Commute',
    description: 'We connect families, businesses, and tourists across Cameroon with our state-of-the-art fleet of Executive and VIP buses. Travel between major economic hubs like Douala, Yaoundé, Buea, Limbe, and Bamenda with absolute peace of mind and luxury travel hostesses.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Weekly Departures', value: '350+ Rides' },
      { label: 'Base Fare Starts At', value: '5,000 XAF' },
      { label: 'Punctuality Rate', value: '98.4%' },
      { label: 'Primary Network', value: 'Nationwide' }
    ],
    features: [
      'State-of-the-art climate-controlled cabins with powerful, silent dual-zone air conditioning.',
      'Complimentary onboard high-speed 5G Wi-Fi connection powered by Orange & MTN networks.',
      'Individual USB and Type-C fast-charging ports at every single passenger seat.',
      'Ergonomic, plush reclining leather seats with generous legroom and adjustable footrests.',
      'Onboard clean restroom facilities on long-distance Luxury Coaches (Garoua & Bamenda routes).',
      'Professional hostesses and complimentary travel snack kits on all VIP departures.'
    ],
    howItWorks: [
      { step: '1', title: 'Book Online', text: 'Select your preferred route, date, and interactive seat on our website.' },
      { step: '2', title: 'Arrive 30m Prior', text: 'Check in your luggage smoothly at our modern digital terminal.' },
      { step: '3', title: 'Board & Relax', text: 'Enjoy unparalleled hospitality, entertainment, and safety en route.' }
    ],
    cta: { text: 'Book Passenger Ticket', type: 'book' }
  },
  {
    id: 'parcel',
    title: 'Parcel Express Cargo',
    icon: Package,
    tagline: 'Same-Day Terminal-to-Terminal Package Shipping & Logistics',
    description: 'Send critical business documents, commercial products, personal goods, and heavy cargo securely across our national terminal network. We offer a computerized, fully tracked parcel handling system that guarantees your cargo arrives safely.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Average Transit Time', value: '4 - 6 Hours' },
      { label: 'Price (up to 5kg)', value: '1,500 XAF' },
      { label: 'Tracking System', value: 'Live Barcode SMS' },
      { label: 'Security Level', value: '24/7 Locked Cage' }
    ],
    features: [
      'Same-day express delivery: Packages sent before noon arrive at the destination terminal on the same day.',
      'Computerized barcode registration and tracking prevents loss and ensures complete transparency.',
      'Automatic instant SMS notifications sent to both sender and recipient upon departure and arrival.',
      'Specialized moisture-proof and climate-controlled cargo compartments for sensitive commercial items.',
      'Valuable goods protection insurance options coverage of up to 1,000,000 XAF.',
      'Heavy cargo handling for agricultural trade, machinery parts, and bulk mercantile shipments.'
    ],
    howItWorks: [
      { step: '1', title: 'Drop Off', text: 'Bring your parcel to any TRANSPOCAM cargo office at our major terminals.' },
      { step: '2', title: 'We Tag & Secure', text: 'Our staff weighs, registers, barcodes, and locks your items in secure hold.' },
      { step: '3', title: 'SMS & Pick Up', text: 'Recipient receives a passcode via SMS to instantly collect at the destination.' }
    ],
    cta: { 
      text: 'Inquire About Cargo Rates', 
      type: 'whatsapp', 
      textParam: 'Hello TRANSPOCAM, I would like to inquire about sending a parcel/cargo...' 
    }
  },
  {
    id: 'door-to-door',
    title: 'Door-to-Door Delivery',
    icon: Truck,
    tagline: 'Unmatched Convenience—Direct Pickups & Hand-Delivered Shipments',
    description: 'Skip the trip to our terminal. We dispatch professional couriers to pick up packages from your home, warehouse, or retail shop, and deliver them straight to the recipient\'s address in major Cameroonian metropolitan areas.',
    image: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Active Cities', value: 'DLA, YDE, BUEA' },
      { label: 'Delivery Cost', value: 'From 2,000 XAF' },
      { label: 'Pickup Lead Time', value: 'Under 45 Mins' },
      { label: 'Courier Fleet', value: 'Motorbikes & Vans' }
    ],
    features: [
      'Dedicated local dispatch network of motorbikes and light delivery vans for swift urban navigation.',
      'Flexible pickup schedules: Book an immediate pickup or schedule one for later in the week.',
      'Door-to-Door handling: Your package never touches a public terminal floor, minimizing risk.',
      'E-commerce cash-on-delivery (COD) handling for local merchants and small business vendors.',
      'Direct contact with the delivery driver through live WhatsApp updates for accurate coordination.',
      'Bulk pickup discounts for online shops, dry cleaners, pharmacies, and agricultural distributors.'
    ],
    howItWorks: [
      { step: '1', title: 'Request Pickup', text: 'Call or WhatsApp our dispatch hotline with the collection address.' },
      { step: '2', title: 'Courier Arrives', text: 'Our friendly delivery agent collects, tags, and secures the package.' },
      { step: '3', title: 'Hand Delivery', text: 'Recipient signs for the package directly at their home or office door.' }
    ],
    cta: { 
      text: 'Book Door-to-Door Courier', 
      type: 'whatsapp', 
      textParam: 'Hello TRANSPOCAM, I would like to book a Door-to-Door pickup and delivery service...' 
    }
  },
  {
    id: 'corporate',
    title: 'Corporate Staff Shuttle',
    icon: Briefcase,
    tagline: 'Punctual & Stress-Free Commutes for Your Enterprise Workforce',
    description: 'Boost employee productivity and safety with dedicated staff transportation agreements. We provide corporate offices, banks, NGOs, and factories with customized daily transit solutions that ensure teams arrive refreshed and on schedule.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Contract Cycles', value: 'Flexible / Monthly' },
      { label: 'Vehicle Options', value: '18 - 50 Seaters' },
      { label: 'Defensive Drivers', value: '100% Certified' },
      { label: 'Enterprise Support', value: '24/7 Dedicated Manager' }
    ],
    features: [
      'Premium, ultra-clean corporate minibuses (Coasters) and executive coaches.',
      'Saves company costs on parking, staff tardiness, and transit subsidies.',
      'Optimized smart route mapping designed specifically to bypass peak traffic gridlocks.',
      'Rigorous background checks, medical screenings, and defensive driving certifications for drivers.',
      'Real-time GPS tracking dashboard accessible by corporate HR or transport managers.',
      'Flexible, simple corporate account billing options with detailed monthly transit logs.'
    ],
    howItWorks: [
      { step: '1', title: 'Consultation', text: 'We map out your office location, staff residential clusters, and shift timings.' },
      { step: '2', title: 'Custom Fleet Prep', text: 'We assign dedicated, meticulously serviced vehicles and professional drivers.' },
      { step: '3', title: 'Execute Commute', text: 'Your team enjoys a reliable, climate-controlled, punctual commute daily.' }
    ],
    cta: { 
      text: 'Request Corporate Proposal', 
      type: 'whatsapp', 
      textParam: 'Hello TRANSPOCAM, I am interested in a Corporate Staff Shuttle contract/proposal for my company...' 
    }
  },
  {
    id: 'vip-shuttle',
    title: 'VIP Shuttle Solutions',
    icon: Crown,
    tagline: 'Luxury Charters for Dignitaries, Tourism, and Elite Group Events',
    description: 'Experience the absolute pinnacle of private transportation in Cameroon. Rent our customized high-end VIP vehicles, luxury coaches, or executive SUVs for presidential delegations, corporate retreats, high-profile weddings, or group tourism.',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Daily Rental Rate', value: 'Custom Quotes' },
      { label: 'Available Vehicles', value: 'Luxury Coaches / SUVs' },
      { label: 'Hostess Service', value: 'Optional / Bilingual' },
      { label: 'Security Escort', value: 'Available On Request' }
    ],
    features: [
      'Meticulously detailed VIP coaches featuring plush, wide-row leather lounge seating.',
      'Advanced infotainment systems, premium audio acoustics, and scenic ambient lighting.',
      'Complimentary mini-bar stocking fine Cameroonian juices, mineral water, and premium snacks.',
      'Discreet, highly professional chauffeurs trained in diplomatic protocol and security.',
      'Fully customizable itineraries: Travel exactly when and where you want across Cameroon.',
      'State-of-the-art safety features including anti-roll protection and live satellite monitoring.'
    ],
    howItWorks: [
      { step: '1', title: 'Share Your Plan', text: 'Outline your custom travel dates, destination points, and special needs.' },
      { step: '2', title: 'Tailored Quotation', text: 'We provide a highly competitive, all-inclusive luxury travel package.' },
      { step: '3', title: 'Prestige Travel', text: 'Board your private coach with direct VIP terminal lounge access.' }
    ],
    cta: { 
      text: 'Book a VIP Charter', 
      type: 'whatsapp', 
      textParam: 'Hello TRANSPOCAM, I am interested in renting/chartering a VIP Shuttle for a private event...' 
    }
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>('passenger');

  // Rate estimator state
  const [estimateType, setEstimateType] = useState<'cargo' | 'vip' | 'tracking'>('cargo');
  const [cargoRoute, setCargoRoute] = useState<string>('Douala - Yaoundé');
  const [cargoWeight, setCargoWeight] = useState<number>(5);
  const [vipVehicle, setVipVehicle] = useState<'minibus' | 'vip' | 'luxury'>('vip');
  const [vipDays, setVipDays] = useState<number>(2);

  // Estimator calculation logic
  const getCargoEstimate = () => {
    let base = 1500;
    if (cargoRoute.includes('Garoua')) base = 3500;
    else if (cargoRoute.includes('Bamenda')) base = 2500;

    const extraWeight = Math.max(0, cargoWeight - 5);
    const cost = base + (extraWeight * 200);
    return cost;
  };

  const getVipEstimate = () => {
    let dayRate = 120000; // VIP Bus
    if (vipVehicle === 'minibus') dayRate = 85000;
    if (vipVehicle === 'luxury') dayRate = 180000;

    return dayRate * vipDays;
  };

  const selectedService = DETAILED_SERVICES.find(s => s.id === activeTab) || DETAILED_SERVICES[0];
  const ServiceIcon = selectedService.icon;

  const handleCta = (service: ServiceDetail) => {
    if (service.cta.type === 'book') {
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
    } else {
      const phone = '+237679279415';
      const encodedText = encodeURIComponent(service.cta.textParam || 'Hello TRANSPOCAM...');
      window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-brand-black" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            Our Offerings
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Comprehensive Transit & <span className="text-brand-green dark:text-brand-gold">Logistics Solutions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light">
            We are more than just a bus company. TRANSPOCAM provides high-speed cargo delivery, tailored corporate contracts, premium VIP charters, and responsive metropolitan door-to-door courier systems.
          </p>
        </div>

        {/* Dynamic Service Presentation Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Tab Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
              Select a Core Service
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {DETAILED_SERVICES.map((srv) => {
                const TabIcon = srv.icon;
                const isActive = activeTab === srv.id;

                return (
                  <button
                    key={`srv-tab-${srv.id}`}
                    onClick={() => setActiveTab(srv.id)}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer relative overflow-hidden group ${
                      isActive 
                        ? 'bg-brand-green border-transparent text-white shadow-lg shadow-brand-green/10'
                        : 'bg-white dark:bg-brand-charcoal border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-green/40 hover:bg-slate-50 dark:hover:bg-brand-gray/50'
                    }`}
                  >
                    {/* Active highlight bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold" />
                    )}

                    <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'bg-slate-100 dark:bg-brand-gray text-slate-600 dark:text-slate-400 group-hover:bg-brand-green/10 group-hover:text-brand-green'
                    }`}>
                      <TabIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm leading-tight">
                        {srv.title}
                      </h4>
                      <p className={`text-[11px] truncate mt-0.5 font-light ${
                        isActive ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {srv.tagline}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Selected Service Panel */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-brand-charcoal rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden animate-[fade-in_0.3s_ease-out]">
              
              {/* Header Image Cover */}
              <div className="h-56 sm:h-64 relative overflow-hidden">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="text-white space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-brand-gold text-brand-black text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 fill-brand-black" />
                        Premium Standard
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => handleCta(selectedService)}
                    className="shrink-0 bg-brand-green hover:bg-brand-green-light text-white font-display font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg shadow-brand-green/25 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    {selectedService.cta.text}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Info Area */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Description & Tagline */}
                <div className="space-y-3">
                  <h4 className="font-display font-extrabold text-lg text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                    <ServiceIcon className="w-5 h-5 text-brand-green" />
                    {selectedService.tagline}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                {/* Service Quick Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4.5 bg-slate-50 dark:bg-brand-gray/40 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                  {selectedService.metrics.map((met, i) => (
                    <div key={`metric-${i}`} className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        {met.label}
                      </span>
                      <p className="text-sm sm:text-base font-display font-black text-slate-800 dark:text-brand-gold leading-none">
                        {met.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Key Benefits List */}
                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    Key Service Benefits & Amenities
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {selectedService.features.map((feat, i) => (
                      <div key={`feat-${i}`} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                          {feat}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operational Steps */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-gold-dark" />
                    How The Service Works (Step-by-Step)
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedService.howItWorks.map((step) => (
                      <div key={`step-${step.step}`} className="relative space-y-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-xl bg-brand-gold/10 text-brand-gold-dark font-display font-bold text-xs flex items-center justify-center">
                            {step.step}
                          </span>
                          <h6 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm">
                            {step.title}
                          </h6>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light pl-9 md:pl-0">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Interactive Estimator Tool widget */}
        <div className="mt-20 bg-white dark:bg-brand-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-brand-charcoal via-brand-black to-brand-charcoal p-6 sm:p-8 text-white border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-brand-green/20 border border-brand-green/30 text-brand-green-light rounded-2xl shrink-0">
                <Calculator className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-brand-gold font-extrabold uppercase tracking-widest px-2.5 py-0.5 bg-brand-gold/15 rounded-full inline-block">
                  Interactive Applet Widget
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">
                  Instant Service Rate & Tracking Center
                </h3>
                <p className="text-xs text-slate-400 font-light max-w-xl">
                  Get a realistic quote for parcel shipping, private coach charters, or track your packages live using national logistics barcodes.
                </p>
              </div>
            </div>

            {/* Toggle Estimator Mode */}
            <div className="flex flex-wrap bg-slate-900 border border-slate-800 p-1 rounded-xl w-full md:w-auto shrink-0 gap-1 md:gap-0">
              <button
                onClick={() => setEstimateType('cargo')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  estimateType === 'cargo'
                    ? 'bg-brand-green text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Parcel Shipping
              </button>
              <button
                onClick={() => setEstimateType('vip')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  estimateType === 'vip'
                    ? 'bg-brand-green text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Private VIP Shuttle
              </button>
              <button
                onClick={() => setEstimateType('tracking')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  estimateType === 'tracking'
                    ? 'bg-brand-green text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Real-Time Tracking
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-slate-50/50 dark:bg-brand-black/20">
            {estimateType === 'tracking' ? (
              <ParcelTracking />
            ) : (
              /* CONTEXTUAL CARGO / VIP ESTIMATORS */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-[fade-in_0.3s_ease-out]">
                
                {/* Input fields */}
                <div className="lg:col-span-7 space-y-6">
                  {estimateType === 'cargo' ? (
                    /* CARGO ESTIMATOR INPUTS */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Travel Corridor
                        </label>
                        <select
                          value={cargoRoute}
                          onChange={(e) => setCargoRoute(e.target.value)}
                          className="w-full bg-white dark:bg-brand-charcoal text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-1 focus:ring-brand-green outline-none"
                        >
                          <option>Douala - Yaoundé</option>
                          <option>Yaoundé - Douala</option>
                          <option>Douala - Buea</option>
                          <option>Douala - Bamenda</option>
                          <option>Yaoundé - Garoua</option>
                          <option>Douala - Kribi</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Package Weight (kg): <span className="text-brand-green dark:text-brand-gold font-mono font-bold">{cargoWeight} kg</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="1"
                            max="50"
                            value={cargoWeight}
                            onChange={(e) => setCargoWeight(parseInt(e.target.value))}
                            className="flex-1 accent-brand-green cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-850 rounded"
                          />
                          <input
                            type="number"
                            min="1"
                            max="200"
                            value={cargoWeight}
                            onChange={(e) => setCargoWeight(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 text-center bg-white dark:bg-brand-charcoal text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl py-2 text-xs font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* VIP SHUTTLE ESTIMATOR INPUTS */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Preferred Vehicle Tier
                        </label>
                        <select
                          value={vipVehicle}
                          onChange={(e) => setVipVehicle(e.target.value as any)}
                          className="w-full bg-white dark:bg-brand-charcoal text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-1 focus:ring-brand-green outline-none"
                        >
                          <option value="minibus">Mini Bus Express (18-Seater)</option>
                          <option value="vip">VIP Luxury Coach (24-Seater Lounge)</option>
                          <option value="luxury">Luxury Distance Coach (50-Seater Restroom)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Charter Duration: <span className="text-brand-green dark:text-brand-gold font-mono font-bold">{vipDays} Days</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="1"
                            max="14"
                            value={vipDays}
                            onChange={(e) => setVipDays(parseInt(e.target.value))}
                            className="flex-1 accent-brand-green cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-850 rounded"
                          />
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={vipDays}
                            onChange={(e) => setVipDays(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 text-center bg-white dark:bg-brand-charcoal text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl py-2 text-xs font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Informative advice note */}
                  <div className="flex items-start gap-2.5 p-3.5 bg-slate-100 dark:bg-brand-gray/30 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800 text-left">
                    <Info className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-light">
                      {estimateType === 'cargo' 
                        ? 'Note: Standard parcel postage starts at 1,500 XAF for up to 5kg on short routes. Heavy or high-volume freight will accrue a small weight surcharge of 200 XAF per extra kg.'
                        : 'Note: VIP shuttle charters are all-inclusive of a certified driver, fuel, highway tolls (peage), and basic travel medical response coverage.'}
                    </p>
                  </div>
                </div>

                {/* Price Output Display */}
                <div className="lg:col-span-5 bg-white dark:bg-brand-charcoal p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-4 shadow-md flex flex-col justify-between min-h-[180px]">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                      Estimated Contract Total
                    </span>
                    
                    <h4 className="font-display font-black text-3xl sm:text-4xl text-brand-green dark:text-brand-gold mt-2">
                      {estimateType === 'cargo' 
                        ? `${getCargoEstimate().toLocaleString()} XAF`
                        : `${getVipEstimate().toLocaleString()} XAF`}
                    </h4>
                    
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-light mt-1.5">
                      *Excludes value added tax (TVA). Actual terminal prices may vary slightly based on parcel fragile options.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const param = estimateType === 'cargo' 
                        ? `Hello TRANSPOCAM, I would like to get a quote on sending a cargo from ${cargoRoute} of around ${cargoWeight}kg estimated at ${getCargoEstimate().toLocaleString()} XAF...`
                        : `Hello TRANSPOCAM, I would like to book a VIP Private Charter for a ${vipVehicle} tier vehicle for ${vipDays} days, estimated at ${getVipEstimate().toLocaleString()} XAF...`;
                      
                      const phone = '+237679279415';
                      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(param)}`, '_blank');
                    }}
                    className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-display font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-green/20"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Book This Contract Quote
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
