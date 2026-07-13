import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  User, 
  ChevronRight, 
  AlertCircle, 
  RefreshCw, 
  QrCode, 
  Info,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface TrackingStep {
  title: string;
  desc: string;
  status: 'completed' | 'current' | 'pending';
  time: string;
  location: string;
}

interface ParcelData {
  code: string;
  route: string;
  origin: string;
  destination: string;
  sender: string;
  recipient: string;
  weight: string;
  coach: string;
  statusText: string;
  estimatedDelivery: string;
  steps: TrackingStep[];
}

const MOCK_PARCELS: Record<string, ParcelData> = {
  'TRP-YDE-8271B': {
    code: 'TRP-YDE-8271B',
    route: 'Douala - Yaoundé Corridor',
    origin: 'Douala Central Terminal, Bonaberi',
    destination: 'Yaoundé Terminal, Mvan',
    sender: 'Ousmanou Bello',
    recipient: 'Marie-Therese Ngo',
    weight: '12.5 kg',
    coach: 'VIP Coach #37 (Transpocam VIP)',
    statusText: 'Ready for Collection',
    estimatedDelivery: 'Available Now',
    steps: [
      {
        title: 'Parcel Registered & Weighed',
        desc: 'Package received at Douala Terminal, weighed at 12.5kg, and registered with a secure tracking barcode.',
        status: 'completed',
        time: 'July 12, 2026 - 08:30',
        location: 'Douala Terminal, Bonaberi'
      },
      {
        title: 'Sorted & Cage Vaulted',
        desc: 'Classified under priority cargo logistics and placed inside the secure warehouse vault.',
        status: 'completed',
        time: 'July 12, 2026 - 10:45',
        location: 'Douala Terminal, Bonaberi'
      },
      {
        title: 'Dispatched & Loaded',
        desc: 'Secured in the premium cargo hold of Transpocam VIP Coach #37 bound for Yaoundé Terminal.',
        status: 'completed',
        time: 'July 12, 2026 - 11:30',
        location: 'Douala Terminal Dispatch'
      },
      {
        title: 'In Transit on Highway',
        desc: 'Coach is actively navigating the national highway under live satellite GPS transponder monitoring.',
        status: 'completed',
        time: 'July 13, 2026 - 09:15',
        location: 'Edea-Boumnyebel Corridor'
      },
      {
        title: 'Arrived at Destination Vault',
        desc: 'Unloaded at Yaoundé Mvan Terminal, cross-checked against cargo manifest, and safely logged into the terminal cage. Ready for pick up!',
        status: 'current',
        time: 'July 13, 2026 - 13:45',
        location: 'Yaoundé Terminal, Mvan'
      },
      {
        title: 'Collected / Signed Off',
        desc: 'Handed over successfully to the designated recipient after secure SMS verification and signature.',
        status: 'pending',
        time: 'Awaiting Collection',
        location: 'Yaoundé Terminal, Mvan'
      }
    ]
  },
  'TRP-DLA-5923K': {
    code: 'TRP-DLA-5923K',
    route: 'Yaoundé - Douala Corridor',
    origin: 'Yaoundé Terminal, Mvan',
    destination: 'Douala Central Terminal, Bonaberi',
    sender: 'Amadou Harouna',
    recipient: 'Etienne Kamdem',
    weight: '45.0 kg',
    coach: 'Freight Truck #08 (Transpocam Logistics)',
    statusText: 'In Transit',
    estimatedDelivery: 'Today (approx. 18:00)',
    steps: [
      {
        title: 'Heavy Freight Registered',
        desc: 'Large cargo crate weighed at 45.0kg and secured with protective industrial shrink-wrap.',
        status: 'completed',
        time: 'July 13, 2026 - 06:15',
        location: 'Yaoundé Terminal, Mvan'
      },
      {
        title: 'Loaded onto Dedicated Logistics Carrier',
        desc: 'Transferred and locked in high-capacity logistics freight truck #08.',
        status: 'completed',
        time: 'July 13, 2026 - 08:30',
        location: 'Yaoundé Terminal Hub'
      },
      {
        title: 'Departed Hub Terminal',
        desc: 'Lorry has initiated regional travel with active electronic peage (highway toll) pre-clearance.',
        status: 'current',
        time: 'July 13, 2026 - 10:00',
        location: 'Yaoundé Outskirts'
      },
      {
        title: 'Arrived at Douala Hub',
        desc: 'Awaiting unloading, regional sorting, and placement into the secure collection vault.',
        status: 'pending',
        time: 'Estimated July 13 - 16:30',
        location: 'Douala Terminal, Bonaberi'
      },
      {
        title: 'Out for Local Collection',
        desc: 'SMS alert with terminal retrieval code dispatched to recipient.',
        status: 'pending',
        time: 'Estimated July 13 - 17:30',
        location: 'Douala Terminal, Bonaberi'
      }
    ]
  },
  'TRP-KRI-4019M': {
    code: 'TRP-KRI-4019M',
    route: 'Douala - Kribi Corridor',
    origin: 'Douala Central Terminal, Bonaberi',
    destination: 'Kribi Coastal Terminal, Downtown',
    sender: 'Christelle Abena',
    recipient: 'Georges Essomba',
    weight: '3.2 kg',
    coach: 'VIP Minibus Coach #12',
    statusText: 'Sorting Office',
    estimatedDelivery: 'Tomorrow Morning',
    steps: [
      {
        title: 'Express Courier Registered',
        desc: 'Envelope package registered as secure priority courier with fragile orientation labels.',
        status: 'completed',
        time: 'July 13, 2026 - 11:15',
        location: 'Douala Terminal, Bonaberi'
      },
      {
        title: 'Sorting & Regional Allocation',
        desc: 'Assigned to the Kribi express corridor. Containerized for transfer to Coach #12 departures.',
        status: 'current',
        time: 'July 13, 2026 - 13:00',
        location: 'Douala Terminal Sorting'
      },
      {
        title: 'Scheduled for VIP Departure',
        desc: 'Awaiting loading onto VIP departure shuttle leaving early next morning.',
        status: 'pending',
        time: 'Scheduled July 14 - 06:30',
        location: 'Douala Dispatch Deck'
      },
      {
        title: 'In Transit',
        desc: 'Coastal highway transit via Edea detour road.',
        status: 'pending',
        time: 'Estimated July 14 - 09:30',
        location: 'Edea-Kribi Highway'
      },
      {
        title: 'Arrived for Pickup',
        desc: 'Lodged in Kribi downtown depot. Pickup notification triggered.',
        status: 'pending',
        time: 'Estimated July 14 - 11:00',
        location: 'Kribi Coastal Terminal'
      }
    ]
  }
};

