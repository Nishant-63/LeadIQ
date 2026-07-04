// lib/demo-data.ts
// All hardcoded lead data, briefing cards, and activity entries for the dashboard demo

// ─── Types ────────────────────────────────────────────────────────────────────

export type LeadTier = 'hot' | 'warm' | 'cold';
export type HandoffStatus = 'ai' | 'human';

export interface BriefingCard {
  budget: string;
  property: string;      // Used for Model Interest in automotive vertical
  timeline: string;
  loanStatus: string;    // Used for Financing Status in automotive vertical
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
    name: 'Arjun Malhotra',
    phone: '+91 98765 43210',
    score: 93,
    tier: 'hot',
    budget: '₹65–75L',
    timeline: 'Within 2 weeks',
    requirement: 'Audi Q5, new, loan financing',
    aiSummary: 'Cross-shopping Q5 vs BMW X3, financing approved, ready to test drive',
    handoffStatus: 'ai',
    briefing: {
      budget: '₹65–75L',
      property: 'Audi Q5 (2024), Pearl White preferred',
      timeline: 'Wants delivery before month-end — EOM deadline',
      loanStatus: 'HDFC Bank pre-approval done — in principle approved',
      intentSignals: [
        'Requested test drive slot for this Saturday',
        'Asked about exchange value for his Honda City',
        'Compared Q5 with BMW X3 at BMW Chandigarh last week',
      ],
      suggestedOpener:
        "Hi Arjun, I see you're comparing the Q5 with the X3 — the Q5 gives you a significantly more premium cabin and virtual cockpit at a comparable price point. Shall I block a test drive for Saturday morning?",
      watchOut: 'He visited BMW Chandigarh last week — price/feature comparison will be critical. Have the Q5 vs X3 sheet ready.',
    },
  },
  {
    id: 'hot-2',
    name: 'Neha Sood',
    phone: '+91 91234 56789',
    score: 88,
    tier: 'hot',
    budget: '₹40–50L',
    timeline: 'This month',
    requirement: 'Audi A4, new or certified pre-owned',
    aiSummary: 'Cash buyer, upgrading from Skoda Superb, brother owns Audi A6 — brand loyalty',
    handoffStatus: 'ai',
    briefing: {
      budget: '₹40–50L (flexible if the right car is available)',
      property: 'Audi A4 (2023/2024) — open to certified pre-owned',
      timeline: 'This month — business milestone reward purchase',
      loanStatus: 'Cash buyer — no financing required',
      intentSignals: [
        'Currently owns a Skoda Superb — clear upgrade intent',
        'Asked about CPO warranty coverage and service package',
        'Brother owns an Audi A6 — strong brand loyalty signal',
      ],
      suggestedOpener:
        "Hi Neha, congratulations on the milestone! We have a stunning Navarra Blue A4 that just came in — and since your brother already drives an A6, you'd qualify for our Audi family loyalty benefit. Want me to set up a private viewing?",
      watchOut: 'She is comparing new vs CPO on price — have both options ready with clear warranty differentiators.',
    },
  },
  {
    id: 'hot-3',
    name: 'Vikram Sethi',
    phone: '+91 99887 76655',
    score: 82,
    tier: 'hot',
    budget: '₹90L–1.1Cr',
    timeline: 'This week',
    requirement: 'Audi Q7, new, downpayment + EMI',
    aiSummary: 'Business owner, urgent buy before travel, trading in Fortuner, comparing Q7 vs GLE',
    handoffStatus: 'ai',
    briefing: {
      budget: '₹90L–1.1Cr',
      property: 'Audi Q7 55 TFSI — 7-seater, sunroof mandatory',
      timeline: 'This week — buying before flying out on business trip',
      loanStatus: 'Downpayment ₹25L ready, balance via EMI — financing partner shortlisted',
      intentSignals: [
        'Wants to trade in his 2021 Toyota Fortuner',
        'Visited Mercedes-Benz Chandigarh for GLE pricing',
        'Asked specifically about Q7 delivery timeline and colour availability',
      ],
      suggestedOpener:
        "Hi Vikram, I understand you need this sorted before your travel — we have a Q7 55 TFSI in stock with panoramic sunroof, and I can get your Fortuner evaluated today itself. Shall I set up a slot for evaluation + test drive back-to-back?",
      watchOut: 'He is in a GLE vs Q7 comparison — time-sensitivity is your advantage. Move fast before he commits to Mercedes.',
    },
  },
  {
    id: 'hot-4',
    name: 'Sunita Kapoor',
    phone: '+91 88776 65544',
    score: 76,
    tier: 'hot',
    budget: '₹75–85L',
    timeline: '1 month',
    requirement: 'Audi Q5 or A6, new, exploring both',
    aiSummary: 'NRI visiting Chandigarh, gift purchase for family, test drive scheduled this weekend',
    handoffStatus: 'ai',
    briefing: {
      budget: '₹75–85L (gift purchase, flexible if right model available)',
      property: 'Audi Q5 or A6 — premium variant, panoramic roof preferred',
      timeline: 'Within 1 month — needs delivery before returning abroad',
      loanStatus: 'Cash purchase — wire transfer from Canada account',
      intentSignals: [
        'Test drive scheduled for this Sunday at 11am',
        'Asked about colour options and waiting period for Q5',
        'Requested delivery documentation for NRI registration process',
      ],
      suggestedOpener:
        "Hi Sunita, welcome back to India! We've confirmed your Sunday test drive for the Q5 Sportback — we also have the A6 45 TFSI ready to compare side by side. I'll arrange refreshments and block 2 hours for a relaxed experience.",
      watchOut: 'She is comparing Q5 and A6 simultaneously — have a clear differentiator pitch ready. NRI registration paperwork must be pre-prepared.',
    },
  },
];

