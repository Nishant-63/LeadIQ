// lib/demo-data.ts
// All hardcoded lead data, briefing cards, and activity entries for the dashboard demo

// ─── Types ────────────────────────────────────────────────────────────────────

export type LeadTier = 'hot' | 'warm' | 'cold';
export type HandoffStatus = 'ai' | 'human';

export interface BriefingCard {
  budget: string;
  property: string;
  timeline: string;
  loanStatus: string;
  intentSignals: string[];
  suggestedOpener: string;
  watchOut: string;
}

export interface DemoLead {
  id: string;
  name: string;
  phone: string;
  score: number;
  tier: LeadTier;
  budget: string;
  timeline: string;
  requirement: string;
  aiSummary: string;
  handoffStatus: HandoffStatus;
  nurtureStatus?: string;
  briefing?: BriefingCard;
}

// ─── Legacy interface kept for backward-compat with existing components ────────

export interface MockLead {
  id: string;
  name: string;
  phone: string;
  source: 'FB Ad' | 'Google Ad' | 'Walk-in' | 'Website';
  budget: string;
  timeline: string;
  score: number;
  tier: LeadTier;
  location: string;
}

// ─── Hot Leads (Dashboard Queue) ──────────────────────────────────────────────

export const HOT_LEADS: DemoLead[] = [
  {
    id: 'hot-1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    score: 87,
    tier: 'hot',
    budget: '₹75–90L',
    timeline: '2–3 months',
    requirement: '3BHK, Mohali Sector 70–80',
    aiSummary: 'High intent buyer, pre-approved loan, shortlisting now',
    handoffStatus: 'ai',
    briefing: {
      budget: '₹75–90L',
      property: '3BHK, Mohali Sector 70–80 preferred',
      timeline: 'Wants possession in 2–3 months',
      loanStatus: 'Pre-approved from HDFC',
      intentSignals: [
        'Asked about specific project names',
        'Requested site visit availability',
        'Mentioned comparing 2 projects',
      ],
      suggestedOpener:
        "Hi Rahul, I saw you're looking at 3BHK options in Mohali — we have a project in Sector 74 with immediate possession. Should I send you the floor plans?",
      watchOut: "Mentioned budget is firm — don't push above ₹90L",
    },
  },
  {
    id: 'hot-2',
    name: 'Priya Mehta',
    phone: '+91 91234 56789',
    score: 81,
    tier: 'hot',
    budget: '₹60–70L',
    timeline: '1 month',
    requirement: '3BHK, Zirakpur',
    aiSummary: 'Relocating from Delhi, urgent requirement, ready to visit site',
    handoffStatus: 'ai',
    briefing: {
      budget: '₹60–70L',
      property: '3BHK, Zirakpur (near NH-7 corridor preferred)',
      timeline: 'Must move within 1 month — relocation deadline',
      loanStatus: 'Applied at SBI, approval pending',
      intentSignals: [
        'Asked for site visit slots this weekend',
        'Shared current rental agreement end date',
        'Inquired about school proximity for kids',
      ],
      suggestedOpener:
        "Hi Priya, I know you're relocating from Delhi — we have a 3BHK in Zirakpur with a school 500m away, ready for possession. Want me to block a site visit for Saturday?",
      watchOut: 'SBI loan approval still pending — confirm before closing deal',
    },
  },
  {
    id: 'hot-3',
    name: 'Amit Verma',
    phone: '+91 99887 76655',
    score: 79,
    tier: 'hot',
    budget: '₹45–55L',
    timeline: '3 months',
    requirement: '2BHK, Kharar',
    aiSummary: 'First-time buyer, needs guidance, high engagement in chat',
    handoffStatus: 'ai',
    briefing: {
      budget: '₹45–55L',
      property: '2BHK, Kharar or New Chandigarh area',
      timeline: 'Flexible — 3 months but can stretch to 6',
      loanStatus: 'Not applied yet — exploring options',
      intentSignals: [
        'Asked 15+ questions in chat session',
        'Requested home loan calculator link',
        'Saved 3 project brochures from bot',
      ],
      suggestedOpener:
        "Hi Amit, first home purchase is exciting — we have a 2BHK in Kharar that fits your budget perfectly, and we can connect you with our HDFC partner for a pre-approval in 48 hours. Interested?",
      watchOut:
        'First-time buyer — needs hand-holding through the process, do not overwhelm with options',
    },
  },
  {
    id: 'hot-4',
    name: 'Sunita Kapoor',
    phone: '+91 88776 65544',
    score: 76,
    tier: 'hot',
    budget: '₹80L+',
    timeline: '6 months',
    requirement: '3BHK, Aerocity Mohali',
    aiSummary: 'Investor profile, comparing 2 projects, price-sensitive',
    handoffStatus: 'ai',
    briefing: {
      budget: '₹80L+ (investor mindset, wants ROI clarity)',
      property: '3BHK or 4BHK in Aerocity Mohali — premium segment',
      timeline: '6 months — not in a rush, wants the right deal',
      loanStatus: 'Self-funded — no loan required',
      intentSignals: [
        'Asked about rental yield on 3BHK in Aerocity',
        'Mentioned she already owns a flat in Chandigarh',
        'Requested capital appreciation data for last 3 years',
      ],
      suggestedOpener:
        "Hi Sunita, based on our data Aerocity 3BHKs have appreciated 18% in 2 years — I can share a detailed ROI report for the project you were comparing. Shall I send it to you now?",
      watchOut:
        'She is comparing 2 projects — find out the competitor and differentiate on ROI and amenities',
    },
  },
];

