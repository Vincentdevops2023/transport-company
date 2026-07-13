import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { MapPin, Eye, Camera } from 'lucide-react';

// Import our custom generated images
import heroBus from '../assets/images/hero_bus_cameroon_1783955736789.jpg';
import driverBus from '../assets/images/driver_bus_cameroon_1783955750152.jpg';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Inject our custom generated images into the gallery items
  const fullGallery = [
    {
      title: 'Our Executive Highway Coach',
      category: 'Buses',
      image: heroBus,
      location: 'Douala - Yaoundé Express Highway'
    },
    {
      title: 'Professional Driver Service',
      category: 'Team',
      image: driverBus,
      location: 'Bonaberi Terminal, Douala'
    },
    ...GALLERY_ITEMS
  ];

  const categories = ['All', 'Buses', 'Interior', 'Team', 'Cities', 'Landmarks'];

  const filteredItems = activeCategory === 'All'
    ? fullGallery
    : fullGallery.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-white dark:bg-brand-charcoal" id="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            Our Gallery
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Capturing the Beauty of <span className="text-brand-green dark:text-brand-gold">Cameroon</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light">
            An authentic glimpse into our daily operations: showcasing our luxury fleet, professional drivers, comfortable cabins, and the wonderful cities we serve.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-green text-white shadow-md'
                  : 'bg-slate-100 dark:bg-brand-black text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-brand-gray'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(item.image)}
              className="group relative h-72 rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-sm cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1 mb-1">
                  <Camera className="w-3.5 h-3.5" />
                  {item.category}
                </span>
                <h4 className="font-display font-bold text-white text-base leading-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-300 flex items-center gap-1 font-light">
                  <MapPin className="w-3.5 h-3.5 text-brand-green-light shrink-0" />
                  {item.location}
                </p>
              </div>

              {/* Quick eye look icon */}
              <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX OVERLAY */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-brand-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Close [X]
            </button>
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/5"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

    </section>
  );
}