// ─── Warm Leads ───────────────────────────────────────────────────────────────

export const WARM_LEADS: DemoLead[] = [
  {
    id: 'warm-1',
    name: 'Simran Dhaliwal',
    phone: '+91 97301 22334',
    score: 71,
    tier: 'warm',
    budget: '₹55–65L',
    timeline: '1 month',
    requirement: 'Audi Q3, new, EMI financing',
    aiSummary: 'Govt. employee, first luxury car, exploring loan options with 3 banks',
    handoffStatus: 'ai',
    nurtureStatus: 'Nurture sequence active',
  },
  {
    id: 'warm-2',
    name: 'Rohit Chadha',
    phone: '+91 98112 77654',
    score: 63,
    tier: 'warm',
    budget: '₹35–45L',
    timeline: '6–8 weeks',
    requirement: 'Audi A3, certified pre-owned preferred',
    aiSummary: 'IT professional, budget-conscious, comparing CPO vs new entry-level',
    handoffStatus: 'ai',
    nurtureStatus: 'Nurture sequence active',
  },
  {
    id: 'warm-3',
    name: 'Parmeet Gill',
    phone: '+91 96500 44312',
    score: 55,
    tier: 'warm',
    budget: '₹75–85L',
    timeline: '2 months',
    requirement: 'Audi Q5 or Q7, exploring both',
    aiSummary: 'NRI visiting Chandigarh, gift for family, undecided on Q5 vs Q7',
    handoffStatus: 'ai',
    nurtureStatus: 'Drip email active',
  },
  {
    id: 'warm-4',
    name: 'Kavita Bhatia',
    phone: '+91 95010 98765',
    score: 52,
    tier: 'warm',
    budget: '₹30–40L',
    timeline: '2–3 months',
    requirement: 'Audi A3, pre-owned, budget-sensitive',
    aiSummary: 'First luxury car buyer, needs EMI breakdown, re-engaged yesterday',
    handoffStatus: 'ai',
    nurtureStatus: 'Nurture sequence active',
  },
  {
    id: 'warm-5',
    name: 'Deepak Anand',
    phone: '+91 98200 55103',
    score: 48,
    tier: 'warm',
    budget: '₹65–75L',
    timeline: '3 months',
    requirement: 'Audi Q5 Premium Plus, undecided on variant',
    aiSummary: 'Upgrading from Honda CR-V, comparing 2 trims, price-sensitive',
    handoffStatus: 'ai',
    nurtureStatus: 'Nurture sequence active',
  },
];

// ─── Cold Leads ───────────────────────────────────────────────────────────────

