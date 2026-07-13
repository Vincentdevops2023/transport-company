import { Route, Bus, Testimonial, FAQItem, ServiceItem } from '../types';

export const CITIES = [
  'Douala',
  'Yaoundé',
  'Buea',
  'Limbe',
  'Bamenda',
  'Kribi',
  'Garoua'
];

export const ROUTES: Route[] = [
  { id: '1', departure: 'Douala', destination: 'Yaoundé', priceXAF: 8000, duration: '4h 00m', schedules: ['06:00', '08:30', '11:00', '13:30', '16:00', '19:00', '22:00'] },
  { id: '2', departure: 'Yaoundé', destination: 'Douala', priceXAF: 8000, duration: '4h 00m', schedules: ['06:00', '08:30', '11:00', '13:30', '16:00', '19:00', '22:00'] },
  
  { id: '3', departure: 'Douala', destination: 'Buea', priceXAF: 5000, duration: '1h 30m', schedules: ['07:00', '10:00', '13:00', '16:00', '19:00'] },
  { id: '4', departure: 'Buea', destination: 'Douala', priceXAF: 5000, duration: '1h 30m', schedules: ['07:00', '10:00', '13:00', '16:00', '19:00'] },
  
  { id: '5', departure: 'Douala', destination: 'Bamenda', priceXAF: 15000, duration: '7h 00m', schedules: ['06:30', '08:00', '20:00'] },
  { id: '6', departure: 'Bamenda', destination: 'Douala', priceXAF: 15000, duration: '7h 00m', schedules: ['06:30', '08:00', '20:00'] },
  
  { id: '7', departure: 'Buea', destination: 'Limbe', priceXAF: 2500, duration: '45m', schedules: ['08:00', '11:00', '14:00', '17:00'] },
  { id: '8', departure: 'Limbe', destination: 'Buea', priceXAF: 2500, duration: '45m', schedules: ['08:00', '11:00', '14:00', '17:00'] },
  
  { id: '9', departure: 'Douala', destination: 'Kribi', priceXAF: 7500, duration: '3h 00m', schedules: ['07:30', '11:30', '15:30'] },
  { id: '10', departure: 'Kribi', destination: 'Douala', priceXAF: 7500, duration: '3h 00m', schedules: ['07:30', '11:30', '15:30'] },
  
  { id: '11', departure: 'Yaoundé', destination: 'Garoua', priceXAF: 18000, duration: '14h 00m', schedules: ['06:00', '17:00'] },
  { id: '12', departure: 'Garoua', destination: 'Yaoundé', priceXAF: 18000, duration: '14h 00m', schedules: ['06:00', '17:00'] }
];

export const FLEET: Bus[] = [
  {
    id: 'executive',
    name: 'Executive Coach',
    description: 'Our standard for executive travel, balancing cost and exceptional comfort.',
    capacity: 40,
    features: ['Fully Air Conditioned', 'Free High-speed Wi-Fi', 'USB Charging Ports', 'Comfortable Reclining Seats', 'Ample Luggage Space'],
    priceXAF: 0, // Base price
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'vip',
    name: 'VIP Bus',
    description: 'The pinnacle of luxury travel. Premium service with hostesses and snacks.',
    capacity: 24,
    features: ['Fully Air Conditioned', 'Ultra Wi-Fi 5G', 'Type-C Fast Charging', 'Premium Leather Recliners', 'Complimentary Drinks & Snacks', 'Onboard Hostess Service', 'Individual Entertainment Screens'],
    priceXAF: 4000, // VIP premium add-on
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'luxury',
    name: 'Luxury Coach',
    description: 'Perfect for long distances, featuring full washroom facilities and high capacity.',
    capacity: 50,
    features: ['Fully Air Conditioned', 'Free High-speed Wi-Fi', 'USB Charging Ports', 'Ergonomic Reclining Seats', 'Onboard Clean Restroom', 'Safety ABS & GPS Tracking'],
    priceXAF: 2000, // Luxury premium add-on
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'minibus',
    name: 'Mini Bus Express',
    description: 'Ideal for shorter distances and business groups needing fast, direct transfers.',
    capacity: 18,
    features: ['Fully Air Conditioned', 'Wi-Fi On Board', 'Fast direct routes', 'Comfortable Individual Seats', 'Quick boarding/deboarding'],
    priceXAF: -500, // Small discount for smaller bus
    image: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&q=80&w=800'
  }
];

