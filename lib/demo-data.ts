// lib/demo-data.ts
// Mock leads and activity log for dashboard

export interface MockLead {
  id: string;
  name: string;
  phone: string;
  source: 'FB Ad' | 'Google Ad' | 'Walk-in' | 'Website';
  budget: string;
  timeline: string;
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  location: string;
}

export const MOCK_HOT_LEADS: MockLead[] = [
  {
    id: 'lead-1',
    name: 'Vikram Singh',
    phone: '99158XXXXX',
    source: 'Walk-in',
    budget: '1.5 Crore',
    timeline: 'Immediate',
    score: 92,
    tier: 'hot',
    location: 'Mohali Sec 70',
  },
  {
    id: 'lead-2',
    name: 'Rajesh Sharma',
    phone: '98761XXXXX',
    source: 'Google Ad',
    budget: '1.2 Crore',
    timeline: '2 months',
    score: 88,
    tier: 'hot',
    location: 'Panchkula Sec 15',
  },
  {
    id: 'lead-3',
    name: 'Suresh Mehta',
    phone: '70091XXXXX',
    source: 'Google Ad',
    budget: '2 Crore',
    timeline: '3 months',
    score: 85,
    tier: 'hot',
    location: 'Zirakpur',
  },
  {
    id: 'lead-4',
    name: 'Priya Malhotra',
    phone: '97302XXXXX',
    source: 'FB Ad',
    budget: '85 Lakhs',
    timeline: '3 months',
    score: 76,
    tier: 'hot',
    location: 'Chandigarh Sec 20',
  },
  {
    id: 'lead-5',
    name: 'Anita Kapoor',
    phone: '98550XXXXX',
    source: 'FB Ad',
    budget: '60 Lakhs',
    timeline: '6 months',
    score: 71,
    tier: 'hot',
    location: 'Mohali Sec 82',
  },
];

export interface ActivityEntry {
  id: string;
  dot: string;
  dotColor: string;
  text: string;
  minutesAgo: number;
}

export const MOCK_ACTIVITY: ActivityEntry[] = [
  { id: 'a1', dot: '🔵', dotColor: 'bg-blue-500', text: 'Qualification started for Vikram Singh', minutesAgo: 2 },
  { id: 'a2', dot: '🟢', dotColor: 'bg-green-500', text: 'Score calculated: 92/100 — HOT', minutesAgo: 2 },
  { id: 'a3', dot: '📅', dotColor: 'bg-purple-500', text: 'Appointment booked — Vikram Singh', minutesAgo: 3 },
  { id: 'a4', dot: '🔵', dotColor: 'bg-blue-500', text: 'Qualification started for Priya Malhotra', minutesAgo: 8 },
  { id: 'a5', dot: '🟡', dotColor: 'bg-yellow-500', text: 'Score calculated: 76/100 — HOT', minutesAgo: 9 },
  { id: 'a6', dot: '💬', dotColor: 'bg-teal-500', text: 'Nurture message sent to Deepak Verma', minutesAgo: 12 },
  { id: 'a7', dot: '🔵', dotColor: 'bg-blue-500', text: '23 leads imported via CSV', minutesAgo: 15 },
  { id: 'a8', dot: '🟢', dotColor: 'bg-green-500', text: 'Score calculated: 85/100 — HOT', minutesAgo: 18 },
  { id: 'a9', dot: '👤', dotColor: 'bg-gray-500', text: 'Human takeover — Anita Kapoor', minutesAgo: 22 },
  { id: 'a10', dot: '💬', dotColor: 'bg-teal-500', text: 'Nurture sequence scheduled — 3 leads', minutesAgo: 30 },
  { id: 'a11', dot: '🔵', dotColor: 'bg-blue-500', text: 'Qualification started for Rajesh Sharma', minutesAgo: 35 },
  { id: 'a12', dot: '🟢', dotColor: 'bg-green-500', text: 'Appointment confirmed — Suresh Mehta', minutesAgo: 41 },
];

export const QUICK_REPLY_CHIPS: Record<number, string[]> = {
  1: ['Around 50 lakhs', '80 lakhs - 1 crore', '1-2 crore'],
  2: ['Within 3 months', '6 months', 'Just exploring'],
  3: ['Mohali', 'Panchkula', 'Chandigarh'],
  4: ['Residential, ready-to-move', 'Residential, under construction', 'Commercial'],
  5: ['Yes, visited a few', 'Just started looking', 'No, first time'],
};