// ─── Warm Leads ───────────────────────────────────────────────────────────────

export const WARM_LEADS: DemoLead[] = [
  {
    id: 'warm-1',
    name: 'Deepak Singh',
    phone: '+91 97301 22334',
    score: 64,
    tier: 'warm',
    budget: '₹55–65L',
    timeline: '6 months',
    requirement: '3BHK, Panchkula Sector 20',
    aiSummary: 'Interested but undecided between Panchkula and Zirakpur',
    handoffStatus: 'ai',
    nurtureStatus: 'Nurture sequence active',
  },
  {
    id: 'warm-2',
    name: 'Kavita Bhatia',
    phone: '+91 98112 77654',
    score: 59,
    tier: 'warm',
    budget: '₹40–50L',
    timeline: '4–5 months',
    requirement: '2BHK, Chandigarh',
    aiSummary: 'Budget buyer, needs EMI calculator, re-engaged yesterday',
    handoffStatus: 'ai',
    nurtureStatus: 'Nurture sequence active',
  },
  {
    id: 'warm-3',
    name: 'Manpreet Kaur',
    phone: '+91 96500 44312',
    score: 56,
    tier: 'warm',
    budget: '₹70–80L',
    timeline: '6–9 months',
    requirement: '3BHK, Mohali Sector 85',
    aiSummary: 'NRI buyer, exploring from Canada, follow-up scheduled',
    handoffStatus: 'ai',
    nurtureStatus: 'Drip email active',
  },
  {
    id: 'warm-4',
    name: 'Rohit Aggarwal',
    phone: '+91 95010 98765',
    score: 52,
    tier: 'warm',
    budget: '₹30–40L',
    timeline: '6 months',
    requirement: '2BHK, Kharar or Dera Bassi',
    aiSummary: 'First-time buyer on tight budget, needs flexible payment plan',
    handoffStatus: 'ai',
    nurtureStatus: 'Nurture sequence active',
  },
  {
    id: 'warm-5',
    name: 'Anjali Grover',
    phone: '+91 98200 55103',
    score: 48,
    tier: 'warm',
    budget: '₹65–75L',
    timeline: '8 months',
    requirement: '3BHK, Zirakpur premium',
    aiSummary: 'Upgrading from 2BHK, comparing 3 builders, price-sensitive',
    handoffStatus: 'ai',
    nurtureStatus: 'Nurture sequence active',
  },
];

// ─── Cold Leads ───────────────────────────────────────────────────────────────