export const WHY_CHOOSE_US = [
  { id: '1', title: 'Safe Travel', description: 'Advanced security systems, GPS real-time tracking, and emergency response partnerships on all routes.', icon: 'ShieldCheck' },
  { id: '2', title: 'Affordable Prices', description: 'Competitive rates and special packages that provide the best transport value in Cameroon.', icon: 'BadgePercent' },
  { id: '3', title: 'Online Booking', description: 'Book in under 2 minutes, pick your preferred seat, and receive your digital boarding pass instantly.', icon: 'Smartphone' },
  { id: '4', title: 'GPS Tracking', description: 'Our entire fleet is tracked 24/7 with satellite GPS for passenger safety and precise scheduling.', icon: 'MapPin' },
  { id: '5', title: 'Comfortable Seats', description: 'Generous legroom, premium reclining seats, and built-in amenities for an fatigue-free ride.', icon: 'Armchair' },
  { id: '6', title: 'Professional Drivers', description: 'Strictly vetted, highly trained drivers with flawless safety records on Cameroonian highways.', icon: 'UserCheck' },
  { id: '7', title: '24/7 Support', description: 'Our round-the-clock helpdesk is always available to answer calls, texts, or booking adjustments.', icon: 'Headphones' },
  { id: '8', title: 'Fast Customer Service', description: 'Punctual departures, swift check-ins, and immediate response to all inquiries.', icon: 'Zap' }
];

export const BOOKING_PROCESS = [
  { step: '01', title: 'Select Route', description: 'Choose your origin and destination cities from our national network.' },
  { step: '02', title: 'Choose Date', description: 'Pick your preferred travel date and time from convenient schedules.' },
  { step: '03', title: 'Pick Seat', description: 'Use our interactive real-time map to select your favorite cabin seat.' },
  { step: '04', title: 'Make Payment', description: 'Pay securely using MTN Mobile Money, Orange Money, or credit card.' },
  { step: '05', title: 'Receive E-ticket', description: 'Instantly download your boarding pass with reference QR code.' },
  { step: '06', title: 'Travel', description: 'Arrive at the terminal, board with your e-ticket, and enjoy a safe journey.' }
];