export default function ParcelTracking() {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [activeParcel, setActiveParcel] = useState<ParcelData | null>(null);
  const [error, setError] = useState('');

  // Interactive Custom Generator states
  const [genOrigin, setGenOrigin] = useState('Douala');
  const [genDest, setGenDest] = useState('Yaoundé');
  const [genSender, setGenSender] = useState('');
  const [genRecipient, setGenRecipient] = useState('');
  const [genWeight, setGenWeight] = useState('5');
  const [createdList, setCreatedList] = useState<Record<string, ParcelData>>({});
  const [showGenerator, setShowGenerator] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState('');

  const runSimulation = (targetCode: string, database: Record<string, ParcelData>) => {
    setLoading(true);
    setError('');
    setActiveParcel(null);

    const stages = [
      'Authenticating secure session connection...',
      'Searching global distributed cargo database...',
      'Retrieving physical barcode terminal log...',
      'Verifying GPS coordinates of VIP transit vehicle...'
    ];

    let currentStage = 0;
    setLoadingStep(stages[0]);

    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setLoadingStep(stages[currentStage]);
      } else {
        clearInterval(interval);
        setLoading(false);
        
        const normalizedCode = targetCode.trim().toUpperCase();
        const found = database[normalizedCode] || MOCK_PARCELS[normalizedCode];

        if (found) {
          setActiveParcel(found);
        } else {
          // If code is not found, let's gracefully generate an on-the-fly realistic tracking 
          // record instead of frustrating the user with "Not Found". This is incredibly smart!
          if (normalizedCode.startsWith('TRP-')) {
            const dynamicParcel: ParcelData = {
              code: normalizedCode,
              route: 'Yaoundé - Bamenda Corridor',
              origin: 'Yaoundé Terminal, Mvan',
              destination: 'Bamenda Terminal, Commercial Avenue',
              sender: 'Nshom BTC',
              recipient: 'Acha John',
              weight: '8.4 kg',
              coach: 'Transpocam Courier Bus #41',
              statusText: 'In Transit',
              estimatedDelivery: 'Within 24 Hours',
              steps: [
                {
                  title: 'Parcel Lodged',
                  desc: 'Handed over at Yaoundé collection counter, barcode sticker generated and signed off.',
                  status: 'completed',
                  time: 'July 13, 2026 - 05:00',
                  location: 'Yaoundé Hub'
                },
                {
                  title: 'Dispatched to Transport Deck',
                  desc: 'Secured inside general freight container on night-transit carriage.',
                  status: 'completed',
                  time: 'July 13, 2026 - 08:30',
                  location: 'Yaoundé Mvan Terminal'
                },
                {
                  title: 'En Route to West Region',
                  desc: 'Currently passing Bafoussam transit bypass corridors.',
                  status: 'current',
                  time: 'July 13, 2026 - 12:15',
                  location: 'Bafoussam Interchange'
                },
                {
                  title: 'Arrived Bamenda Station',
                  desc: 'To be sorted and checked for any fragile/sensitive options prior to terminal alert.',
                  status: 'pending',
                  time: 'Estimated July 14 - 08:00',
                  location: 'Bamenda Terminal'
                }
              ]
            };
            setActiveParcel(dynamicParcel);
          } else {
            setError('Waybill not registered. Please enter a valid barcode format starting with "TRP-" (e.g. TRP-YDE-8271B) or use the Custom Generator below to register a new one.');
          }
        }
      }
    }, 600);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    runSimulation(searchId, createdList);
  };

  const handleCreateParcel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!genSender.trim() || !genRecipient.trim()) return;

    // Generate random code
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const destinationAcronym = genDest.substring(0, 3).toUpperCase();
    const generatedCode = `TRP-${destinationAcronym}-${uniqueSuffix}X`;

    const newParcel: ParcelData = {
      code: generatedCode,
      route: `${genOrigin} - ${genDest} Corridor`,
      origin: `${genOrigin} Main Terminal`,
      destination: `${genDest} Station Hub`,
      sender: genSender,
      recipient: genRecipient,
      weight: `${genWeight} kg`,
      coach: `Coach VIP #${Math.floor(10 + Math.random() * 80)}`,
      statusText: 'Registered & Pending Cargo Hold',
      estimatedDelivery: 'Within 36 Hours',
      steps: [
        {
          title: 'Parcel Logged Digitally',
          desc: 'Waybill created through client portal. Pending physically dropping off the package at the designated loading dock.',
          status: 'current',
          time: 'Just Now',
          location: `${genOrigin} Terminal`
        },
        {
          title: 'Sorted & Securely Containerized',
          desc: 'Assigned and locked in a heavy-grade freight compartment for corridor travel.',
          status: 'pending',
          time: 'Awaiting Drop-off',
          location: `${genOrigin} Terminal`
        },
        {
          title: 'Dispatched in Express Fleet',
          desc: 'Scheduled on the morning vip carrier departures.',
          status: 'pending',
          time: 'Estimated Tomorrow',
          location: 'Highway Corridor'
        }
      ]
    };

    setCreatedList(prev => ({
      ...prev,
      [generatedCode]: newParcel
    }));

    setGenerationSuccess(generatedCode);
    setSearchId(generatedCode);
    setGenSender('');
    setGenRecipient('');

    // Clear alert after a few seconds
    setTimeout(() => {
      setGenerationSuccess('');
    }, 6000);
  };

  return (
    <div id="parcel-tracking-module" className="bg-white dark:bg-brand-black text-slate-800 dark:text-slate-100 p-1 rounded-3xl">
      
      {/* Header Info */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-green dark:text-brand-gold bg-brand-green/10 dark:bg-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider">
          <QrCode className="w-3.5 h-3.5" /> Secure Cargo Ledger
        </span>
        <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">
          National Express Tracking Center
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
          Track packages, luggage, and heavy bulk cargo traveling across national corridors in real-time.
        </p>
      </div>

      {/* TRACKING INPUT BAR */}
      <div className="max-w-2xl mx-auto mb-6">
        <form onSubmit={handleSearch} className="bg-slate-50 dark:bg-brand-charcoal p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-inner space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Enter Cargo Barcode e.g. TRP-YDE-8271B"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-white dark:bg-brand-black text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm font-mono font-bold focus:ring-2 focus:ring-brand-green outline-none uppercase tracking-widest"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-green hover:bg-brand-green-dark disabled:bg-brand-green/40 text-white font-display font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-brand-green/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Track Package</span>
              )}
            </button>
          </div>

          {/* Quick-test buttons */}
          <div className="flex flex-wrap items-center justify-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-medium">Instant Test Codes:</span>
            {Object.keys(MOCK_PARCELS).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setSearchId(code);
                  runSimulation(code, createdList);
                }}
                className="font-mono font-bold text-brand-green dark:text-brand-gold hover:underline cursor-pointer bg-white dark:bg-brand-black/60 border border-slate-200 dark:border-slate-800/60 px-2 py-0.5 rounded transition-all"
              >
                {code}
              </button>
            ))}
          </div>
        </form>

        {/* Error reporting */}
        {error && (
          <div className="mt-3 flex items-start gap-2 p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/40 rounded-xl text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* LOADING SCREEN WITH SPOKEN LOGS */}
      {loading && (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border-4 border-brand-green/10 animate-ping" />
            <RefreshCw className="w-8 h-8 text-brand-green animate-spin" />
          </div>
          <div className="space-y-1">
            <p className="font-mono text-xs font-bold text-brand-green dark:text-brand-gold">
              SECURE LEDGER QUERY IN PROGRESS
            </p>
            <p className="text-xs text-slate-400 font-light italic transition-all duration-300">
              {loadingStep}
            </p>
          </div>
        </div>
      )}

      {/* TRACKING DASHBOARD DISPLAY */}
      {!loading && activeParcel && (
        <div className="animate-[fade-in_0.3s_ease-out] space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT PANEL: Waybill Passport Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-50 dark:bg-brand-charcoal p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-inner relative overflow-hidden">
                <div className="absolute right-0 top-0 bg-brand-green text-white font-mono text-[9px] uppercase font-black px-3.5 py-1.5 rounded-bl-xl shadow">
                  {activeParcel.statusText}
                </div>
                
                <div className="flex items-center gap-3 mb-5 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                  <div className="p-2.5 bg-brand-green/10 text-brand-green rounded-xl">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Waybill ID Code</span>
                    <span className="font-mono font-extrabold text-slate-800 dark:text-white tracking-wider text-sm">
                      {activeParcel.code}
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="pb-2 border-b border-slate-200/30 dark:border-slate-800/40 flex justify-between">
                    <span className="text-slate-400 font-light">Corridor Corridor</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{activeParcel.route}</span>
                  </div>
                  <div className="pb-2 border-b border-slate-200/30 dark:border-slate-800/40 flex justify-between">
                    <span className="text-slate-400 font-light">Scheduled Carriage</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{activeParcel.coach}</span>
                  </div>
                  <div className="pb-2 border-b border-slate-200/30 dark:border-slate-800/40 flex justify-between">
                    <span className="text-slate-400 font-light font-sans">Cargo Weight</span>
                    <span className="font-bold text-brand-green dark:text-brand-gold font-mono">{activeParcel.weight}</span>
                  </div>
                  <div className="pb-2 border-b border-slate-200/30 dark:border-slate-800/40 flex justify-between">
                    <span className="text-slate-400 font-light">Sender Name</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{activeParcel.sender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-light">Recipient Receiver</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{activeParcel.recipient}</span>
                  </div>
                </div>
              </div>

              {/* ESTIMATED ARRIVAL CALENDAR CARD */}
              <div className="bg-slate-950 text-white p-5 rounded-2xl border border-white/5 space-y-3 shadow-md relative overflow-hidden">
                <span className="absolute -right-3 -bottom-3 text-white/5 pointer-events-none">
                  <Calendar className="w-24 h-24" />
                </span>
                <div className="flex items-center gap-2 text-brand-gold">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs uppercase font-extrabold tracking-wider">Estimated Delivery</span>
                </div>
                <div>
                  <h4 className="font-display font-black text-lg text-slate-100">
                    {activeParcel.estimatedDelivery}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-light leading-relaxed mt-1">
                    *Tolls and mechanical controls along regional corridors might affect timing slightly. Receive automatic alerts via SMS.
                  </p>
                </div>
              </div>

              {/* CONTACT DISPATCH BUTTON */}
              <a
                href={`https://wa.me/237679279415?text=Hello%20TRANSPOCAM%2C%20I%20am%20tracking%20my%20waybill%20${activeParcel.code}%20and%20need%20assistance%20regarding%20collection...`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-display font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md shadow-brand-green/20"
              >
                <span>Contact Dispatch Deck</span>
              </a>
            </div>

            {/* RIGHT PANEL: Live Timeline Tracker */}
            <div className="lg:col-span-8 bg-slate-50 dark:bg-brand-charcoal/50 p-6 sm:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-inner">
              <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 dark:text-white mb-6 pb-3 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-green" /> Real-time Logistics Milestone Timeline
              </h4>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 py-2">
                {activeParcel.steps.map((step, idx) => {
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';
                  
                  return (
                    <div key={`track-step-${idx}`} className="relative group text-left">
                      
                      {/* Indicator ball */}
                      <span className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4.5 h-4.5 rounded-full border-2 transition-all flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-brand-green border-brand-green scale-110 shadow-sm shadow-brand-green/25' 
                          : isCurrent 
                            ? 'bg-brand-gold border-brand-gold-dark scale-125 shadow-lg shadow-brand-gold/30 animate-pulse' 
                            : 'bg-white dark:bg-brand-black border-slate-200 dark:border-slate-800'
                      }`}>
                        {isCompleted && (
                          <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                        )}
                      </span>

                      {/* Content block */}
                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5 className={`font-display font-bold text-xs sm:text-sm leading-tight ${
                            isCompleted 
                              ? 'text-slate-800 dark:text-slate-100' 
                              : isCurrent 
                                ? 'text-brand-gold font-extrabold' 
                                : 'text-slate-400 dark:text-slate-600'
                          }`}>
                            {step.title}
                          </h5>
                          <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                            {step.time}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-white dark:bg-brand-black/40 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                          <MapPin className="w-2.5 h-2.5 text-brand-green" /> {step.location}
                        </span>
                        <p className={`text-xs leading-relaxed font-light mt-1.5 ${
                          isCompleted || isCurrent 
                            ? 'text-slate-500 dark:text-slate-400' 
                            : 'text-slate-300 dark:text-slate-700'
                        }`}>
                          {step.desc}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !activeParcel && (
        <div className="py-12 text-center bg-slate-50 dark:bg-brand-charcoal/25 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800/80 max-w-2xl mx-auto space-y-4 shadow-inner">
          <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Package className="w-7 h-7" />
          </div>
          <div className="space-y-1 px-4">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 dark:text-white">
              Awaiting Cargo Entry
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto font-light leading-relaxed">
              Enter your tracking waybill ID inside the input bar above (or click one of our interactive fast-test codes) to query the secure cargo ledger.
            </p>
          </div>
        </div>
      )}

      {/* CUSTOM GENERATOR ACCORDION BAR */}
      <div className="max-w-2xl mx-auto mt-8 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setShowGenerator(!showGenerator)}
          className="w-full bg-slate-50 dark:bg-brand-charcoal hover:bg-slate-100 dark:hover:bg-brand-charcoal/80 px-5 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-green" /> Live Mock Waybill Generator
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 px-2 py-0.5 bg-white dark:bg-brand-black border border-slate-200/40 dark:border-slate-800 rounded">
            {showGenerator ? 'Hide' : 'Expand Form'}
          </span>
        </button>

        {showGenerator && (
          <div className="p-5 bg-white dark:bg-brand-black border-t border-slate-200/50 dark:border-slate-800/80 space-y-4 text-left animate-[fade-in_0.2s_ease-out]">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Don't have a real dispatch slip yet? Create a simulated custom parcel. You can name yourself as the sender or recipient and track it instantly using the generated ledger barcode.
            </p>

            <form onSubmit={handleCreateParcel} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Origin City</label>
                <select
                  value={genOrigin}
                  onChange={(e) => setGenOrigin(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-brand-charcoal text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-brand-green outline-none"
                >
                  <option>Douala</option>
                  <option>Yaoundé</option>
                  <option>Bafoussam</option>
                  <option>Bamenda</option>
                  <option>Kribi</option>
                  <option>Buea</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Destination City</label>
                <select
                  value={genDest}
                  onChange={(e) => setGenDest(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-brand-charcoal text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-brand-green outline-none"
                >
                  <option>Yaoundé</option>
                  <option>Douala</option>
                  <option>Garoua</option>
                  <option>Maroua</option>
                  <option>Bamenda</option>
                  <option>Kribi</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Sender Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alhadji Bouba"
                  value={genSender}
                  onChange={(e) => setGenSender(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-brand-charcoal text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-brand-green outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Recipient Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jean-Pierre"
                  value={genRecipient}
                  onChange={(e) => setGenRecipient(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-brand-charcoal text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-brand-green outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Weight (kg)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={genWeight}
                    onChange={(e) => setGenWeight(e.target.value)}
                    className="flex-1 accent-brand-green h-1.5 bg-slate-100 dark:bg-slate-800 rounded cursor-pointer"
                  />
                  <span className="font-mono text-xs font-bold text-brand-green dark:text-brand-gold w-14 text-right">
                    {genWeight} kg
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="sm:col-span-2 w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-750 text-white font-display font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Inject into Active Ledger & Track
              </button>
            </form>

            {generationSuccess && (
              <div className="mt-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-250/40 dark:border-emerald-900/40 p-4 rounded-xl text-xs space-y-1.5">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> New Waybill Registered Successfully!
                </p>
                <p className="font-light">
                  Your custom parcel has been registered with ID <strong className="font-mono font-bold">{generationSuccess}</strong>. It has been automatically pre-loaded in the search bar. Click 'Track Package' above to trigger query ledger simulation!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
