// lib/verticals.ts
// Multi-vertical configuration for LeadIQ.
// Vertical is selected ONLY via the `?v=` URL query param — no UI toggle.

import { DemoLead, ActivityEntry } from './demo-data';

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface TierLabels {
  hot: string;
  warm: string;
  cold: string;
}

export interface VerticalConfig {
  verticalName: string;
  qualificationQuestions: string[];
  aiSystemPrompt: string;
  /** Sample leads used to pre-populate the dashboard demo */
  sampleLeads: {
    hotLeads: DemoLead[];
    warmLeads: DemoLead[];
    coldLeads: DemoLead[];
  };
  /** Activity feed entries for this vertical */
  activityFeed: ActivityEntry[];
  /** Labels shown in UI copy tied to tier actions */
  tierLabels: TierLabels;
  /** Scripted demo chat messages for the qualifying flow */
  demoScript: Array<{
    role: 'assistant' | 'user';
    content: string;
    isLast?: boolean;
  }>;
  /** Answers stored after demo qualification completes */
  demoAnswers: string[];
  /** Structured data stored in localStorage after qualification */
  demoQualifiedData: Record<string, string>;
  /** Page subtitle shown on the dashboard */
  dashboardSubtitle: string;
  /** Lead source label used on the result page */
  leadSource: string;
  /** Quick-reply chips shown during the qualifying flow (keyed by question index) */
  quickReplyChips: Record<number, string[]>;
}

// ─── Real Estate Config ───────────────────────────────────────────────────────

