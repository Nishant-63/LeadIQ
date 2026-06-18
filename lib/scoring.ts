// lib/scoring.ts
// Client-side lead scoring logic

export interface ScoreBreakdown {
  budget: number;
  timeline: number;
  area: number;
  intent: number;
}

export interface ScoreResult {
  total: number;
  tier: 'hot' | 'warm' | 'cold';
  breakdown: ScoreBreakdown;
}

export function scoreBudget(answer: string): number {
  const a = answer.toLowerCase();
  if (a.includes('2 crore') || a.includes('2crore') || a.includes('2cr') || a.includes('above') || a.includes('3 crore') || a.includes('3cr')) return 30;
  if (a.includes('1 crore') || a.includes('1crore') || a.includes('1cr') || a.includes('80 lakh') || a.includes('80lakh') || a.includes('90 lakh') || a.includes('90lakh') || a.includes('1-2 crore') || a.includes('1.5 crore') || a.includes('1.2 crore')) return 24;
  if (a.includes('50 lakh') || a.includes('50lakh') || a.includes('60 lakh') || a.includes('60lakh') || a.includes('70 lakh') || a.includes('70lakh') || a.includes('around 50') || a.includes('50')) return 16;
  return 8;
}

export function scoreTimeline(answer: string): number {
  const a = answer.toLowerCase();
  if (a.includes('immediately') || a.includes('immediate') || a.includes('1 month') || a.includes('within 3') || a.includes('3 month') || a.includes('asap')) return 25;
  if (a.includes('6 month') || a.includes('6month') || a.includes('soon') || a.includes('few month')) return 15;
  if (a.includes('exploring') || a.includes('just') || a.includes('not sure') || a.includes('sometime')) return 5;
  return 10;
}

export function scoreArea(answer: string): number {
  const a = answer.toLowerCase();
  if (a.includes('mohali') || a.includes('panchkula') || a.includes('chandigarh') || a.includes('zirakpur') || a.includes('tricity') || a.includes('kharar') || a.includes('aerocity') || a.includes('sector')) return 20;
  // Any city name
  if (a.length > 3 && (a.includes('city') || a.includes('town') || a.includes('area') || a.includes('delhi') || a.includes('punjab') || a.includes('haryana'))) return 12;
  if (a.includes('any') || a.includes('anywhere') || a.includes('flexible') || a.includes('open')) return 12;
  return 5;
}

export function scoreIntent(answer: string): number {
  const a = answer.toLowerCase();
  if (a.includes('visited') || a.includes('spoken') || a.includes('seen') || a.includes('already') || a.includes('yes, visited') || a.includes('yes,visited') || a.includes('few')) return 25;
  if (a.includes('started') || a.includes('looking') || a.includes('researching') || a.includes('started looking') || a.includes('just started')) return 15;
  if (a.includes('first time') || a.includes('no,') || a.includes('no ') || a.includes('not yet') || a.includes("haven't")) return 8;
  return 8;
}

export function scoreAnswers(answers: string[]): ScoreResult {
  // answers[0] = budget, [1] = timeline, [2] = area, [3] = property type, [4] = intent
  const budget = scoreBudget(answers[0] || '');
  const timeline = scoreTimeline(answers[1] || '');
  const area = scoreArea(answers[2] || '');
  // For property type (answers[3]), we skip individual scoring but use answers[4] for intent
  const intent = scoreIntent(answers[4] || '');

  const total = Math.min(budget + timeline + area + intent, 100);
  const tier: 'hot' | 'warm' | 'cold' = total >= 70 ? 'hot' : total >= 40 ? 'warm' : 'cold';

  return {
    total,
    tier,
    breakdown: { budget, timeline, area, intent },
  };
}

export const TIER_CONFIG = {
  hot: {
    label: '🔥 HOT LEAD',
    color: '#ef4444',
    bgClass: 'bg-red-500',
    textClass: 'text-red-600',
    borderClass: 'border-red-200',
    bgLightClass: 'bg-red-50',
  },
  warm: {
    label: '♨️ WARM LEAD',
    color: '#f59e0b',
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-600',
    borderClass: 'border-amber-200',
    bgLightClass: 'bg-amber-50',
  },
  cold: {
    label: '❄️ COLD LEAD',
    color: '#3b82f6',
    bgClass: 'bg-blue-500',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    bgLightClass: 'bg-blue-50',
  },
};
