import React, { useMemo } from 'react';
import { Armchair } from 'lucide-react';

interface SeatSelectorProps {
  busType: string;
  capacity: number;
  selectedSeats: number[];
  passengersCount: number;
  onSeatToggle: (seatNumber: number) => void;
  // Seed for reproducible occupied seats based on date and route
  seedString?: string;
}

export default function SeatSelector({
  busType,
  capacity,
  selectedSeats,
  passengersCount,
  onSeatToggle,
  seedString = 'default'
}: SeatSelectorProps) {
  // Generate occupied seats based on a hash of the seed string
  const occupiedSeats = useMemo(() => {
    const occupied = new Set<number>();
    
    // Hash function to get deterministic "randomness"
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Fill approximately 35% - 60% of seats
    const occupancyRate = 0.35 + (Math.abs(hash % 25) / 100); 
    const targetOccupiedCount = Math.floor(capacity * occupancyRate);
    
    let currentSeed = Math.abs(hash);
    while (occupied.size < targetOccupiedCount) {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      const seatNum = (currentSeed % capacity) + 1;
      // Ensure we don't block seat 1 (often reserved/VIP) or selected seats
      if (seatNum !== 1 && !selectedSeats.includes(seatNum)) {
        occupied.add(seatNum);
      }
    }
    
    return occupied;
  }, [capacity, seedString, selectedSeats]);

  // Determine layout columns
  // VIP: 1 seat | Aisle | 2 seats (Total 3 per row)
  // Others: 2 seats | Aisle | 2 seats (Total 4 per row)
  const isVip = busType.toLowerCase().includes('vip');
  const seatsPerRow = isVip ? 3 : 4;
  const rowsCount = Math.ceil(capacity / seatsPerRow);

  const getSeatStatus = (seatNum: number) => {
    if (selectedSeats.includes(seatNum)) return 'selected';
    if (occupiedSeats.has(seatNum)) return 'occupied';
    return 'available';
  };

  const handleSeatClick = (seatNum: number) => {
    const status = getSeatStatus(seatNum);
    if (status === 'occupied') return;
    
    // If selecting a new seat but already reached passenger count limit
    if (status === 'available' && selectedSeats.length >= passengersCount) {
      // Automatically deselect the first selected seat and select this one,
      // or just replace or let them toggle
      if (passengersCount === 1) {
        onSeatToggle(selectedSeats[0]);
        onSeatToggle(seatNum);
      } else {
        // Just show alert or ignore (in an elegant way: we can just replace or do nothing)
        return;
      }
    } else {
      onSeatToggle(seatNum);
    }
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="font-display font-semibold text-slate-800 dark:text-slate-100 text-lg">
            Choose Your Seats
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {selectedSeats.length} of {passengersCount} seats selected
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-brand-green border border-brand-green-dark" />
            <span className="text-slate-600 dark:text-slate-400">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-red-500 border border-red-600" />
            <span className="text-slate-600 dark:text-slate-400">Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-brand-gold border border-brand-gold-dark" />
            <span className="text-slate-600 dark:text-slate-400">Selected</span>
          </div>
        </div>
      </div>

      {/* Bus cabin layout container */}
      <div className="max-w-[340px] mx-auto bg-white dark:bg-brand-charcoal p-4 rounded-3xl border-4 border-slate-300 dark:border-slate-800 shadow-xl relative overflow-hidden">
        
        {/* Bus Front Windshield / Cockpit dashboard */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-12 rounded-t-xl mb-6 flex items-center justify-between px-6 border-b-2 border-slate-300 dark:border-slate-700">
          <div className="w-8 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full" /> {/* Dashboard wiper */}
          <div className="flex flex-col items-center">
            {/* Steering wheel */}
            <div className="w-6 h-6 rounded-full border-4 border-slate-600 dark:border-slate-500 flex items-center justify-center animate-pulse">
              <span className="w-1.5 h-1.5 bg-slate-600 dark:bg-slate-500 rounded-full" />
            </div>
            <span className="text-[9px] font-mono tracking-wider uppercase text-slate-500 mt-0.5">Driver</span>
          </div>
          <div className="w-8 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full" />
        </div>

        {/* Seats Container */}
        <div className="space-y-3">
          {Array.from({ length: rowsCount }).map((_, rowIndex) => {
            return (
              <div key={rowIndex} className="flex justify-between items-center px-1">
                {/* Left side seats */}
                <div className="flex gap-2">
                  {Array.from({ length: isVip ? 1 : 2 }).map((_, seatIndex) => {
                    const seatNum = rowIndex * seatsPerRow + seatIndex + 1;
                    if (seatNum > capacity) return <div key={seatNum} className="w-9 h-9" />;
                    
                    const status = getSeatStatus(seatNum);
                    
                    return (
                      <button
                        key={seatNum}
                        id={`seat-button-${seatNum}`}
                        type="button"
                        onClick={() => handleSeatClick(seatNum)}
                        className={`
                          w-9 h-9 rounded-lg flex flex-col items-center justify-center text-xs font-semibold font-mono transition-all duration-200 shadow-sm relative
                          ${status === 'available' ? 'bg-brand-green/15 text-brand-green border border-brand-green hover:bg-brand-green hover:text-white cursor-pointer active:scale-95' : ''}
                          ${status === 'selected' ? 'bg-brand-gold text-brand-black border border-brand-gold-dark font-bold scale-105 shadow-md shadow-brand-gold/20' : ''}
                          ${status === 'occupied' ? 'bg-red-500/10 text-red-500/40 border border-red-500/20 cursor-not-allowed' : ''}
                        `}
                        title={`Seat ${seatNum} - ${status}`}
                      >
                        <Armchair className="w-3.5 h-3.5 mb-0.5 opacity-85" />
                        <span className="text-[9px] leading-none">{seatNum}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Aisle walkpath */}
                <div className="w-8 h-9 border-l border-r border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <span className="text-[8px] uppercase tracking-widest font-bold text-slate-300 dark:text-slate-700 select-none">Aisle</span>
                </div>

                {/* Right side seats */}
                <div className="flex gap-2">
                  {Array.from({ length: 2 }).map((_, seatIndex) => {
                    // Right side seat index offsets:
                    // VIP has 1 left, so offset starts at index 1
                    // Standard has 2 left, so offset starts at index 2
                    const offset = isVip ? 1 : 2;
                    const seatNum = rowIndex * seatsPerRow + offset + seatIndex + 1;
                    if (seatNum > capacity) return <div key={seatNum} className="w-9 h-9" />;
                    
                    const status = getSeatStatus(seatNum);
                    
                    return (
                      <button
                        key={seatNum}
                        id={`seat-button-${seatNum}`}
                        type="button"
                        onClick={() => handleSeatClick(seatNum)}
                        className={`
                          w-9 h-9 rounded-lg flex flex-col items-center justify-center text-xs font-semibold font-mono transition-all duration-200 shadow-sm relative
                          ${status === 'available' ? 'bg-brand-green/15 text-brand-green border border-brand-green hover:bg-brand-green hover:text-white cursor-pointer active:scale-95' : ''}
                          ${status === 'selected' ? 'bg-brand-gold text-brand-black border border-brand-gold-dark font-bold scale-105 shadow-md shadow-brand-gold/20' : ''}
                          ${status === 'occupied' ? 'bg-red-500/10 text-red-500/40 border border-red-500/20 cursor-not-allowed' : ''}
                        `}
                        title={`Seat ${seatNum} - ${status}`}
                      >
                        <Armchair className="w-3.5 h-3.5 mb-0.5 opacity-85" />
                        <span className="text-[9px] leading-none">{seatNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Row (Engine cover / extra seats if any, but let's keep standard cabin layout) */}
        <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
            Rear of Coach
          </p>
        </div>
      </div>
      
      {/* Dynamic Instruction */}
      <div className="mt-4 text-center">
        {selectedSeats.length < passengersCount ? (
          <p className="text-xs text-brand-green-light font-medium animate-pulse">
            Please pick {passengersCount - selectedSeats.length} more seat{passengersCount - selectedSeats.length > 1 ? 's' : ''} from the cabin map.
          </p>
        ) : (
          <p className="text-xs text-amber-600 dark:text-brand-gold font-medium">
            ✓ All seats selected! Proceed with your booking information below.
          </p>
        )}
      </div>
    </div>
  );
}
