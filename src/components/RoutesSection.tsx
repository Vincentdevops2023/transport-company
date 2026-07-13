import React, { useState } from 'react';
import { ROUTES } from '../data/mockData';
import { Route } from '../types';
import { Clock, Tag, ArrowRight, Search, Navigation } from 'lucide-react';

interface RoutesSectionProps {
  onSelectRoute: (departure: string, destination: string) => void;
}

export default function RoutesSection({ onSelectRoute }: RoutesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState('All');

  const uniqueCities = ['All', 'Douala', 'Yaoundé', 'Buea', 'Limbe', 'Bamenda', 'Kribi', 'Garoua'];

  const filteredRoutes = ROUTES.filter(route => {
    const matchesSearch = 
      route.departure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterCity === 'All') return matchesSearch;
    return matchesSearch && (route.departure === filterCity || route.destination === filterCity);
  });

  const handleBookRoute = (route: Route) => {
    onSelectRoute(route.departure, route.destination);
    
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
    <section className="py-20 bg-slate-50 dark:bg-brand-black" id="routes-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            Our Network
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Popular Intercity <span className="text-brand-green dark:text-brand-gold">Routes & Fares</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light">
            We connect Cameroon's major economic hubs with regular departures. Select your route below to pre-fill the booking wizard instantly.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-brand-charcoal p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
          
          {/* City Filter pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {uniqueCities.map(city => (
              <button
                key={`pill-${city}`}
                onClick={() => setFilterCity(city)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  filterCity === city
                    ? 'bg-brand-green text-white'
                    : 'bg-slate-100 dark:bg-brand-gray text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-brand-gray/80'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-brand-gray text-slate-800 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-brand-green outline-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => {
            return (
              <div 
                key={`route-${route.id}`}
                className="bg-white dark:bg-brand-charcoal rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                
                {/* Locations header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-brand-green/10 text-brand-green font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                      Intercity Express
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-medium">
                      ID: {route.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight">
                        {route.departure}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">Central Hub</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-800 border-dashed border-b" />
                      <Navigation className="w-4 h-4 text-brand-gold rotate-90 absolute" />
                    </div>

                    <div className="text-right">
                      <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight">
                        {route.destination}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">Destination</p>
                    </div>
                  </div>
                </div>

                {/* Travel Meta */}
                <div className="my-5 py-4 border-t border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-brand-green" />
                    <span>Est. {route.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                    <Tag className="w-4 h-4 text-brand-gold-dark" />
                    <span className="font-mono text-sm font-bold">{route.priceXAF.toLocaleString()} XAF</span>
                  </div>
                </div>

                {/* Schedules list */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Daily Departures
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {route.schedules.map((time) => (
                      <span 
                        key={time} 
                        className="text-[10px] font-mono font-semibold bg-slate-50 dark:bg-brand-gray border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book button */}
                <button
                  onClick={() => handleBookRoute(route)}
                  className="w-full bg-slate-50 dark:bg-brand-gray hover:bg-brand-green dark:hover:bg-brand-green hover:text-white dark:hover:text-white text-brand-green dark:text-slate-300 font-display font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-all duration-200 border border-brand-green/20 dark:border-slate-800 hover:border-transparent cursor-pointer flex items-center justify-center gap-1"
                >
                  Book This Route
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}

          {filteredRoutes.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400 dark:text-slate-500 font-light">
              No routes found matching your filter parameters.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
