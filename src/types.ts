export interface Route {
  id: string;
  departure: string;
  destination: string;
  priceXAF: number;
  duration: string;
  schedules: string[];
}

export interface Bus {
  id: string;
  name: string;
  description: string;
  capacity: number;
  features: string[];
  priceXAF: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Booking {
  reference: string;
  fullName: string;
  phone: string;
  email: string;
  departure: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  busType: string;
  selectedSeats: number[];
  paymentMethod: 'momo' | 'om' | 'card' | 'cash';
  totalPrice: number;
  status: 'Pending Payment' | 'Confirmed' | 'Completed';
  bookingDate: string;
}

export type Theme = 'light' | 'dark';
