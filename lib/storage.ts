// lib/storage.ts
// SSR-safe localStorage helpers with TypeScript types

export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  source: string;
}

export interface QualifiedData {
  answers: string[]; // Array of 5 user answers, indexed 0-4
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface ScoreBreakdown {
  budget: number;
  timeline: number;
  area: number;
  intent: number;
}

export interface ScoreData {
  total: number;
  tier: 'hot' | 'warm' | 'cold';
  breakdown: ScoreBreakdown;
}

export interface BookingData {
  date: string;
  time: string;
  leadName: string;
  leadPhone: string;
  budget: string;
}

const isClient = () => typeof window !== 'undefined';

export const storage = {
  getLead: (): LeadData | null => {
    if (!isClient()) return null;
    try {
      const raw = localStorage.getItem('leadiq_demo_lead');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setLead: (data: LeadData) => {
    if (!isClient()) return;
    localStorage.setItem('leadiq_demo_lead', JSON.stringify(data));
  },

  getQualified: (): QualifiedData | null => {
    if (!isClient()) return null;
    try {
      const raw = localStorage.getItem('leadiq_demo_qualified');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setQualified: (data: QualifiedData) => {
    if (!isClient()) return;
    localStorage.setItem('leadiq_demo_qualified', JSON.stringify(data));
  },

  getConversation: (): Array<{ role: 'user' | 'assistant'; content: string }> => {
    if (!isClient()) return [];
    try {
      const raw = localStorage.getItem('leadiq_demo_conversation');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
  setConversation: (data: Array<{ role: 'user' | 'assistant'; content: string }>) => {
    if (!isClient()) return;
    localStorage.setItem('leadiq_demo_conversation', JSON.stringify(data));
  },

  getScore: (): ScoreData | null => {
    if (!isClient()) return null;
    try {
      const raw = localStorage.getItem('leadiq_demo_score');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setScore: (data: ScoreData) => {
    if (!isClient()) return;
    localStorage.setItem('leadiq_demo_score', JSON.stringify(data));
  },

  getBooking: (): BookingData | null => {
    if (!isClient()) return null;
    try {
      const raw = localStorage.getItem('leadiq_demo_booking');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setBooking: (data: BookingData) => {
    if (!isClient()) return;
    localStorage.setItem('leadiq_demo_booking', JSON.stringify(data));
  },

  clearAll: () => {
    if (!isClient()) return;
    localStorage.removeItem('leadiq_demo_lead');
    localStorage.removeItem('leadiq_demo_qualified');
    localStorage.removeItem('leadiq_demo_conversation');
    localStorage.removeItem('leadiq_demo_score');
    localStorage.removeItem('leadiq_demo_booking');
  },
};