export const SERVICES: ServiceItem[] = [
  { id: '1', title: 'Passenger Transport', description: 'Punctual, premium intercity passenger travel across Cameroon with luxury and executive coaches.', icon: 'Bus' },
  { id: '2', title: 'Parcel Delivery & Cargo', description: 'Fast, secure shipping of packages and large cargo between Douala, Yaoundé, Buea, Bamenda, and Garoua.', icon: 'Package' },
  { id: '3', title: 'Door-to-Door Delivery', description: 'Convenient package pickups and door-to-door deliveries in major Cameroonian metropolitan areas.', icon: 'Truck' },
  { id: '4', title: 'Corporate Travel Solutions', description: 'Tailored staff transit services, corporate retreats, and recurring group rentals for business operations.', icon: 'Briefcase' },
  { id: '5', title: 'VIP Shuttle Service', description: 'Discreet, high-end private shuttles featuring our VIP Buses for dignitaries, events, or executive transfers.', icon: 'Crown' },
  { id: '6', title: 'Airport Transfers', description: 'Direct shuttle connections from Douala International and Yaoundé Nsimalen Airports to your final city destination.', icon: 'Plane' },
  { id: '7', title: 'Express Package Logistics', description: 'Same-day package and letter shipping option for critical documents and items between our main terminals.', icon: 'Send' },
  { id: '8', title: 'Business Logistics Partner', description: 'Contracted freight transportation and supply chain support for retailers, distributors, and farmers.', icon: 'TrendingUp' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Samuel Eto'o",
    role: "Business Traveler (Douala)",
    comment: "TRANSPOCAM has completely redefined premium intercity travel in Cameroon. The VIP Bus is incredibly comfortable, the staff is highly professional, and the Wi-Fi actually works! A game changer for my business trips.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: '2',
    name: "Florence Ndip",
    role: "University Student (Buea)",
    comment: "As a student in Buea, I travel often to visit family in Limbe and Douala. Booking my seat online takes me less than 2 minutes. I pay with MTN Mobile Money and show up. No more queues at the agency!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: '3',
    name: "Marc Alima",
    role: "Project Manager (Yaoundé)",
    comment: "Extremely reliable service. Departure times are highly punctual, which is rare. The drivers are professional, and the coaches feel very safe. I also use their parcel delivery, and it is flawless.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: '4',
    name: "Christelle Bella",
    role: "Tourism Consultant (Kribi)",
    comment: "I frequently book tickets for international tourists visiting Kribi beaches. TRANSPOCAM is the only company I trust. Their clean coaches, functional AC, and outstanding comfort make my clients very happy.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: '5',
    name: "Amadou Bello",
    role: "Trader (Garoua)",
    comment: "The long journey from Yaoundé to Garoua used to be a nightmare, but TRANSPOCAM’s Luxury Coach with onboard restrooms and superb reclining seats made it comfortable and stress-free. Splendid service!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  }
];

export const GALLERY_ITEMS = [
  {
    title: 'Modern VIP Fleet',
    category: 'Buses',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    location: 'Bonaberi Terminal, Douala'
  },
  {
    title: 'Professional Crew & Drivers',
    category: 'Team',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800', // Placeholders with African males or professional drivers
    location: 'Yaoundé Departure Lounge'
  },
  {
    title: 'Travel Comfort & Luxury',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=800',
    location: 'En Route to Bamenda'
  },
  {
    title: 'Beautiful Buea Mountain View Road',
    category: 'Landmarks',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800',
    location: 'Mount Fako Highway, Buea'
  },
  {
    title: 'Douala City Skylines',
    category: 'Cities',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800',
    location: 'Wouri Bridge, Douala'
  },
  {
    title: 'Limbe Seaside Terminal',
    category: 'Landmarks',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    location: 'Black Sand Beach Highway, Limbe'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book a ticket on TRANSPOCAM?',
    answer: 'You can book your ticket online in under 2 minutes! Simply select your departure city, destination, and travel date, choose your preferred seat from the interactive seat map, enter your contact information, and make a secure payment using MTN Mobile Money, Orange Money, or credit cards. You will receive an e-ticket immediately on your screen and via email.'
  },
  {
    id: 'faq-2',
    question: 'Can I cancel or reschedule my ticket?',
    answer: 'Yes! You can reschedule your trip or cancel it up to 6 hours before the scheduled departure time. Rescheduling is free for the first occurrence, while cancellations attract a tiny processing fee. To make changes, click on "Check Ticket" on our website, use our WhatsApp support button, or visit any of our physical terminals.'
  },
  {
    id: 'faq-3',
    question: 'How do payments work on TRANSPOCAM?',
    answer: 'We support all major payment methods popular in Cameroon, including MTN Mobile Money (MoMo), Orange Money (OM), Visa, Mastercard, or secure cash payment at any of our ticketing terminals. Mobile money payments are processed in real-time, sending a prompt directly to your phone for confirmation.'
  },
  {
    id: 'faq-4',
    question: 'Can I transport parcels or luggage with TRANSPOCAM?',
    answer: 'Absolutely! We operate a specialized Cargo and Express Parcel Delivery service. You can send documents, boxes, and heavy luggage securely across our entire terminal network. High-value parcels are locked in secure compartments, and you can track their status using our customer service line.'
  },
  {
    id: 'faq-5',
    question: 'What are the baggage allowances for passengers?',
    answer: 'Each passenger is entitled to 2 standard pieces of hand/hold luggage (up to 30kg combined) for free. Overweight or extra items will incur a small charge, payable during check-in at the departure terminal.'
  }
];