export const realEstateConfig: VerticalConfig = {
  verticalName: 'Real Estate',

  qualificationQuestions: [
    'What is your approximate budget?',
    'When are you looking to buy?',
    'Which area are you primarily interested in?',
    'Are you looking for residential or commercial property? Ready-to-move or under construction?',
    'Have you already visited any sites or spoken to other builders?',
  ],

  aiSystemPrompt: `You are a professional AI property advisor for Premium Tricity Properties, 
covering the Chandigarh, Mohali, and Panchkula (Tricity) region in India.

Your role is to conversationally qualify property leads by naturally asking:
1. Budget range
2. Buying timeline
3. Preferred area/location
4. Property type (residential/commercial, ready-to-move/under construction)
5. Prior research / site visits done

Maintain a warm, consultative tone. Do not bombard the user with all questions at once — 
ask one or two at a time, acknowledge their answers, and progress naturally.

At the end, produce a structured JSON object with keys:
{ budget, timeline, location, propertyType, intent }

Score the lead (hot/warm/cold) based on: budget size, urgency of timeline, 
location specificity, and prior research/intent signals.`,

  sampleLeads: {
    hotLeads: [
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
    ],
    warmLeads: [
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
    ],
    coldLeads: [
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
    ],
  },

  activityFeed: [
    { id: 'a1', dot: 'check', dotColor: 'bg-green-500', text: 'Rahul Sharma qualified — Score 87 — Hot lead', minutesAgo: 2 },
    { id: 'a2', dot: 'calendar', dotColor: 'bg-purple-500', text: 'Appointment reminder sent to Priya Mehta', minutesAgo: 14 },
    { id: 'a3', dot: 'message', dotColor: 'bg-teal-500', text: 'Nurture message sent to Deepak Singh', minutesAgo: 60 },
    { id: 'a4', dot: 'flame', dotColor: 'bg-red-500', text: 'New Hot lead detected: Amit Verma', minutesAgo: 120 },
    { id: 'a5', dot: 'chart', dotColor: 'bg-blue-500', text: 'Score recalculated for Sunita Kapoor — 76', minutesAgo: 140 },
    { id: 'a6', dot: 'message', dotColor: 'bg-teal-500', text: 'Drip email sent to Manpreet Kaur (NRI sequence)', minutesAgo: 180 },
    { id: 'a7', dot: 'calendar', dotColor: 'bg-purple-500', text: 'Site visit confirmed — Rahul Sharma — Saturday 11am', minutesAgo: 210 },
    { id: 'a8', dot: 'bot', dotColor: 'bg-indigo-500', text: 'AI engaged 38 new leads via WhatsApp bot today', minutesAgo: 300 },
  ],

  tierLabels: {
    hot: 'Site Visit Scheduled',
    warm: 'Follow-up Nurture Active',
    cold: 'Low Priority',
  },

  demoScript: [
    {
      role: 'assistant',
      content: `Hello {{name}}! 👋\n\nI'm the AI assistant for Premium Tricity Properties.\n\nI have a few quick questions to help our team find the perfect property for you. It'll only take 2 minutes.`,
    },
    { role: 'assistant', content: 'What is your approximate budget?' },
    { role: 'user', content: 'Around 1 crore' },
    { role: 'assistant', content: 'Thank you. That gives us a good starting point.\n\nWhen are you looking to buy?' },
    { role: 'user', content: 'Within 3 months' },
    { role: 'assistant', content: 'Perfect.\n\nWhich area are you primarily interested in?' },
    { role: 'user', content: 'Mohali' },
    { role: 'assistant', content: 'Great choice.\n\nAre you looking for residential or commercial property? Ready-to-move or under construction?' },
    { role: 'user', content: 'Residential, ready-to-move' },
    { role: 'assistant', content: 'Understood.\n\nHave you already visited any sites or spoken to other builders?' },
    { role: 'user', content: 'Yes, visited a few projects already' },
    {
      role: 'assistant',
      content:
        'Excellent.\n\nThank you for sharing these details.\n\nOur property advisor will review your requirements and contact you shortly with suitable options.',
      isLast: true,
    },
  ],

  demoAnswers: [
    'Around 1 crore',
    'Within 3 months',
    'Mohali',
    'Residential, ready-to-move',
    'Yes, visited a few projects already',
  ],

  demoQualifiedData: {
    budget: 'Around 1 crore',
    timeline: 'Within 3 months',
    location: 'Mohali',
    propertyType: 'Residential, ready-to-move',
    intent: 'Yes, visited a few projects already',
  },

  dashboardSubtitle: 'Real-time AI qualification · Tricity Region',

  leadSource: 'Facebook Ad — Mohali 3BHK Campaign',

  quickReplyChips: {
    1: ['Around 50 lakhs', '80 lakhs - 1 crore', '1-2 crore'],
    2: ['Within 3 months', '6 months', 'Just exploring'],
    3: ['Mohali', 'Panchkula', 'Chandigarh'],
    4: ['Residential, ready-to-move', 'Residential, under construction', 'Commercial'],
    5: ['Yes, visited a few', 'Just started looking', 'No, first time'],
  },
};

// ─── Automotive Config ────────────────────────────────────────────────────────