export const COLD_LEADS: DemoLead[] = [
  {
    id: 'cold-1',
    name: 'Harpreet Sandhu',
    phone: '+91 70091 12233',
    score: 28,
    tier: 'cold',
    budget: 'Not disclosed',
    timeline: 'Just exploring',
    requirement: 'Not specified',
    aiSummary: 'Early stage, not ready to engage',
    handoffStatus: 'ai',
    nurtureStatus: 'No response',
  },
  {
    id: 'cold-2',
    name: 'Suresh Walia',
    phone: '+91 98765 11009',
    score: 24,
    tier: 'cold',
    budget: '₹20–25L',
    timeline: '12+ months',
    requirement: '1BHK, anywhere in Tricity',
    aiSummary: 'Very early stage, budget too low for current inventory',
    handoffStatus: 'ai',
    nurtureStatus: 'No response',
  },
  {
    id: 'cold-3',
    name: 'Pooja Nanda',
    phone: '+91 88001 77654',
    score: 31,
    tier: 'cold',
    budget: 'Under ₹30L',
    timeline: 'Not sure',
    requirement: 'Plot or flat — undecided',
    aiSummary: 'Unclear intent, dropped off mid-qualification',
    handoffStatus: 'ai',
    nurtureStatus: 'Paused',
  },
  {
    id: 'cold-4',
    name: 'Tejinder Bhatt',
    phone: '+91 99003 44211',
    score: 19,
    tier: 'cold',
    budget: 'Not disclosed',
    timeline: 'Just browsing',
    requirement: 'Commercial, maybe',
    aiSummary: 'Unresponsive after initial contact',
    handoffStatus: 'ai',
    nurtureStatus: 'No response',
  },
];

// ─── Legacy MOCK_HOT_LEADS (keeps existing components working) ─────────────────

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
];

// ─── Activity Feed ─────────────────────────────────────────────────────────────

export interface ActivityEntry {
  id: string;
  dot: string;
  dotColor: string;
  text: string;
  minutesAgo: number;
}

export const MOCK_ACTIVITY: ActivityEntry[] = [
  { id: 'a1', dot: 'check', dotColor: 'bg-green-500', text: 'Rahul Sharma qualified — Score 87 — Hot lead', minutesAgo: 2 },
  { id: 'a2', dot: 'calendar', dotColor: 'bg-purple-500', text: 'Appointment reminder sent to Priya Mehta', minutesAgo: 14 },
  { id: 'a3', dot: 'message', dotColor: 'bg-teal-500', text: 'Nurture message sent to Deepak Singh', minutesAgo: 60 },
  { id: 'a4', dot: 'flame', dotColor: 'bg-red-500', text: 'New Hot lead detected: Amit Verma', minutesAgo: 120 },
  { id: 'a5', dot: 'chart', dotColor: 'bg-blue-500', text: 'Score recalculated for Sunita Kapoor — 76', minutesAgo: 140 },
  { id: 'a6', dot: 'message', dotColor: 'bg-teal-500', text: 'Drip email sent to Manpreet Kaur (NRI sequence)', minutesAgo: 180 },
  { id: 'a7', dot: 'calendar', dotColor: 'bg-purple-500', text: 'Site visit confirmed — Rahul Sharma — Saturday 11am', minutesAgo: 210 },
  { id: 'a8', dot: 'bot', dotColor: 'bg-indigo-500', text: 'AI engaged 38 new leads via WhatsApp bot today', minutesAgo: 300 },
];

// ─── Quick Reply Chips (qualification flow) ────────────────────────────────────

export const QUICK_REPLY_CHIPS: Record<number, string[]> = {
  1: ['Around 50 lakhs', '80 lakhs - 1 crore', '1-2 crore'],
  2: ['Within 3 months', '6 months', 'Just exploring'],
  3: ['Mohali', 'Panchkula', 'Chandigarh'],
  4: ['Residential, ready-to-move', 'Residential, under construction', 'Commercial'],
  5: ['Yes, visited a few', 'Just started looking', 'No, first time'],
};