export const COLD_LEADS: DemoLead[] = [
  {
    id: 'cold-1',
    name: 'Hardeep Bains',
    phone: '+91 70091 12233',
    score: 32,
    tier: 'cold',
    budget: 'Not disclosed',
    timeline: 'Just browsing',
    requirement: 'Unsure — exploring Audi brand',
    aiSummary: 'Early-stage curiosity, no clear model or timeline',
    handoffStatus: 'ai',
    nurtureStatus: 'No response',
  },
  {
    id: 'cold-2',
    name: 'Gurjot Sandhu',
    phone: '+91 98765 11009',
    score: 24,
    tier: 'cold',
    budget: 'Under ₹30L',
    timeline: '12+ months',
    requirement: 'Pre-owned A3 or Q2, budget very tight',
    aiSummary: 'Budget does not match current inventory, long horizon',
    handoffStatus: 'ai',
    nurtureStatus: 'No response',
  },
  {
    id: 'cold-3',
    name: 'Pooja Nanda',
    phone: '+91 88001 77654',
    score: 29,
    tier: 'cold',
    budget: 'Not specified',
    timeline: 'Not sure',
    requirement: 'Looking for a gift idea — possibly',
    aiSummary: 'Unclear intent, dropped off after first question',
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
    requirement: 'Q3, budget not shared',
    aiSummary: 'Unresponsive after initial contact',
    handoffStatus: 'ai',
    nurtureStatus: 'No response',
  },
];

// ─── Legacy MOCK_HOT_LEADS (keeps existing components working) ─────────────────

export const MOCK_HOT_LEADS: MockLead[] = [
  {
    id: 'lead-1',
    name: 'Arjun Malhotra',
    phone: '99158XXXXX',
    source: 'Walk-in',
    budget: '₹65–75L',
    timeline: 'This week',
    score: 93,
    tier: 'hot',
    location: 'Audi Q5, Chandigarh',
  },
  {
    id: 'lead-2',
    name: 'Vikram Sethi',
    phone: '98761XXXXX',
    source: 'Google Ad',
    budget: '₹90L–1.1Cr',
    timeline: 'This week',
    score: 88,
    tier: 'hot',
    location: 'Audi Q7, Mohali',
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
  { id: 'a1', dot: 'check', dotColor: 'bg-green-500', text: 'Arjun Malhotra qualified — Score 93 — Hot lead', minutesAgo: 3 },
  { id: 'a2', dot: 'calendar', dotColor: 'bg-purple-500', text: 'Test drive scheduled for Arjun Malhotra — Saturday 11am', minutesAgo: 10 },
  { id: 'a3', dot: 'message', dotColor: 'bg-teal-500', text: 'Nurture sequence triggered for Simran Dhaliwal', minutesAgo: 45 },
  { id: 'a4', dot: 'flame', dotColor: 'bg-red-500', text: 'New Hot lead detected: Vikram Sethi — urgent buyer', minutesAgo: 90 },
  { id: 'a5', dot: 'chart', dotColor: 'bg-blue-500', text: 'Score recalculated for Neha Sood — 88', minutesAgo: 120 },
  { id: 'a6', dot: 'message', dotColor: 'bg-teal-500', text: 'Drip email sent to Parmeet Gill (NRI sequence)', minutesAgo: 180 },
  { id: 'a7', dot: 'calendar', dotColor: 'bg-purple-500', text: 'Test drive confirmed — Neha Sood — Sunday 3pm', minutesAgo: 220 },
  { id: 'a8', dot: 'bot', dotColor: 'bg-indigo-500', text: 'AI engaged 24 new Audi enquiries via WhatsApp today', minutesAgo: 300 },
];

// ─── Quick Reply Chips (qualification flow) ────────────────────────────────────

export const QUICK_REPLY_CHIPS: Record<number, string[]> = {
  1: ['Under ₹50L', '₹50–75L', '₹75L–1Cr', 'Above ₹1Cr'],
  2: ['Cash', 'Bank loan', 'Downpayment + EMI'],
  3: ['New car', 'Certified pre-owned'],
  4: ['This week', 'This month', 'Just exploring'],
  5: ['Yes, visited BMW/Mercedes', 'Just started looking', 'No, first time'],
};