export const automotiveConfig: VerticalConfig = {
  verticalName: 'Automotive',

  qualificationQuestions: [
    "What's your budget range for this purchase?",
    "What's your current job profile / occupation?",
    "How are you planning to finance this — cash, loan, or downpayment + EMI?",
    "Which state/city are you buying in?",
    "Do you have a car to trade in?",
    "Are you looking at a new car or a pre-owned/certified one?",
    "What's your expected buying timeline — this week, this month, or just exploring?",
    "Have you checked any other Audi or competitor dealerships already?",
    "Any family members or relatives who already own an Audi (loyalty/referral check)?",
    "Do you currently own a car, and if so which model?",
  ],

  aiSystemPrompt: `You are an AI qualification assistant for Audi Chandigarh — a premium luxury automotive dealership.

Your role is to warmly and conversationally qualify prospective car buyers. Do NOT robotically list questions one after another. Instead, engage naturally, acknowledge each response, and guide the conversation in a consultative manner suited to the Audi brand experience.

You should gather the following information across the conversation:
- Budget range for the purchase
- Occupation / job profile (helps assess financing eligibility)
- Financing method: cash, bank loan, or downpayment + EMI
- State/city of purchase (for registration and RTO purposes)
- Trade-in availability (current car being exchanged)
- New vs pre-owned/certified preference
- Buying timeline (this week / this month / just exploring)
- Whether they have visited other Audi or competitor dealerships (BMW, Mercedes, Volvo)
- Family loyalty signal — any relatives who already own an Audi
- Current car model owned (helps gauge lifestyle segment and upgrade path)

Maintain a professional, warm, premium tone. Think of yourself as a knowledgeable showroom consultant who is genuinely interested in helping the customer find the right Audi for their lifestyle.

At the end of the conversation, produce a structured JSON object with the following keys:
{
  budget: string,
  occupation: string,
  financingType: "cash" | "loan" | "downpayment+EMI",
  city: string,
  tradeIn: boolean,
  vehiclePreference: "new" | "pre-owned",
  buyingTimeline: "this-week" | "this-month" | "exploring",
  competitorVisited: boolean,
  familyLoyalty: boolean,
  currentCar: string
}

Use this structured data to feed the scoring engine.`,

  sampleLeads: {
    hotLeads: [
      {
        id: 'auto-hot-1',
        name: 'Arjun Malhotra',
        phone: '+91 9XXXXXXXXX',
        score: 93,
        tier: 'hot',
        budget: '₹65–75L',
        timeline: 'Within 2 weeks',
        requirement: 'Audi Q5, new, loan financing',
        aiSummary: 'Salaried professional, loan pre-check done, test drive requested, checked BMW too',
        handoffStatus: 'ai',
        briefing: {
          budget: '₹65–75L',
          property: 'Audi Q5 (2024), Pearl White preferred',
          timeline: 'Wants delivery before month-end — EOM deadline',
          loanStatus: 'Checked eligibility at HDFC Bank — pre-approved in principle',
          intentSignals: [
            'Requested test drive for this Saturday',
            'Asked about exchange value for his Honda City',
            'Compared Q5 with BMW X3 at BMW Chandigarh last week',
          ],
          suggestedOpener:
            "Hi Arjun, I see you're comparing the Q5 with the X3 — the Q5 gives you a significantly more premium cabin and virtual cockpit at a comparable price point. Shall I block a test drive for Saturday morning?",
          watchOut: 'He visited BMW Chandigarh — price/feature comparison will be critical. Have the comparison sheet ready.',
        },
      },
      {
        id: 'auto-hot-2',
        name: 'Neha Sood',
        phone: '+91 8XXXXXXXXX',
        score: 88,
        tier: 'hot',
        budget: '₹40–50L',
        timeline: 'This month',
        requirement: 'Audi A4, new or certified pre-owned',
        aiSummary: 'Self-employed, cash buyer, upgrading from Skoda Superb, no trade-in',
        handoffStatus: 'ai',
        briefing: {
          budget: '₹40–50L (flexible if the right car is available)',
          property: 'Audi A4 (2023/2024) — open to CPO',
          timeline: 'This month — business milestone reward purchase',
          loanStatus: 'Cash buyer — no financing required',
          intentSignals: [
            'Owns a Skoda Superb currently — clear upgrade intent',
            'Asked about CPO warranty coverage',
            'Brother owns an Audi A6 — brand loyalty signal',
          ],
          suggestedOpener:
            "Hi Neha, congratulations on the milestone! We have a stunning Navarra Blue A4 that just came in — and since your brother already drives an A6, you'd qualify for our Audi family loyalty benefit. Want me to set up a private viewing?",
          watchOut: 'She is comparing new vs CPO on price — have both options ready with clear warranty differentiators.',
        },
      },
      {
        id: 'auto-hot-3',
        name: 'Vikram Sethi',
        phone: '+91 9XXXXXXXXX',
        score: 82,
        tier: 'hot',
        budget: '₹90L–1.1Cr',
        timeline: 'This week',
        requirement: 'Audi Q7, new, downpayment + EMI',
        aiSummary: 'Business owner, urgent purchase, trading in Fortuner, comparing Q7 vs GLE',
        handoffStatus: 'ai',
        briefing: {
          budget: '₹90L–1.1Cr',
          property: 'Audi Q7 55 TFSI — 7-seater, sunroof mandatory',
          timeline: 'This week — buying before flying out on business',
          loanStatus: 'Downpayment ₹25L, rest via EMI — already has financing in mind',
          intentSignals: [
            'Wants to trade in his 2021 Toyota Fortuner',
            'Visited Mercedes Chandigarh for GLE pricing',
            'Asked specifically about Q7 delivery timeline',
          ],
          suggestedOpener:
            "Hi Vikram, I understand you need this sorted before your travel — we have a Q7 55 TFSI in stock with panoramic sunroof, and I can get your Fortuner evaluated today itself. Shall I set up a slot for evaluation + test drive back-to-back?",
          watchOut: 'He is in a GLE vs Q7 comparison — time-sensitivity is your advantage. Move fast.',
        },
      },
    ],
    warmLeads: [
      {
        id: 'auto-warm-1',
        name: 'Simran Dhaliwal',
        phone: '+91 9XXXXXXXXX',
        score: 71,
        tier: 'warm',
        budget: '₹55–65L',
        timeline: '1 month',
        requirement: 'Audi Q3, new, EMI financing',
        aiSummary: 'Government employee, exploring loan options, first luxury car purchase',
        handoffStatus: 'ai',
        nurtureStatus: 'Nurture sequence active',
      },
      {
        id: 'auto-warm-2',
        name: 'Rohit Chadha',
        phone: '+91 7XXXXXXXXX',
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
        id: 'auto-warm-3',
        name: 'Parmeet Gill',
        phone: '+91 8XXXXXXXXX',
        score: 55,
        tier: 'warm',
        budget: '₹75–85L',
        timeline: '2 months',
        requirement: 'Audi Q5 or Q7, exploring both',
        aiSummary: 'NRI visiting Chandigarh, gift purchase for family, undecided on model',
        handoffStatus: 'ai',
        nurtureStatus: 'Drip email active',
      },
    ],
    coldLeads: [
      {
        id: 'auto-cold-1',
        name: 'Hardeep Bains',
        phone: '+91 9XXXXXXXXX',
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
        id: 'auto-cold-2',
        name: 'Gurjot Sandhu',
        phone: '+91 8XXXXXXXXX',
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
        id: 'auto-cold-3',
        name: 'Tanya Khanna',
        phone: '+91 9XXXXXXXXX',
        score: 29,
        tier: 'cold',
        budget: 'Not specified',
        timeline: 'Not sure',
        requirement: 'Looking for a gift idea — possibly',
        aiSummary: 'Unclear intent, dropped off after first question',
        handoffStatus: 'ai',
        nurtureStatus: 'Paused',
      },
    ],
  },

  activityFeed: [
    { id: 'aa1', dot: 'check', dotColor: 'bg-green-500', text: 'Arjun Malhotra qualified — Score 93 — Hot lead', minutesAgo: 3 },
    { id: 'aa2', dot: 'calendar', dotColor: 'bg-purple-500', text: 'Test drive scheduled for Arjun Malhotra — Saturday 11am', minutesAgo: 10 },
    { id: 'aa3', dot: 'message', dotColor: 'bg-teal-500', text: 'Nurture sequence triggered for Simran Dhaliwal', minutesAgo: 45 },
    { id: 'aa4', dot: 'flame', dotColor: 'bg-red-500', text: 'New Hot lead detected: Vikram Sethi — urgent buyer', minutesAgo: 90 },
    { id: 'aa5', dot: 'chart', dotColor: 'bg-blue-500', text: 'Score recalculated for Neha Sood — 88', minutesAgo: 120 },
    { id: 'aa6', dot: 'message', dotColor: 'bg-teal-500', text: 'Drip email sent to Parmeet Gill (NRI sequence)', minutesAgo: 180 },
    { id: 'aa7', dot: 'calendar', dotColor: 'bg-purple-500', text: 'Test drive confirmed — Neha Sood — Sunday 3pm', minutesAgo: 220 },
    { id: 'aa8', dot: 'bot', dotColor: 'bg-indigo-500', text: 'AI engaged 24 new Audi enquiries via WhatsApp today', minutesAgo: 300 },
  ],

  tierLabels: {
    hot: 'Test Drive Scheduled',
    warm: 'Follow-up Nurture Active',
    cold: 'Low Priority',
  },

  demoScript: [
    {
      role: 'assistant',
      content: `Hello {{name}}! 👋\n\nWelcome to Audi Chandigarh. I'm your AI assistant and I'm here to help you find the perfect Audi.\n\nJust a few quick questions — this won't take more than 2 minutes.`,
    },
    { role: 'assistant', content: "What's your budget range for this purchase?" },
    { role: 'user', content: '₹65–75 lakhs' },
    {
      role: 'assistant',
      content: "That's a great range — you'd be looking at models like the Audi Q5 or the A6.\n\nAre you planning to finance this through cash, a bank loan, or downpayment + EMI?",
    },
    { role: 'user', content: 'Loan from HDFC Bank' },
    {
      role: 'assistant',
      content: "Excellent choice — HDFC has great rates for luxury vehicles.\n\nAnd are you looking at a brand-new Audi or would you consider a certified pre-owned one?",
    },
    { role: 'user', content: 'New car' },
    {
      role: 'assistant',
      content: "Perfect.\n\nWhat's your expected buying timeline — are you looking to purchase this week, this month, or still exploring?",
    },
    { role: 'user', content: 'Within 2 weeks' },
    {
      role: 'assistant',
      content:
        "Noted — we'll prioritise your enquiry.\n\nHave you visited any other Audi or competitor showrooms like BMW or Mercedes-Benz?",
    },
    { role: 'user', content: 'Yes, I visited BMW Chandigarh last week' },
    {
      role: 'assistant',
      content:
        "Thank you for sharing that. We'd love the opportunity to show you why the Q5 stands apart.\n\nOur team will review your profile and reach out shortly to arrange a personalised test drive.",
      isLast: true,
    },
  ],

  demoAnswers: [
    '₹65–75 lakhs',
    'Loan from HDFC Bank',
    'New car',
    'Within 2 weeks',
    'Yes, visited BMW Chandigarh last week',
  ],

  demoQualifiedData: {
    budget: '₹65–75 lakhs',
    financingType: 'Loan from HDFC Bank',
    vehiclePreference: 'New car',
    buyingTimeline: 'Within 2 weeks',
    competitorVisited: 'Yes, visited BMW Chandigarh last week',
  },

  dashboardSubtitle: 'Real-time AI qualification · Audi Chandigarh',

  leadSource: 'WhatsApp Enquiry — Audi Q5 Campaign',

  quickReplyChips: {
    1: ['Under ₹50L', '₹50–75L', '₹75L–1Cr', 'Above ₹1Cr'],
    2: ['Cash', 'Bank loan', 'Downpayment + EMI'],
    3: ['New car', 'Certified pre-owned'],
    4: ['This week', 'This month', 'Just exploring'],
    5: ['Yes, visited BMW/Mercedes', 'Just started looking', 'No, first time'],
  },
};

// ─── Vertical Selector ────────────────────────────────────────────────────────

/**
 * Returns the correct vertical config based on the `v` URL query parameter.
 * - `?v=re`    → realEstateConfig
 * - anything else (or absent) → automotiveConfig (Audi dealership — default)
 *
 * Accepts a URLSearchParams object (from useSearchParams()) or a plain
 * string value of the `v` param — to keep it usable from both client
 * components and plain utility functions.
 */
export function getVerticalConfig(
  searchParamsOrValue: URLSearchParams | string | null | undefined
): VerticalConfig {
  let v: string | null = null;

  if (typeof searchParamsOrValue === 'string') {
    v = searchParamsOrValue;
  } else if (searchParamsOrValue instanceof URLSearchParams) {
    v = searchParamsOrValue.get('v');
  } else if (
    searchParamsOrValue &&
    typeof (searchParamsOrValue as URLSearchParams).get === 'function'
  ) {
    // ReadonlyURLSearchParams from Next.js useSearchParams()
    v = (searchParamsOrValue as URLSearchParams).get('v');
  }

  return v === 're' ? realEstateConfig : automotiveConfig;
}
